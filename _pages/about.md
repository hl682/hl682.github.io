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

Beyond academia, I am a part-time fashion model and a photographer for the [**Cambridge University Charity Fashion Show (CUCFS)**](https://cucfs.co.uk/). An avid rower, I represent the  **[Lady Margaret Boat Club (LMBC)](https://www.ladymargaretboatclub.org/)** —having competed in the Lent/May Bumps and HORR—and serve as Vice President of the [**Cambridge Chinese Rower Network**](https://www.cambridgesu.co.uk/organisation/23438/)(CCRN). I also sit on the Executive Committee for the Entrepreneurship Department of the **[Chinese Students and Scholar Association in Cambridge(CSSA)](https://cssacam.org/)**. Additionally, I am a classically trained violinist with 20 years of experience, performing regularly in termly concerts with the **[Central Colleges Orchestra (CCO](https://www.cmp.cam.ac.uk/opportunities/entry/central-colleges-orchestra-cco/))**, [**King’s (KCMS)**](https://kcmsofficial.wordpress.com/) and **[Jesus’s (JCMS)](https://jcms.jesus.cam.ac.uk/)** College Music Societies.

## Education

* **PhD in Engineering**, University of Cambridge, Oct 2024 - present
* **MSc in Intelligent Technology and Management**, Hong Kong University of Science and Technology, Sep 2022 - Jun 2024
* **BEng in Civil Engineering**, Southwest Jiaotong University, Sep 2016 - Jun2020

## Research Experience

### **From Centralization to Intelligent Cooperation: A Scalability Analysis of Multi-Agent Reinforcement Learning (MARL) Paradigms for Decentralized Microgrid Energy Management**

*Based on First Year report, will be put on arXiv for Publication Later, Oct 2024 - Aug 2025*

**Research Background & Motivation**

* **Context:** Conducted at the **Energy Efficient Cities initiative (EECi), University of Cambridge**, addressing the global need for scalable control systems in residential microgrids equipped with Photovoltaics (PV) and Battery Energy Storage Systems (BESS).
* **Core Challenge:** Tackled the "trilemma" of **performance, privacy, and scalability** in energy management. **Traditional centralized controls (like CTDE) face "curse of dimensionality" and privacy bottlenecks, while fully decentralized methods (DTDE) often lack coordination stability**.
* **Objective:** To design a privacy-preserving, scalable control architecture that balances individual cost savings with collective grid stability (e.g., reducing ramping and peak loads).

**Technical Architecture & Methodology**

* **Simulation Environment:** Developed a high-fidelity co-simulation using  a gym environment: CityLearn  (Gymnasium interface), modeling a community of 17 Zero Net Energy (ZNE) buildings in Fontana, California, using real-world weather and load data.
* **Algorithmic Framework:** Implemented and rigorously benchmarked a comprehensive suite of control paradigms:
  * **Baselines:** Rule-Based Control (RBC) and Single-Agent RL (SAC, DDPG).
  * **MARL Benchmarks:** Centralized Training Decentralized Execution (CTDE-MADDPG) and Independent Learners (DTDE-MADDPG)
  * **Hybrid Innovation:** Proposed and validated  **GTDE (Grouped Training with Decentralised Execution)** , a novel architecture utilizing **adaptive, sparse communication protocols**
* **Mechanism Design:** The GTDE agent learns a dynamic communication graph to exchange "state-temporal abstractions" (via GRU encoders) only with relevant peers, replacing the need for global state sharing.

**Key Contributions & Results**

* **Scalability Verdict:** Proved that centralized architectures (SARL/CTDE) are non-scalable; SARL experienced "catastrophic learning failure" and CTDE performance degraded by **19%** when scaling from 4 to 14 buildings.
* **The "Price of Anarchy":** Demonstrated that while fully decentralized agents (DTDE) achieved optimal costs (10% improvement) via price signals, they caused grid instability and high ramping rates due to lack of coordination.
* **Superiority of GTDE:** The proposed GTDE framework emerged as the optimal solution, achieving a **43% reduction in community electricity costs** and a  **25% reduction in grid ramping** **, significantly outperforming both centralized and independent benchmarks**.
* **Communication Analysis:** Empirically invalidated naive communication methods (FDM family), showing that "poorly designed communication protocols are more detrimental than no communication," leading to a **338% increase in grid ramping** in some cases.

### [NeuroIPS Citylearn Challenge 2022](https://www.aicrowd.com/challenges/neurips-2022-citylearn-challenge) & [2023](https://neurips.cc/virtual/2023/competition/66590)

*Project Leader in Great Smart Cities Institute., HKUST., Supervised by Prof. Zhe (Walter) WANG, Sep 2022 - Jun 2024*

* This project aims to develop advanced controllers (e.g., model predictive control and reinforcement learning) to coordinate the load consumption of different households and to operate the thermal energy storage system to minimize the utility costs given the time-of-use utility structure and to minimize the CO2 emissions given varying carbon intensity of the grid
* The NeurIPS 2022: CityLearn Challenge’s 17 buildings’ one year operation data from the Sierra Crest home development inCalifornia were used as a virtual testbed and dataset, including PV generation, Weather data, Electricity demand, etc
* Trained multiple advanced deep reinforcement learning control algorithms (DDPG, SAC, PPO ,TD3) to manage the battery charging/discharging behavior, made the final result perfoms 13% better than the baseline
* Designed several corresponding KPIs (e.g. Average daily peak, Ramping, Zero net energy, Carbon emissionsd, etc.,) for the comparative study between different algorithms at the level of single building-level and grid-level, respectively, and it was found that the TD3 algorithm had the best overall performance, and was ahead of the DDPG by 3%-27% in proposed KPIs

### [Computational fluid dynamics (CFD) Simulation of Wind Tunnel Tests for High-rise Buildings &amp; Large-Span Bridges](https://yapimerkezi.com.tr/En/News/1915-Canakkale-Bridge-passed-the-wind-test-in-China)

*Research Assistant in XNJD-3 Lab (world's largest atmospheric boundary layer wind tunnel)., Supervised by Prof. Shixiong Zheng, Apr 2018 – Jun 2019*

* Participated in the CFD simulation of the wind resistance tests of high-rise buildings & large-span bridges under different wind directions & speeds, and the wind-induced catastrophe research of urban infrastructures in wind tunnel
* Responsible for the finite element analysis of buildings’ aeroelastic models under specific scale ratios and the simulation of the turbulent flow field in the aerodynamic experiment, to solve wind vibration problems such as flutter, galloping and buffeting.
* Successfully completed the wind tunnel test of the 1915 Turkish Çanakkale Bridge (world's longest bridge) within four months; Other projects including Shanghai Lujiazui Financial Trade Zone skyscraper cluster and Hålogaland Bridge in Norway

### [Green Building Design and Energy Simulation for Chengdu International Airport Terminals](https://www.yuandacn.com/index.php/en/projects-cn-2/123-domestic/sichuan/473-chengdu-tianfu-international-airport-terminal-2.html)

*Research Assistant in China State Construction Engineering Corporation (CSCEC) of the Chengdu International Airport project, Jun 2017 – Sep 2017*

* Committed to enhancing the environmental sustainability of airport terminals while simultaneously reducing their operational costs. throughout the entirety of the project's design and construction process, responsible for examining the overall energy consumption and carbon footprint of the T1 terminal (1.26 km²) and provide renewable energy feasibility solutions
* Conducting microclimate analysis of the site and used EnergyPlus to analyze energy consumption; through glare analysis of building facades, indoor thermal comfort analysis, and indoor lighting environment analysis, we used Ecotect, Fuzor and Sketchup to simulate the building's layout, ventilation, light intensity and calculated its best orientation
* The project won the 5th International BIM award (hosted by BSHK) and the excellence award of the 2020 Bentley Competition

## Professional Experience

### **Huatai Securities Co., Ltd.** | *TMT & Electronics Group*

*Equity Research Intern, Oct 2022 – Feb 2023*

* **Industry Tracking:** Monitored US and HK tech sectors, focusing on semiconductors, display panels, and consumer electronics. Tracked key EV players including  **Tesla** ,  **BYD** , and the "Wei-Xiao-Li" trio ( **NIO, XPeng, Li Auto** ).
* **In-Depth Research:** Initiated coverage on **Lianchuang Electronic (002036.SZ)** with a comprehensive investment report. Co-authored an English report for  **BOE Varitronix (0710.HK)** . Produced 5 thematic reports covering smart cockpits (LiDAR, chips) and monthly trends in autonomous driving and power batteries.

### **Soochow Securities** | *Real Estate & Construction Group (New Fortune Top-Ranked Team)*

*Equity Research Intern, Jun 2022 – Sep 2022*

* **Market Analysis:** Analyzed investment logic for **315 listed companies** by evaluating competitive landscapes, supply/demand dynamics, and inventory turnover amidst real estate credit volatility. Closely monitored policy easing and commodity prices (cement, glass).
* **Financial Modeling:** Maintained proprietary databases using  **Wind** ; updated high-frequency data including government bonds, construction contracts, and energy spreads. Assisted in building valuation/earnings models and published  **20+ weekly/monthly analysis reports** .
* **Thematic Research:** Conducted **equity penetration analysis** on land-acquiring firms to assess financial exposure. Performed sensitivity analysis on land prices and calculated comprehensive financing costs for **114 developers** (e.g., Poly Development, 600048.SH).
* **Coverage Initiation:** Expanded team coverage to the home appliance sector; authored a **10,000-word initiation report** on the integrated stove leader  **Yitian Smart (300911.SZ)** .

### **AECOM** | *Global Delivery Center / Infrastructure*

Assistant Engineer (Full-time), *Mar 2020 – Mar 2023*

* **Investment Consulting:** Focused on **TOD (Transit-Oriented Development)** and  **PPP models** . Designed profit models and strategic plans to assist government bodies and MTR Corp in establishing **"Rail + Property"** value capture mechanisms.
* **Sustainable Design:** Managed smart infrastructure projects (architecture/transportation). Provided **LEED** and  **ESG consulting** , conducting lifecycle energy consumption and carbon footprint analysis.
* **Digital Transformation:** Leveraged **BIM, Big Data, and Cloud Computing** to enhance project visualization and information management. Managed costs and cash flows to ensure project **IRR** and net profit margins reached  **10-20%** .
* **Key Projects:** Awarded **"Most Valuable Player"** for the **Sydney Gateway** project. Participated in the **New Zealand City Rail Link** and **Singapore Mandai Safari Park** projects.

### **Meritco Services** | *Hard Tech Practice*

***Part-Time Assistant (PTA)** | Jun 2018 – Sep 2018*

* **Due Diligence:** Assisted PE/VC clients with investment consulting in frontier tech sectors, including  **EV batteries, AI chips, and Cloud Data Centers** . Designed quantitative research methodologies and customized interview outlines for  **10+ industry experts** .
* **Data Analysis:** Synthesized **80+ hours** of expert interview transcripts. Conducted data cleaning and utilized **Porter’s Five Forces** and **SWOT analysis** to deliver  **5 comprehensive investment reports** .

## Patents & Awards

* Haomin, LUO., A UVC Purifier for Improving IAQ in Building Environment. Patent Application Number: ZL 2013 3 0320199.2
* Haomin, LUO., Indoor Air Purification Device. Patent Application Number: ZL 2013 2 0094064.3 (Authorized)
* 03/2024 MSc Excellent Student Scholarship (Top 5%)
* 11/2023 2nd Place in the 2023 NeurIPS CityLearn Challenge (Top 2)
* 05/2021 Most Valued Player in Sydney Gateway Project of AECOM (Top 1)
* 12/2018 Mingcheng Scholarship of Southwest Jiaotong University (Top 10%)
* 06/2018 2017-2018 Outstanding Individual of Southwest Jiaotong University (Top 5%)
* 04/2018 6th Place in 2018 ASCE Mid-Pacific Student Conference Concrete Canoe Competition (International Award)
* 03/2017 4th Place in the 2017 ASCE Southeast Student Conference Steel Bridge Competition (International Award)

## Cotact

📧 Feel free to reach out: [hl682@cam.ac.uk](mailto:hl682@cam.ac.uk)
