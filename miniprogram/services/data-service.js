const mock = require('../data/mock-data')
const extra = require('../data/knowledge-extra')
const fallbackSource = { name: '世界卫生组织 经期健康', url: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health' }
const knowledge = mock.knowledge.map(item => ({ ...item, source: fallbackSource })).concat(extra.knowledge)
const rumors = mock.rumors.map(item => ({ ...item, source: fallbackSource })).concat(extra.rumors)

function getById(list, id) {
  return list.find(item => item.id === id) || list[0]
}

function createApplication(form) {
  const code = `JX${Date.now().toString().slice(-8)}`
  return { code, status: '待审核', school: form.school || '未填写学校', grade: form.grade || '未填写年级' }
}

function containsRiskWords(text) {
  return ['大量出血', '剧烈疼痛', '持续数月没来', '晕倒'].some(word => text.indexOf(word) > -1)
}

function includesQuery(item, fields, query) {
  const keyword = String(query || '').trim().toLowerCase()
  if (!keyword) return true
  return fields.some(field => String(item[field] || '').toLowerCase().includes(keyword))
}

function searchKnowledge(query, category) {
  return knowledge.filter(item =>
    (!category || category === 'all' || item.category === category) &&
    includesQuery(item, ['title', 'summary', 'content', 'category'], query)
  )
}

function searchRumors(query) {
  return rumors.filter(item => includesQuery(item, ['title', 'truth', 'detail'], query))
}

module.exports = {
  ...mock,
  knowledge,
  rumors,
  getKnowledge(id) { return getById(knowledge, id) },
  getRumor(id) { return getById(rumors, id) },
  getQuestion(id) { return getById(mock.questions, id) },
  getProject(id) { return getById(mock.projects, id) },
  createApplication,
  containsRiskWords,
  searchKnowledge,
  searchRumors
}
