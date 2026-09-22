const WHO = { name: '世界卫生组织 经期健康', url: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health' }
const NHS = { name: '英国国家医疗服务体系 经期知识', url: 'https://www.nhs.uk/conditions/periods/' }
const UNICEF = { name: '联合国儿童基金会 经期教育', url: 'https://www.unicef.org/eca/talking-about-periods-home' }

const knowledge = [
  { id: 'first-period', category: '基础知识', title: '第一次来月经，可以准备什么？', summary: '提前备好用品，知道可以向谁求助。', content: '第一次来月经不需要独自应对。可以备一片卫生巾和替换内裤，了解学校卫生间与校医室的位置，也可以和信任的家长或老师沟通。', source: NHS },
  { id: 'cycle-record', category: '基础知识', title: '怎样简单记录自己的周期？', summary: '记下开始日期、持续天数和不适感。', content: '在日历上记录每次月经开始的日期、持续的天数及明显不适。记录是为了了解变化，不是用来给自己诊断。若变化持续明显或影响生活，请咨询专业医务人员。', source: WHO },
  { id: 'individual-difference', category: '基础知识', title: '每个人的经期都一样吗？', summary: '周期和感受都存在个体差异。', content: '经期长度、流量和感受可能因人而异，青春期也可能经历变化。不要只凭和同伴比较来判断健康状况；持续困扰应寻求医疗帮助。', source: WHO },
  { id: 'body-feelings', category: '基础知识', title: '经期前后可能有哪些感受？', summary: '腹部不适、疲惫和情绪变化都值得被理解。', content: '有些人会感到腹部不适、疲惫或情绪变化。可以留意自己最需要的休息与支持；若症状持续、严重或影响学习和生活，应向校医或医生求助。', source: WHO },
  { id: 'pad-change', category: '经期护理', title: '在学校怎样更换经期用品？', summary: '准备备用用品，选择私密、洁净的空间。', content: '可在书包里放置备用用品和密封袋，按用品说明及实际流量及时更换；更换前后清洁双手，使用后的用品按当地垃圾分类要求妥善丢弃。', source: UNICEF },
  { id: 'cleaning', category: '经期护理', title: '经期清洁有哪些基本原则？', summary: '保持日常清洁，不需要过度清洗。', content: '保持身体和外阴日常清洁即可。可用清水清洁外阴，避免把清洁用品伸入阴道。若有持续异味、瘙痒或疼痛，应寻求专业帮助。', source: UNICEF },
  { id: 'school-help', category: '经期护理', title: '在学校突然来月经怎么办？', summary: '可以向老师、校医或可信任的同学寻求帮助。', content: '先找卫生间处理，再向可信任的老师、校医或同学借用经期用品。如果不舒服，可说明情况并休息；求助是正常的。', source: NHS },
  { id: 'sports', category: '经期护理', title: '经期还能运动吗？', summary: '根据自己的身体感受调整活动量。', content: '经期并不意味着必须停止所有运动。可以根据身体感受选择合适活动；若疼痛、头晕或明显不适，先休息并寻求帮助。', source: WHO },
  { id: 'products', category: '选购指南', title: '卫生巾、经期内裤有什么区别？', summary: '认识不同用品的使用方式和场景。', content: '卫生巾贴在内裤上吸收经血，经期内裤本身带有吸收层。不同用品需要按产品说明使用与更换，选择适合自己、来源正规且使用起来舒适的产品。', source: NHS },
  { id: 'package-info', category: '选购指南', title: '买经期用品时看包装哪里？', summary: '看产品名称、规格、使用说明和生产信息。', content: '选购时可留意完整包装、生产信息、适用场景、规格和使用说明。不要仅根据广告或香味判断产品是否适合自己。', source: NHS },
  { id: 'day-night', category: '选购指南', title: '日用和夜用怎么选择？', summary: '按使用场景、流量和舒适度选择。', content: '日用与夜用的长度和覆盖范围通常不同。可以结合活动场景与经血量选择，并按产品说明更换；不必只追求某一种固定规格。', source: NHS },
  { id: 'seek-care', category: '常见问题', title: '哪些经期情况值得尽快求助？', summary: '严重疼痛、出血较多或持续异常不必独自承受。', content: '如果疼痛严重、经血明显增多、出现晕厥，或月经长期没有来且自己担忧，应尽快告诉可信任的成年人，咨询校医或到正规医院。', source: WHO }
]

const rumors = [
  { id: 'rumor-4', title: '经期不能洗澡？', truth: '可以保持日常清洁。', detail: '洗澡和清洁不会因为处于经期就变成禁忌。保持舒适与卫生更重要。', source: UNICEF },
  { id: 'rumor-5', title: '经期绝对不能运动？', truth: '不必一概停止。', detail: '可根据身体感受调整活动量。明显疼痛或不适时应休息并求助。', source: WHO },
  { id: 'rumor-6', title: '月经血是“脏血”？', truth: '月经是正常生理过程。', detail: '月经是子宫内膜和血液排出体外的生理现象，不应因此感到羞耻。', source: WHO },
  { id: 'rumor-7', title: '来了月经就不能上学？', truth: '多数时候可以正常学习。', detail: '很多人在经期可以继续日常活动；若不适影响学习，应休息或寻求帮助。', source: WHO },
  { id: 'rumor-8', title: '经期不舒服就是“矫情”？', truth: '不适值得被认真对待。', detail: '严重疼痛、出血异常或情绪困扰都可以是寻求支持和医疗帮助的理由。', source: WHO },
  { id: 'rumor-9', title: '只能用一种经期用品？', truth: '可以按需要选择。', detail: '可根据场景、舒适度和产品说明选择适合自己的卫生巾、经期内裤等用品。', source: NHS },
  { id: 'rumor-10', title: '月经话题应该保密，不能求助？', truth: '求助是正常的。', detail: '有疑问或困扰时，向信任的成年人、校医或医生询问有助于获得准确支持。', source: UNICEF }
]

module.exports = { knowledge, rumors }
