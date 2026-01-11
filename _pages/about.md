---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
## Hi, I'm Haomin👋

I am a second-year PhD student in the **[Department of Engineering](https://www.eng.cam.ac.uk/)** at the  **[University of Cambridge](https://www.cam.ac.uk/)** ([**St. John's College**](https://www.joh.cam.ac.uk/)), supervised by **[Prof. Ruchi Choudhary](https://www.turing.ac.uk/people/researchers/ruchi-choudhary)** (affiliated with [**The Alan Turing Institute**](https://www.turing.ac.uk/)), with [**Prof. Ioannis Lestas**](https://www.eng.cam.ac.uk/profiles/icl20) serving as my advisor.

My research centers on  **Reinforcement Learning (RL)** , specifically  **Multi-Agent Reinforcement Learning (MARL)**. I investigate agents' communication mechanism, collaboration structure, and overall explainability, with a focus on robustness in extreme environments and Human-in-the-Loop systems. While my previous work treated RL as a data-driven, model-free control method for power system optimization (such as microgrids and PV-battery storage) and energy trading in electricity market, my current research interests have shifted toward the fundamental mathematical principles of RL itself.

Prior to Cambridge, I earned my MSc in Intelligent Technology and Management from **[Hong Kong University of Science and Technology](https://hkust.edu.hk/)** (GPA 3.96/4.0), supervised by **[Prof. Zhe (Walter) Wang](https://walterzwang.github.io/)**, where I received the Msc Excellent Student Scholarship. My professional background spans both engineering and finance; I worked as an engineer at **[AECOM](https://aecom.com/)** (2021–2022), earning the "Most Valuable Player" award, also served as a TMT equity analyst at **[Soochow Securities](https://www.dwzq.com.hk/Default.asp?langcode=en)** and  [**Huatai Securities**](https://www.htsc.com.cn/en/) and a consultant for **[Meritco Services](https://www.linkedin.com/company/meritco-services/posts/?feedView=all)**. I hold a B.Eng. in Civil Engineering from [**Southwest Jiaotong University**](https://en.swjtu.edu.cn/index.jsp), where I was awarded with Mingcheng Scholarship and outstanding Individual.

Beyond academia, I am a part-time fashion model and a photographer for the [**Cambridge University Charity Fashion Show (CUCFS)**](https://cucfs.co.uk/). An avid rower, I represent the  **[Lady Margaret Boat Club (LMBC)](https://www.ladymargaretboatclub.org/)** —having competed in the Lent/May Bumps and HORR—and serve as Vice President of the [**Cambridge Chinese Rower Network**](https://www.cambridgesu.co.uk/organisation/23438/). I also sit on the Executive Committee for the Entrepreneurship Department of the **[Chinese Students and Scholar Association in Cambridge(CSSA)](https://cssacam.org/)**. Additionally, I am a classically trained violinist with 20 years of experience, performing regularly in termly concerts with the **[Central Colleges Orchestra (CCO](https://www.cmp.cam.ac.uk/opportunities/entry/central-colleges-orchestra-cco/))**, [**King’s (KCMS)**](https://kcmsofficial.wordpress.com/) and **[Jesus’s (JCMS)](https://jcms.jesus.cam.ac.uk/)** College Music Societies.

## Education

* **PhD in Engineering**, University of Cambridge, Oct 2024 - present
* **MSc in Intelligent Technology and Management**, Hong Kong University of Science and Technology, Sep 2022 - Jun 2024
* **BEng in Civil Engineering**, Southwest Jiaotong University, Sep 2016 - Jun2020

## Research Experience

#### **From Centralization to Intelligent Cooperation: A Scalability Analysis of Multi-Agent Reinforcement Learning (MARL) Paradigms for Decentralized Microgrid Energy Management**

Based on First Year report, will be put on arXiv for Publication Later, Oct 2024 - Aug 2025

##### **Research Background & Motivation**

* **Context:** Conducted at the **Energy Efficient Cities initiative (EECi), University of Cambridge**, addressing the global need for scalable control systems in residential microgrids equipped with Photovoltaics (PV) and Battery Energy Storage Systems (BESS).
* **Core Challenge:** Tackled the "trilemma" of **performance, privacy, and scalability** in energy management. **Traditional centralized controls (like CTDE) face "curse of dimensionality" and privacy bottlenecks, while fully decentralized methods (DTDE) often lack coordination stability**.
* **Objective:** To design a privacy-preserving, scalable control architecture that balances individual cost savings with collective grid stability (e.g., reducing ramping and peak loads).

##### **Technical Architecture & Methodology**

* **Simulation Environment:** Developed a high-fidelity co-simulation using  a gym environment: CityLearn  (Gymnasium interface), modeling a community of 17 Zero Net Energy (ZNE) buildings in Fontana, California, using real-world weather and load data.
* **Algorithmic Framework:** Implemented and rigorously benchmarked a comprehensive suite of control paradigms:
  * **Baselines:** Rule-Based Control (RBC) and Single-Agent RL (SAC, DDPG).
  * **MARL Benchmarks:** Centralized Training Decentralized Execution (CTDE-MADDPG) and Independent Learners (DTDE-MADDPG)
  * **Hybrid Innovation:** Proposed and validated  **GTDE (Grouped Training with Decentralised Execution)** , a novel architecture utilizing **adaptive, sparse communication protocols**
* **Mechanism Design:** The GTDE agent learns a dynamic communication graph to exchange "state-temporal abstractions" (via GRU encoders) only with relevant peers, replacing the need for global state sharing.

##### **Key Contributions & Results**

* **Scalability Verdict:** Proved that centralized architectures (SARL/CTDE) are non-scalable; SARL experienced "catastrophic learning failure" and CTDE performance degraded by **19%** when scaling from 4 to 14 buildings.
* **The "Price of Anarchy":** Demonstrated that while fully decentralized agents (DTDE) achieved optimal costs (10% improvement) via price signals, they caused grid instability and high ramping rates due to lack of coordination.
* **Superiority of GTDE:** The proposed GTDE framework emerged as the optimal solution, achieving a **43% reduction in community electricity costs** and a  **25% reduction in grid ramping** **, significantly outperforming both centralized and independent benchmarks**.
* **Communication Analysis:** Empirically invalidated naive communication methods (FDM family), showing that "poorly designed communication protocols are more detrimental than no communication," leading to a **338% increase in grid ramping** in some cases.

#### [NeuroIPS Citylearn Challenge 2022](https://www.aicrowd.com/challenges/neurips-2022-citylearn-challenge) & [2023](https://neurips.cc/virtual/2023/competition/66590) 

*Project Leader in Great Smart Cities Institute., HKUST., Supervised by Prof. Zhe (Walter) WANG, Sep 2022 - Jun 2024*

* This project aims to develop advanced controllers (e.g., model predictive control and reinforcement learning) to coordinate the load consumption of different households and to operate the thermal energy storage system to minimize the utility costs given the time-of-use utility structure and to minimize the CO2 emissions given varying carbon intensity of the grid
* The NeurIPS 2022: CityLearn Challenge’s 17 buildings’ one year operation data from the Sierra Crest home development inCalifornia were used as a virtual testbed and dataset, including PV generation, Weather data, Electricity demand, etc
* Trained multiple advanced deep reinforcement learning control algorithms (DDPG, SAC, PPO ,TD3) to manage the battery charging/discharging behavior, made the final result perfoms 13% better than the baseline
* Designed several corresponding KPIs (e.g. Average daily peak, Ramping, Zero net energy, Carbon emissionsd, etc.,) for the comparative study between different algorithms at the level of single building-level and grid-level, respectively, and it was found that the TD3 algorithm had the best overall performance, and was ahead of the DDPG by 3%-27% in proposed KPIs

#### [Computational fluid dynamics (CFD) Simulation of Wind Tunnel Tests for High-rise Buildings &amp; Large-Span Bridges](https://yapimerkezi.com.tr/En/News/1915-Canakkale-Bridge-passed-the-wind-test-in-China)

*Research Assistant in XNJD-3 Lab (world's largest atmospheric boundary layer wind tunnel)., Supervised by Prof. Shixiong Zheng*

* Participated in the CFD simulation of the wind resistance tests of high-rise buildings & large-span bridges under different wind directions & speeds, and the wind-induced catastrophe research of urban infrastructures in wind tunnel
* Responsible for the finite element analysis of buildings’ aeroelastic models under specific scale ratios and the simulation of the turbulent flow field in the aerodynamic experiment, to solve wind vibration problems such as flutter, galloping and buffeting.
* Successfully completed the wind tunnel test of the 1915 Turkish Çanakkale Bridge (world's longest bridge) within four months; Other projects including Shanghai Lujiazui Financial Trade Zone skyscraper cluster and Hålogaland Bridge in Norway

#### [Green Building Design and Energy Simulation for Chengdu International Airport Terminals](https://www.yuandacn.com/index.php/en/projects-cn-2/123-domestic/sichuan/473-chengdu-tianfu-international-airport-terminal-2.html)

*Research Assistant in China State Construction Engineering Corporation (CSCEC) of the Chengdu International Airport project*

* Committed to enhancing the environmental sustainability of airport terminals while simultaneously reducing their operational costs. throughout the entirety of the project's design and construction process, responsible for examining the overall energy consumption and carbon footprint of the T1 terminal (1.26 km²) and provide renewable energy feasibility solutions
* Conducting microclimate analysis of the site and used EnergyPlus to analyze energy consumption; through glare analysis of building facades, indoor thermal comfort analysis, and indoor lighting environment analysis, we used Ecotect, Fuzor and Sketchup to simulate the building's layout, ventilation, light intensity and calculated its best orientation
* The project won the 5th International BIM award (hosted by BSHK) and the excellence award of the 2020 Bentley Competition

## Professional Experience

#### 华泰证券有限公司 TMT科技电子组 2022.10 – 2023.2

产业链跟踪：关注中美、港股科技行业（芯片面板、消费电子）巨头，重点追踪特斯拉、比亚迪、蔚小理等新能源整车

深度报告：独立撰写车载光学行业龙头联创电子（002036.SZ）的首次覆盖报告、协助撰写港股京东方精电（0710.HK）英文报告、智能驾驶座舱（摄像头、屏幕、激光雷达、芯片）及月度智能驾驶报告（无人驾驶、动力电池）5 篇


#### 东吴证券有限公司居住产业组（新财富） 2022.4 – 2022.9

产业链跟踪：在全国地产信用风险失控的大背景下，持续跟踪中央、地方放松政策，关注水泥、玻璃等大宗建材价格及产能变动，对二级市场 315 家上市公司的竞争格局、供需、库存、周转进行整理分析形成投资逻辑

数据库维护：利用 Wind 等终端定期更新地方政府新增债（地产）、新签合同额（建筑）、光伏玻璃纯碱能源价差（建材）等行业上下游数据，协助搭建重点公司盈利预测与行业估值模型，产出 20+周（月）度分析报告

地产课题：通过对拿地企业进行股权穿透，搜集分析地块权益比例、投销比、计容建面等财务数据进行地价敏感性分析，详细研究市场库存、去化周期完成对保利发展（600048.SH）等 114 家地产公司近 5 年的综合融资成本统计

新股报告：拓宽团队细分赛道标的，独立撰写家电行业集成灶龙头公司亿田智能 (300911.SZ)万字深度报告初稿


#### AECOM Consulting（艾奕康咨询）助理工程师（全职）2020.3 – 2022.3

负责财富 500 强美股龙头公司 (NYSE:ACM)在香港、澳洲地区的基础设施建设项目工作时长：2 年

投资研究：聚焦 PPP 公私合营与 TOD 地产开发相结合的轨道交通市场化投融资模式，通过宏观战略规划、盈利模型设计，预期效益分析，协助政府与 MTR 等地铁公司建立以轨道 RAIL+物业 PROPERTY 为核心的利益循环机制

可持续设计：在全球交付中心（GDC），负责香港、澳大利亚等地区建筑、交通等城市基础设施的智能化设计与运维，提供可持续发展及绿色建筑（LEED）咨询服务，包括全寿命周期能耗和碳足迹分析（ESG）、可再生能源方案设计等项目管理：以三维信息数据为基础，应用大数据、BIM 与云计算技术，协助建筑企业提高基于云端可视化平台的信息化管理水平，进行数字化转型；整合项目成本、造价、现金流排布等数据保证 IRR、项目净利率等指标达到 10 - 20%

参与项目：获得澳大利亚 Sydney Gateway 项目 MVP，参与新西兰 City Rail Link、新加坡 Mandai Safari Park 等


##### 久谦管理咨询有限公司硬科技组（PTA） 2018.6 – 2018.9

行业研究：协助项目经理服务 PE/VC 等投资机构对新能源汽车电池、AI 图像处理芯片、云计算数据中心等前沿科技行业的投资咨询；根据前期调研完成量化信息源的方法论设计，结合案头研究定制 10+篇专家访谈提纲

深度报告：结构化整理 80h+访谈纪要，经数据清洗核验后运用波特五力模型、SWOT 等分析法产出 5 份投资报告


## Patents & Awards

Haomin, LUO., A UVC Purifier for Improving IAQ in Building Environment. Patent Application Number: ZL 2013 3 0320199.2

Haomin, LUO., Indoor Air Purification Device. Patent Application Number: ZL 2013 2 0094064.3 (Authorized)

03/2024 MSc Excellent Student Scholarship (Top 5%)

11/2023 2nd Place in the 2023 NeurIPS CityLearn Challenge (Top 2)

05/2021 Most Valued Player in Sydney Gateway Project of AECOM (Top 1)

12/2018 Mingcheng Scholarship of Southwest Jiaotong University (Top 10%)

06/2018 2017-2018 Outstanding Individual of Southwest Jiaotong University (Top 5%)

04/2018 6th Place in 2018 ASCE Mid-Pacific Student Conference Concrete Canoe Competition (International Award)

03/2017 4th Place in the 2017 ASCE Southeast Student Conference Steel Bridge Competition (International Award)

## Cotact

📧 Feel free to reach out: [hl682@cam.ac.uk](mailto:hl682@cam.ac.uk)
