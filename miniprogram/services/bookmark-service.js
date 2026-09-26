const KEY = 'jx_bookmarks_v1'
const TYPES = ['knowledge', 'rumor']

function read() {
  try {
    const value = wx.getStorageSync(KEY)
    return Array.isArray(value) ? value.filter(item => typeof item === 'string') : []
  } catch (error) {
    return []
  }
}

function entry(type, id) {
  return type + ':' + String(id || '')
}

function valid(type, id) {
  return TYPES.includes(type) && String(id || '').length > 0
}

function has(type, id) {
  return valid(type, id) && read().includes(entry(type, id))
}

function toggle(type, id) {
  if (!valid(type, id)) return { error: '收藏内容无效' }
  const value = read()
  const key = entry(type, id)
  const index = value.indexOf(key)
  const saved = index < 0
  if (saved) value.unshift(key)
  else value.splice(index, 1)
  try {
    wx.setStorageSync(KEY, value)
    return { saved }
  } catch (error) {
    return { error: '本机收藏保存失败' }
  }
}

function clear() {
  try { wx.removeStorageSync(KEY); return true } catch (error) { return false }
}

module.exports = { has, toggle, clear }
