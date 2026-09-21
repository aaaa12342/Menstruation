const knowledge = [
  { id: 'cycle', category: '基础知识', title: '月经周期是怎么回事？', summary: '了解月经、排卵和周期变化，先从认识自己的身体开始。', content: '月经是子宫内膜脱落并排出体外的生理现象。每个人的周期和经期天数都可能不同，记录变化有助于更好地了解自己。', color: '#fff0f0' },
  { id: 'care', category: '经期护理', title: '经期护理的 4 个小习惯', summary: '及时更换用品、保持清洁、注意休息，让身体舒服一点。', content: '选择适合自己的卫生用品，按照产品说明及时更换；用温水清洁外阴；穿宽松透气的衣物；如果不舒服，优先休息并观察身体变化。', color: '#f5f0ff' },
  { id: 'shopping', category: '选购指南', title: '卫生用品怎么选？', summary: '不推荐品牌，只教你看规格、材质和使用场景。', content: '可以根据白天或夜间、流量多少和活动场景选择长度、吸收量与透气性。重要的是查看包装信息和卫生标准，选择正规渠道购买。', color: '#eef9f2' },
  { id: 'pain', category: '常见问题', title: '痛经时可以怎么做？', summary: '了解常见不适与需要寻求专业帮助的情况。', content: '轻微不适时可以休息、保暖并记录症状。如果疼痛剧烈、影响正常学习生活或持续加重，应尽快咨询校医或前往正规医院。', color: '#fff7e9' }
]

const rumors = [
  { id: 'rumor-1', title: '经期不能洗头？', truth: '可以洗头。', detail: '经期保持日常清洁是可以的，注意及时擦干、避免着凉即可。' },
  { id: 'rumor-2', title: '痛经只能忍着？', truth: '不需要硬扛。', detail: '如果疼痛明显影响学习和生活，应及时向家长、校医或正规医院寻求帮助。' },
  { id: 'rumor-3', title: '周期每个人都必须一样？', truth: '周期存在个体差异。', detail: '青春期周期可能还在逐渐稳定，持续记录变化比和别人比较更重要。' }
]

const questions = [
  { id: 'q1', tag: '选购', scope: '全校广场', title: '第一次买卫生巾，应该重点看哪些信息？', answerCount: 2, time: '今天 10:20', answer: '可以先看长度、吸收量、材质说明和卫生标准，按照自己的使用场景选择。' },
  { id: 'q2', tag: '护理', scope: '本校专区', title: '上课时突然感觉不舒服怎么办？', answerCount: 1, time: '昨天 17:40', answer: '可以先向老师或校医说明情况，去卫生间更换用品并休息，不需要觉得不好意思。' },
  { id: 'q3', tag: '心理', scope: '全校广场', title: '和同学聊经期总觉得有点尴尬，怎么办？', answerCount: 3, time: '昨天 09:12', answer: '尴尬感很常见，可以从可信任的朋友或成年人开始，用自己舒服的方式表达。' }
]

const projects = [
  { id: 'p1', category: '健康科普', title: '她护计划', org: '经期健康公益伙伴', region: '全国校园', summary: '面向青少年开展经期健康知识普及与校园支持。', detail: '项目通过校园讲座、科普材料和志愿者活动，帮助更多学生建立科学、平等的经期认知。', action: '前往项目官方渠道了解参与方式' },
  { id: 'p2', category: '物资帮扶', title: '粉红伙伴', org: '女性健康公益组织', region: '多地试点', summary: '为有需要的学生提供经期用品与健康支持。', detail: '项目关注经期用品可及性，通过物资募集、校园合作和公益包分发提供帮助。', action: '查看官方公开信息' },
  { id: 'p3', category: '校园帮扶', title: '周期无忧计划', org: '青少年成长支持计划', region: '学校合作', summary: '连接学校、家长与学生，提供经期友好校园支持。', detail: '项目倡导在校园内提供更友善、更有隐私感的经期支持空间。', action: '了解项目合作方式' }
]

const carePackage = {
  stats: [{ label: '已分发关怀包', value: '128' }, { label: '覆盖学校', value: '12' }, { label: '帮助同学', value: '96' }],
  items: ['日用卫生巾 2 包', '夜用卫生巾 1 包', '独立包装湿巾 1 包', '经期知识卡片 1 张', '热线号码卡片 1 张']
}

const hotline = { number: '400-000-0000', hours: '每天 09:00 - 21:00', title: '志愿者倾听热线', description: '如果你需要有人听一听，或想了解进一步的求助方式，可以先拨打热线。这里提供倾听与资源引导，不替代医疗诊疗。' }

module.exports = { knowledge, rumors, questions, projects, carePackage, hotline }
