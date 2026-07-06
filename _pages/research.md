---
permalink: /research/
title: "Research Experience"
author_profile: true
lang: en
translation_url: /zh/research/
---

### Integrating Adaptive Grouping into MADDPG for Distributed Energy Storage Coordination in Smart Microgrids

*Based on First Year report, will be put on arXiv for Publication Later, Oct 2024 - Jul 2026*

The rapid proliferation of distributed photovoltaic (PV) systems and the declining costs of battery energy storage systems (BESS) are fundamentally transforming power distribution networks. As prosumers become increasingly prevalent, microgrids face unprecedented challenges in coordinating numerous distributed energy resources (DERs) to achieve grid stability, economic efficiency, and carbon reduction goals. Traditional centralized control approaches struggle to scale with the growing number of controllable assets, while purely decentralized methods fail to capture the coordination benefits essential for demand response and peak shaving applications.

Multi-Agent Reinforcement Learning (MARL) offers a promising paradigm for DER coordination, yet existing training frameworks exhibit inherent limitations: Decentralized Training with Decentralized Execution (DTDE) suffers from environment non-stationarity and lack of inter-agent coordination, while Centralized Training with Decentralized Execution (CTDE) encounters scalability bottlenecks and communication constraints as agent populations grow.

To address this scalability-coordination dilemma, we innovatively integrate the concept of grouped training into the MADDPG framework, proposing a novel algorithm—HTDE-MADDPG—that enables agents to dynamically form coordination clusters based on local observations while maintaining decentralized execution. The proposed algorithm features an adaptive grouping module employing Graph Attention Networks (GAT) for information aggregation and Gumbel-Sigmoid sampling for differentiable group formation. A unified reward function is designed with three components: local cost minimization aligned with time-of-use pricing, district-level peak demand contribution with adaptive thresholds, and ramping penalties to improve power quality.

We evaluate the proposed HTDE-MADDPG against baseline (no control), DTDE-MADDPG, CTDE-MADDPG, and Model Predictive Control (MPC) bounds in the CityLearn microgrid simulation environment. Experimental results on a real-world microgrid over a 60-day horizon demonstrate that HTDE-MADDPG achieves 46.6% cost reduction, 37.0% peak demand reduction, 38.7% carbon emission reduction, and 22.3% load ramping  reduction compared to the baseline—consistently outperforming both DTDE (41.7%, 28.3%, 32.3%, 7.0%) and CTDE counterparts across all metrics. Notably, the proposed algorithm exhibits faster convergence and more stable training dynamics than DTDE-MADDPG, while avoiding the communication overhead of CTDE approaches. The adaptive grouping mechanism effectively bridges the gap between scalability and coordination of MARL, offering a practical solution for large-scale DER management in future smart grids


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
