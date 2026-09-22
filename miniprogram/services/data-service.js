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

module.exports = {
  ...mock,
  knowledge,
  rumors,
  getKnowledge(id) { return getById(knowledge, id) },
  getRumor(id) { return getById(rumors, id) },
  getQuestion(id) { return getById(mock.questions, id) },
  getProject(id) { return getById(mock.projects, id) },
  createApplication,
  containsRiskWords
}
