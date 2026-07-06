---
permalink: /academic/htde-maddpg/
title: "Integrating Adaptive Grouping into MADDPG for Distributed Energy Storage Coordination in Smart Microgrids"
author_profile: true
lang: en
translation_url: /zh/academic/htde-maddpg/
---
*Based on First Year report, will be put on arXiv for Publication Later, Oct 2024 - Jul 2026*

[← Back to Academic](/academic/)

<img src="/images/htde_maddpg_poster.png" alt="HTDE-MADDPG: Solving the Scalability-Coordination Dilemma in Smart Microgrids" style="max-width:100%; border-radius:8px; margin:1em 0;">

The rapid proliferation of distributed photovoltaic (PV) systems and the declining costs of battery energy storage systems (BESS) are fundamentally transforming power distribution networks. As prosumers become increasingly prevalent, microgrids face unprecedented challenges in coordinating numerous distributed energy resources (DERs) to achieve grid stability, economic efficiency, and carbon reduction goals. Traditional centralized control approaches struggle to scale with the growing number of controllable assets, while purely decentralized methods fail to capture the coordination benefits essential for demand response and peak shaving applications.

Multi-Agent Reinforcement Learning (MARL) offers a promising paradigm for DER coordination, yet existing training frameworks exhibit inherent limitations: Decentralized Training with Decentralized Execution (DTDE) suffers from environment non-stationarity and lack of inter-agent coordination, while Centralized Training with Decentralized Execution (CTDE) encounters scalability bottlenecks and communication constraints as agent populations grow.

To address this scalability-coordination dilemma, we innovatively integrate the concept of grouped training into the MADDPG framework, proposing a novel algorithm—HTDE-MADDPG—that enables agents to dynamically form coordination clusters based on local observations while maintaining decentralized execution. The proposed algorithm features an adaptive grouping module employing Graph Attention Networks (GAT) for information aggregation and Gumbel-Sigmoid sampling for differentiable group formation. A unified reward function is designed with three components: local cost minimization aligned with time-of-use pricing, district-level peak demand contribution with adaptive thresholds, and ramping penalties to improve power quality.

We evaluate the proposed HTDE-MADDPG against baseline (no control), DTDE-MADDPG, CTDE-MADDPG, and Model Predictive Control (MPC) bounds in the CityLearn microgrid simulation environment. Experimental results on a real-world microgrid over a 60-day horizon demonstrate that HTDE-MADDPG achieves 46.6% cost reduction, 37.0% peak demand reduction, 38.7% carbon emission reduction, and 22.3% load ramping reduction compared to the baseline—consistently outperforming both DTDE (41.7%, 28.3%, 32.3%, 7.0%) and CTDE counterparts across all metrics. Notably, the proposed algorithm exhibits faster convergence and more stable training dynamics than DTDE-MADDPG, while avoiding the communication overhead of CTDE approaches. The adaptive grouping mechanism effectively bridges the gap between scalability and coordination of MARL, offering a practical solution for large-scale DER management in future smart grids.

[← Back to Academic](/academic/)
