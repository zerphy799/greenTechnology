export function useData() {
  const MOCK = {
    config: {
      projectName: '洁净所能',
      fullName: '钙基危废烟气一体化脱除技术',
      slogan: '以钙为基 · 洁净所能 · 守护蓝天',
      team: '绿色科技团队',
      school: 'XX大学',
      year: 2026
    },

    nav: [
      { id: 'summary',   label: '项目概述', icon: '🏠' },
      { id: 'background',label: '项目背景', icon: '📋' },
      { id: 'technology',label: '产品与技术', icon: '🔬' },
      { id: 'process',   label: '技术路线', icon: '⚙️' },
      { id: 'innovation',label: '创新优势', icon: '💡' },
      { id: 'business',  label: '商业模式', icon: '📊' },
      { id: 'market',    label: '市场策略', icon: '🎯' },
      { id: 'team',      label: '团队介绍', icon: '👥' },
      { id: 'finance',   label: '财务分析', icon: '💰' },
      { id: 'benefit',   label: '社会效益', icon: '🌍' },
      { id: 'plan',      label: '发展规划', icon: '🚀' }
    ],

    summary: {
      heroTitle: '洁净所能',
      heroSubtitle: '钙基危废烟气一体化脱除技术',
      heroDesc: '以工业固废（电石渣、钢渣等）为原料，制备高效钙基吸附剂，实现危废焚烧烟气中酸性气体（SO₂、HCl、HF）与重金属（Pb、Cd、Hg）的一体化高效脱除，以废治废、变废为宝。',
      stats: [
        { value: '≥95%', label: '酸性气体脱除率' },
        { value: '≥90%', label: '重金属脱除率' },
        { value: '≤40%', label: '较传统工艺降本' },
        { value: '100%', label: '以废治废原料' }
      ],
      badges: ['互联网+国赛项目', '国家发明专利', '省级重点研发', '中试试产验证'],
      heroBg: './images/banner1.jpg'
    },

    background: {
      intro: '我国危险废物年产生量已超1亿吨，焚烧处置占比持续攀升。然而焚烧烟气中酸性气体与重金属的深度净化是行业痛点——传统"湿法脱酸+活性炭吸附"工艺存在废水二次污染、运行成本高、设备腐蚀严重等问题。',
      industryData: [
        { label: '危废年产量', value: '1.2亿吨', trend: 'up' },
        { label: '焚烧处置占比', value: '38.5%', trend: 'up' },
        { label: '烟气治理市场规模', value: '580亿元', trend: 'up' },
        { label: '年复合增长率', value: '15.2%', trend: 'up' }
      ],
      painPoints: [
        { title: '湿法脱酸废水二次污染', desc: '传统石灰石-石膏湿法产生大量高盐废水，处理难度大、成本高' },
        { title: '活性炭喷射成本高昂', desc: '重金属脱除依赖活性炭喷射，吨危废处理活性炭成本超300元' },
        { title: '设备腐蚀与堵塞', desc: '酸性气体冷凝导致烟道及设备严重腐蚀，检修频繁' },
        { title: '固废资源化率低', desc: '脱酸产物与废活性炭均为危废，填埋处置占用土地资源' }
      ],
      policy: [
        '《"十四五"危险废物污染防治规划》明确要求提升危废资源化利用水平',
        '《国家危险废物名录（2025版）》强化焚烧烟气排放标准',
        '"双碳"目标下，钢铁/化工行业大宗固废综合利用政策持续加码',
        '科技部"固废资源化"重点专项支持以废治废技术研发'
      ]
    },

    technology: {
      intro: '本项目以电石渣、钢渣等大宗钙基工业固废为原料，通过"水合活化-组分调控-成型造粒"工艺，制备多孔钙基复合吸附剂，在烟气温度窗口（150-350℃）内同步实现酸性气体化学吸附与重金属物理-化学耦合捕集。',
      features: [
        {
          title: '钙基吸附剂',
          desc: '以工业固废（电石渣/钢渣）为钙源，掺杂改性组分，比表面积≥80m²/g，孔隙率≥55%',
          icon: 'adsorbent'
        },
        {
          title: '一体化脱除',
          desc: '同一反应器、同一温度窗口下，SO₂脱除率≥95%，HCl≥93%，Hg≥90%，Pb≥92%',
          icon: 'removal'
        },
        {
          title: '以废治废',
          desc: '原料100%来自工业固废，脱硫脱酸后产物可作为建材原料，实现全链条资源化',
          icon: 'recycle'
        },
        {
          title: '干法工艺',
          desc: '全程无水参与，零废水排放，系统压降低、能耗低，适用于各类焚烧工况',
          icon: 'dry'
        }
      ],
      techParams: [
        { name: 'SO₂脱除效率', value: '≥95%', standard: 'GB 18484 ≥80%' },
        { name: 'HCl脱除效率', value: '≥93%', standard: '欧盟 ≥90%' },
        { name: 'Hg脱除效率', value: '≥90%', standard: 'GB 18484 ≥70%' },
        { name: 'Pb脱除效率', value: '≥92%', standard: '欧盟 ≥85%' },
        { name: '运行温度窗口', value: '150-350℃', standard: '-' },
        { name: '吸附剂使用寿命', value: '≥8000h', standard: '-' }
      ]
    },

    process: {
      intro: '项目采用"原料预处理→水合活化→组分调控→成型造粒→工业化应用"全链条技术路线，已建成千吨级中试生产线一条。',
      processSteps: [
        { step: '01', title: '原料预处理', desc: '电石渣/钢渣经干燥、粉磨、筛分至200目以下' },
        { step: '02', title: '水合活化', desc: '高温水合反应，激活CaO活性位点，构建介孔结构' },
        { step: '03', title: '组分调控', desc: '掺杂过渡金属氧化物，调控吸附剂表面酸碱性及氧化性' },
        { step: '04', title: '成型造粒', desc: '挤出-滚圆造粒，制备φ3-5mm柱状颗粒，强度≥50N/颗' },
        { step: '05', title: '工业化应用', desc: '固定床/移动床反应器，烟气一体化净化，在线监测反馈' }
      ],
      processImage: {
        src: './images/process_flow.jpg',
        alt: '钙基危废烟气一体化脱除工艺流程图',
        caption: '图：钙基吸附剂制备及烟气净化工艺流程图'
      },
      patents: [
        { id: 'patent1', title: '一种钙基复合吸附剂及其制备方法和应用', number: 'ZL 2024 1 0XXXXXX.X', src: './images/eval_cert_1.jpg' },
        { id: 'patent2', title: '电石渣基烟气一体化净化吸附剂制备装置', number: 'ZL 2024 2 1XXXXXX.X', src: './images/eval_cert_2.jpg' },
        { id: 'patent3', title: '一种危废焚烧烟气干法同步脱酸脱汞的方法', number: 'ZL 2023 1 0XXXXXX.X', src: './images/eval_cert_3.jpg' }
      ],
      certificates: [
        { id: 'cert1', title: '全国大学生节能减排竞赛 国家二等奖', src: './images/cert1.jpg' },
        { id: 'cert2', title: '全国大学生节能减排竞赛 省一等奖', src: './images/cert2.jpg' },
        { id: 'cert3', title: '全国大学生电力创新设计竞赛', src: './images/cert3.jpg' }
      ],
      proofs: [
        { id: 'proof1', title: '应用证明——弘欣', src: './images/proof1.jpg' },
        { id: 'proof2', title: '应用证明——通达', src: './images/proof2.jpg' }
      ],
      evaluations: [
        { id: 'eval1', title: '科学技术成果鉴定（第1页）', src: './images/eval_cert_1.jpg' },
        { id: 'eval2', title: '科学技术成果鉴定（第2页）', src: './images/eval_cert_2.jpg' },
        { id: 'eval3', title: '科学技术成果鉴定（第3页）', src: './images/eval_cert_3.jpg' },
        { id: 'eval4', title: '科学技术成果鉴定（第4页）', src: './images/eval_cert_4.jpg' }
      ]
    },

    innovation: {
      intro: '相较于传统"湿法脱酸+活性炭喷射"工艺，本项目在技术路线、原料来源、运行成本、环境效益四个维度形成系统性创新。',
      highlights: [
        { title: '原料创新', desc: '以大宗工业固废替代商品钙基原料与活性炭，原料成本降低60%以上，同时消纳固废' },
        { title: '工艺创新', desc: '全干法一体化脱除，一塔替代传统"脱酸塔+活性炭喷射+布袋除尘"三级系统' },
        { title: '机理创新', desc: '揭示CaO-MOx复合活性位点对酸性气体与重金属的协同脱除机制，发表SCI论文8篇' },
        { title: '模式创新', desc: '"以废治废+产物资源化"闭环模式，脱硫产物可作建材，实现近零固废排放' }
      ],
      comparison: {
        headers: ['指标', '本项目', '传统湿法', '活性炭喷射'],
        rows: [
          ['SO₂脱除率', '≥95%', '90-95%', '-'],
          ['重金属（Hg）脱除率', '≥90%', '30-50%', '70-85%'],
          ['运行温度', '150-350℃', '60-80℃（需降温）', '120-200℃'],
          ['废水排放', '零排放', '3-5吨/吨危废', '零排放'],
          ['吨处理成本', '120-180元', '200-300元', '350-500元'],
          ['固废产物', '建材原料', '脱硫石膏（危废）', '废活性炭（危废）'],
          ['设备腐蚀', '轻微', '严重', '中等'],
          ['系统复杂度', '简单（一塔）', '复杂（三级）', '复杂（二级）']
        ]
      },
      papers: [
        'Wang, et al. "CaO-based sorbent for simultaneous removal of SO₂ and heavy metals." Chemical Engineering Journal, 2025',
        'Li, et al. "Mechanistic study on synergistic removal of HCl and Hg⁰ over CaO-MnOx composite." Environmental Science & Technology, 2024',
        'Zhang, et al. "Resource utilization of carbide slag for flue gas purification: A review." Journal of Hazardous Materials, 2025'
      ]
    },

    business: {
      intro: '采用"技术授权+吸附剂销售+运维服务"三位一体商业模式，目标客户覆盖危废焚烧处置企业、钢铁/化工行业自备焚烧装置。',
      modelDiagram: [
        { title: '技术授权', desc: '向大型危废处置企业授权核心专利技术，收取技术许可费', revenue: '一次性收入：500-1000万元/项目' },
        { title: '吸附剂销售', desc: '持续供应定制化钙基吸附剂产品，按处置量计费', revenue: '持续性收入：吨危废80-120元' },
        { title: '运维服务', desc: '提供装置运维、吸附剂更换、在线监测等技术服务', revenue: '年费收入：60-120万元/年' }
      ],
      customers: [
        { type: '危废焚烧处置中心', count: '全国约450家', demand: '烟气治理提标改造需求迫切', value: 'AAA级客户' },
        { type: '化工园区集中焚烧装置', count: '全国约600座', demand: '酸性气体与VOCs协同治理', value: 'AA级客户' },
        { type: '钢铁企业自备焚烧炉', count: '全国约200台', demand: '烧结烟气+危废焚烧双需求', value: 'A级客户' },
        { type: '水泥窑协同处置企业', count: '全国约150条线', demand: '替代燃料焚烧烟气治理', value: 'A级客户' }
      ]
    },

    market: {
      intro: '以华东、华南危废焚烧集中区为切入点，借助环保政策驱动与成本优势，分三阶段推进全国市场布局。',
      stages: [
        { phase: '第一阶段 (2026-2027)', title: '区域深耕', desc: '聚焦长三角、珠三角危废焚烧处置中心，完成5-8个示范项目，建立行业口碑', target: '市场占有率≥3%' },
        { phase: '第二阶段 (2027-2029)', title: '全国拓展', desc: '复制示范项目经验，向京津冀、成渝、长江中游城市群拓展，代理商+直销并行', target: '市场占有率≥12%' },
        { phase: '第三阶段 (2029-2031)', title: '技术出海', desc: '面向东南亚、南亚等"一带一路"国家输出技术与装备，布局国际市场', target: '海外收入占比≥20%' }
      ],
      channels: [
        { name: '行业展会', desc: '中国环博会、危废论坛等行业展会集中展示，精准触达决策者' },
        { name: '产学研合作', desc: '联合高校、设计院开展技术推介，进入EPC总包供应商名录' },
        { name: '标杆示范', desc: '建设3-5个标杆示范工程，以实际运行数据驱动口碑传播' },
        { name: '政策对接', desc: '对接地方环保部门，推动钙基干法脱除技术纳入推荐目录' }
      ]
    },

    team: {
      intro: '团队由环境工程、化学工程、材料科学、工商管理等专业硕博士组成，导师团队含国家杰出青年基金获得者1人、教授2人。',
      advisor: [
        { name: '张教授', role: '首席科学顾问', title: '国家杰青、博导', dept: '环境科学与工程学院', desc: '长期从事工业烟气净化与固废资源化研究，主持国家重点研发计划项目3项' },
        { name: '李教授', role: '技术顾问', title: '教授、博导', dept: '化学工程学院', desc: '钙基材料制备与应用专家，获省部级科技奖励5项' }
      ],
      members: [
        { name: '王同学', role: '项目负责人', grade: '博士三年级', dept: '环境工程', desc: '全面负责技术研发与项目管理，以一作发表SCI论文4篇' },
        { name: '陈同学', role: '技术研发', grade: '博士一年级', dept: '化学工程', desc: '负责吸附剂制备工艺优化与中试放大' },
        { name: '刘同学', role: '市场运营', grade: '硕士二年级', dept: '工商管理（MBA）', desc: '负责市场调研、商业模式设计与客户对接' },
        { name: '赵同学', role: '财务分析', grade: '硕士二年级', dept: '会计学', desc: '负责财务预测、成本核算与投融资方案设计' },
        { name: '周同学', role: '实验研究', grade: '硕士一年级', dept: '环境工程', desc: '负责吸附剂性能测试与机理表征' },
        { name: '吴同学', role: '宣传设计', grade: '本科四年级', dept: '视觉传达', desc: '负责项目展示材料与品牌形象设计' }
      ]
    },

    finance: {
      intro: '项目首期融资需求800万元，用于中试产线扩建与首批示范工程建设。预计第2年实现盈亏平衡，第5年营收突破8000万元。',
      revenueForecast: [
        { year: '2026', revenue: 300, cost: 420, profit: -120 },
        { year: '2027', revenue: 1200, cost: 980, profit: 220 },
        { year: '2028', revenue: 2800, cost: 1900, profit: 900 },
        { year: '2029', revenue: 5000, cost: 3200, profit: 1800 },
        { year: '2030', revenue: 8500, cost: 5000, profit: 3500 }
      ],
      revenueBreakdown: [
        { name: '吸附剂销售', value: 55 },
        { name: '技术授权', value: 25 },
        { name: '运维服务', value: 15 },
        { name: '其他', value: 5 }
      ],
      costBreakdown: [
        { name: '原材料', value: 30 },
        { name: '人工', value: 20 },
        { name: '制造费用', value: 18 },
        { name: '研发投入', value: 15 },
        { name: '销售管理', value: 12 },
        { name: '其他', value: 5 }
      ],
      funding: {
        total: 800,
        usage: [
          { item: '中试产线扩建', amount: 300 },
          { item: '示范工程建设', amount: 250 },
          { item: '研发持续投入', amount: 150 },
          { item: '市场推广', amount: 70 },
          { item: '流动资金', amount: 30 }
        ]
      },
      keyMetrics: [
        { label: '投资回收期', value: '2.8年' },
        { label: '内部收益率（IRR）', value: '42.5%' },
        { label: '净现值（NPV）', value: '3800万元' },
        { label: '第5年净利率', value: '41.2%' }
      ]
    },

    benefit: {
      intro: '项目契合国家"双碳"战略与"无废城市"建设目标，以废治废的技术路线具有显著的环境正外部性和社会价值。',
      environmentalData: {
        labels: ['SO₂减排', 'CO₂减排', '固废消纳', '废水减排', 'Hg减排'],
        project: [95, 85, 100, 100, 90],
        traditional: [70, 60, 30, 40, 50]
      },
      highlights: [
        { title: '酸性气体减排', value: '3.8万吨/年', desc: '单套10万吨/年处置线SO₂年减排量' },
        { title: '固废消纳', value: '15万吨/年', desc: '以电石渣/钢渣为原料，年消纳大宗工业固废' },
        { title: '碳减排', value: '12万吨CO₂/年', desc: '替代传统高排放工艺+固废碳化固定CO₂' },
        { title: '废水零排放', value: '60万吨/年', desc: '全干法工艺，消除传统湿法脱酸废水排放' }
      ],
      sdgGoals: [
        { goal: 'SDG 6', title: '清洁饮水', desc: '零废水排放，保护水资源' },
        { goal: 'SDG 9', title: '产业创新', desc: '技术创新驱动产业升级' },
        { goal: 'SDG 11', title: '可持续城市', desc: '支撑"无废城市"建设' },
        { goal: 'SDG 12', title: '负责任消费', desc: '固废资源化循环利用' },
        { goal: 'SDG 13', title: '气候行动', desc: '显著碳减排效益' }
      ]
    },

    plan: {
      intro: '短期立标杆、中期拓市场、长期走出去，三步走战略推动钙基危废烟气一体化脱除技术成为行业主流方案。',
      timeline: [
        {
          year: '2026',
          title: '中试完善期',
          milestones: [
            '完成千吨级中试产线72小时连续运行验证',
            '建成首个万吨级商业化示范工程',
            '完成A轮融资800万元',
            '新增申请发明专利3项',
            '获得省级科技进步奖'
          ]
        },
        {
          year: '2027-2028',
          title: '快速成长期',
          milestones: [
            '累计建成5-8个示范/商业项目',
            '吸附剂产能扩至2万吨/年',
            '营收突破2800万元，实现盈利',
            '完成B轮融资2000万元',
            '获得国家高新技术企业认定'
          ]
        },
        {
          year: '2029-2030',
          title: '规模扩张期',
          milestones: [
            '市场占有率超过12%',
            '营收突破8500万元',
            '启动Pre-IPO融资',
            '海外（东南亚）首套装置落地',
            '参与制定行业标准2项'
          ]
        },
        {
          year: '2031+',
          title: '行业引领期',
          milestones: [
            '成为钙基干法烟气治理细分领域龙头',
            '市场占有率超过25%',
            '科创板/北交所上市',
            '技术输出至"一带一路"10+国家',
            '建成国家级工程技术研究中心'
          ]
        }
      ]
    },

    banners: [
      {
        image: './images/banner1.jpg',
        title: '钙基危废烟气一体化脱除',
        subtitle: '以废治废 · 洁净所能 · 守护蓝天',
        cta: '了解更多'
      },
      {
        image: './images/banner2.jpg',
        title: '核心技术——多孔钙基吸附剂',
        subtitle: 'SO₂脱除率≥95% | 重金属脱除率≥90% | 零废水排放',
        cta: '查看技术'
      },
      {
        image: './images/banner3.jpg',
        title: '千吨级中试产线建成投产',
        subtitle: '已获3项国家发明专利 | 8篇SCI论文支撑',
        cta: '了解详情'
      }
    ],

    footer: {
      copyright: '© 2026 洁净所能团队. All Rights Reserved.',
      contact: {
        email: 'cleanenergy@example.edu.cn',
        phone: '138-0000-0000',
        address: 'XX大学环境科学与工程学院'
      },
      links: [
        { label: 'XX大学', url: '#' },
        { label: '环境科学与工程学院', url: '#' },
        { label: '国家自然科学基金', url: '#' }
      ]
    }
  }

  return { MOCK }
}
