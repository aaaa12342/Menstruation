const { questions: examples } = require('../data/mock-data')

const KEY = 'jx_community_v1'
const VIEW_KEY = 'jx_community_view'
const RISK_WORDS = ['大量出血', '剧烈疼痛', '持续数月没来', '晕倒', '止不住血']
const BLOCKED_WORDS = ['加微信', '微信号', '加我微信', '私下交易', '代购', '辱骂', '自杀方法']
const REPORT_REASONS = ['隐私泄露', '不当医疗建议', '辱骂骚扰', '广告交易', '其他']

function read() {
  try {
    const value = wx.getStorageSync(KEY)
    if (value && typeof value === 'object' && Array.isArray(value.posts)) {
      if (!Array.isArray(value.reports)) value.reports = []
      if (!Array.isArray(value.hiddenTargets)) value.hiddenTargets = []
      value.posts.forEach(post => { if (!Array.isArray(post.replies)) post.replies = [] })
      return value
    }
  } catch (error) {}
  return { visitorId: '', posts: [], reports: [], hiddenTargets: [] }
}

function write(value) {
  try { wx.setStorageSync(KEY, value); return true } catch (error) { return false }
}

function uid(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)
}

function ensureVisitor(state) {
  if (!state.visitorId) state.visitorId = uid('visitor')
  return state.visitorId
}

function screen(text) {
  const value = String(text || '').trim()
  if (!value) return '请填写内容'
  if (/1[3-9]\d{9}/.test(value) || /\d{17}[\dXx]/.test(value) || /[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/.test(value)) {
    return '请删除手机号、身份证号或邮箱等个人信息'
  }
  if (BLOCKED_WORDS.some(word => value.includes(word))) return '内容含有联系方式、交易或不适宜词语，请修改后重试'
  return ''
}

function screenReply(text) {
  const reason = screen(text)
  if (reason) return reason
  if (/你.{0,3}(得了|患有)|建议.{0,3}(吃|服用).{0,8}(药|片|胶囊)|确诊|每(天|次).{0,8}(片|毫克)/.test(String(text))) return '回复不能包含诊断或具体用药建议'
  return ''
}

function risky(text) {
  return RISK_WORDS.some(word => String(text || '').includes(word))
}

function hidden(state, kind, id) {
  return state.hiddenTargets.includes(kind + ':' + id)
}

function visiblePost(post, state) {
  return {
    ...post,
    replies: (post.replies || []).filter(reply => !hidden(state, 'reply', reply.id))
  }
}

function posts(view) {
  const state = read()
  const mine = state.posts
    .filter(post => post.authorId === state.visitorId && !hidden(state, 'post', post.id))
    .map(post => visiblePost(post, state))
  if (view === 'mine') return mine
  if (view === 'notices') return mine.filter(post => post.replies.some(reply => reply.status === '已通过' && reply.unread))
  const seeds = examples.map(item => ({
    ...item, status: '已通过', body: '', replies: [{ id: item.id + '-reply', text: item.answer, status: '已通过' }]
  })).filter(post => !hidden(state, 'post', post.id)).map(post => visiblePost(post, state))
  return state.posts
    .filter(post => post.status === '已通过' && !hidden(state, 'post', post.id))
    .map(post => visiblePost(post, state)).concat(seeds)
    .filter(post => view !== 'school' || post.scope === '本校专区')
}

function postById(id) {
  const state = read()
  const local = state.posts.find(post => post.id === id)
  if (local) return hidden(state, 'post', id) ? null : visiblePost(local, state)
  return posts('all').find(post => post.id === id) || null
}

function submitPost(form) {
  const title = String(form.title || '').trim()
  const body = String(form.body || '').trim()
  const reason = screen(title + ' ' + body)
  if (reason) return { error: reason }
  if (title.length < 5 || body.length < 10) return { error: '标题至少 5 字，描述至少 10 字' }
  const state = read()
  const post = {
    id: uid('post'), title, body, tag: form.tag || '其他', scope: form.scope || '全校广场',
    status: '待审核', authorId: ensureVisitor(state), time: new Date().toLocaleString(),
    createdAt: Date.now(), replies: []
  }
  state.posts.unshift(post)
  return write(state) ? { post } : { error: '本机保存失败，请检查缓存空间' }
}

function submitReply(postId, text) {
  const reason = screenReply(text)
  if (reason) return { error: reason }
  if (String(text).trim().length < 5) return { error: '回复至少 5 字' }
  const state = read()
  const post = state.posts.find(item => item.id === postId)
  if (!post || post.status !== '已通过') return { error: '帖子尚未通过审核，暂不能回复' }
  post.replies.push({
    id: uid('reply'), text: String(text).trim(), status: '待审核',
    unread: false, time: new Date().toLocaleString()
  })
  return write(state) ? { ok: true } : { error: '本机保存失败，请检查缓存空间' }
}

function submitReport(target) {
  const kind = target.kind
  const id = String(target.id || '')
  const postId = String(target.postId || '')
  const reason = String(target.reason || '')
  if (!['post', 'reply'].includes(kind) || !id || !REPORT_REASONS.includes(reason)) {
    return { error: '请选择有效的举报原因' }
  }
  const post = postById(postId)
  const exists = post && (kind === 'post' ? post.id === id : post.replies.some(reply => reply.id === id))
  if (!exists) return { error: '内容不存在或已被处理' }
  const state = read()
  const reporterId = ensureVisitor(state)
  const duplicate = state.reports.some(report =>
    report.reporterId === reporterId && report.targetKind === kind && report.targetId === id
  )
  if (duplicate) return { error: '你已举报过这条内容' }
  const report = {
    id: uid('report'), targetKind: kind, targetId: id, postId, reason,
    snippet: String(target.snippet || '').trim().slice(0, 120), reporterId,
    status: '待处理', time: new Date().toLocaleString(), createdAt: Date.now()
  }
  state.reports.unshift(report)
  return write(state) ? { report } : { error: '本机保存失败，请检查缓存空间' }
}

function queue() {
  const result = []
  const state = read()
  state.posts.forEach(post => {
    if (post.status === '待审核') result.push({ id: post.id, postId: post.id, kind: 'post', text: post.title + '\n' + post.body })
    post.replies.forEach(reply => {
      if (reply.status === '待审核') result.push({ id: reply.id, postId: post.id, kind: 'reply', text: reply.text })
    })
  })
  state.reports.forEach(report => {
    if (report.status === '待处理') {
      result.push({
        id: report.id, postId: report.postId, kind: 'report',
        text: '举报原因：' + report.reason + '\n内容摘要：' + report.snippet,
        targetKind: report.targetKind, targetId: report.targetId
      })
    }
  })
  return result
}

function review(kind, postId, id, pass) {
  const state = read()
  if (kind === 'report') {
    const report = state.reports.find(item => item.id === id)
    if (!report || report.status !== '待处理') return false
    report.status = pass ? '已处理' : '不成立'
    if (pass) {
      const key = report.targetKind + ':' + report.targetId
      if (!state.hiddenTargets.includes(key)) state.hiddenTargets.push(key)
    }
    return write(state)
  }
  const post = state.posts.find(item => item.id === postId)
  if (!post) return false
  const item = kind === 'post' ? post : post.replies.find(reply => reply.id === id)
  if (!item || item.status !== '待审核') return false
  if (pass && (kind === 'post' ? screen(post.title + ' ' + post.body) : screenReply(item.text))) return false
  item.status = pass ? '已通过' : '未通过'
  if (kind === 'reply' && pass) item.unread = true
  return write(state)
}

function demoReply(postId) {
  const state = read()
  const post = state.posts.find(item => item.id === postId)
  if (!post || post.status !== '已通过') return false
  post.replies.push({
    id: uid('reply'), text: '谢谢你的分享。可以先查阅科普内容；如有明显或持续不适，请及时向校医或正规医院求助。',
    status: '已通过', unread: true, time: new Date().toLocaleString()
  })
  return write(state)
}

function markRead(postId) {
  const state = read()
  const post = state.posts.find(item => item.id === postId)
  if (!post || post.authorId !== state.visitorId) return
  post.replies.forEach(reply => { reply.unread = false })
  write(state)
}

function unreadCount() {
  return posts('notices').reduce((count, post) => count + post.replies.filter(reply => reply.status === '已通过' && reply.unread).length, 0)
}

function setNextView(view) { wx.setStorageSync(VIEW_KEY, view) }
function takeNextView() {
  const view = wx.getStorageSync(VIEW_KEY) || 'all'
  wx.removeStorageSync(VIEW_KEY)
  return view
}
function clearData() {
  wx.removeStorageSync(KEY)
  wx.removeStorageSync(VIEW_KEY)
}

module.exports = {
  posts, postById, submitPost, submitReply, queue, review, demoReply, markRead, unreadCount,
  submitReport, reportReasons: REPORT_REASONS,
  screen, risky, setNextView, takeNextView, clearData
}
