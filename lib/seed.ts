import type { LabNote, LensPhoto, Paper, ReadingPiece, RunwayItem, VideoPiece } from "./types";

export const seedPapers: Paper[] = [
  {
    slug: "htde-maddpg",
    title: "Integrating adaptive grouping into MADDPG",
    years: "2024–2026",
    venue: "First-year report · intended for arXiv",
    abstract:
      "Distributed batteries and rooftop solar are changing the street-level grid. A single controller does not scale; agents that never speak to one another still peak together. HTDE-MADDPG lets storage agents form coordination clusters from local observations, then act apart. Grouping uses a graph attention network and a differentiable Gumbel-Sigmoid sample. The reward watches the tariff, the district peak, and needless ramping. On a CityLearn microgrid the method is compared with no control, DTDE-MADDPG, CTDE-MADDPG, and a model-predictive bound.",
    explainer:
      "Many batteries, one street. If each battery thinks only of its own bill, the street still surges. If one office steers them all, the office becomes the bottleneck. The work is a middle room: agents gather into small groups when the situation asks for it, share what the group needs, and then execute on their own. The groups are not assigned by hand. They are learned.",
    hero: "/media/diagram.svg",
    figures: ["/media/quad.svg"],
    measures: [
      { label: "Cost", value: "−46.6%" },
      { label: "Peak", value: "−37.0%" },
      { label: "Carbon", value: "−38.7%" },
      { label: "Ramping", value: "−22.3%" },
    ],
  },
];

export const seedNotes: LabNote[] = [
  {
    slug: "group-that-would-not-split",
    title: "The group that would not split",
    date: "Seed · unpublished",
    premise:
      "A placeholder note in the shape of the grouping method. Replace it in Studio with a real failed run.",
    failed:
      "The attention scores collapsed. By the middle of training every storage agent had joined one cluster. The Gumbel-Sigmoid temperature sat too low, so a second group was almost never sampled. The cost curve looked kind because the cluster was behaving like a central controller — the thing the method is not allowed to become.",
    lesson: "Temperature is part of the hypothesis, not a hidden constant. A group that cannot dissolve is not a group.",
    figure: "/media/diagram.svg",
  },
  {
    slug: "peak-ate-the-cost",
    title: "When the peak ate the cost",
    date: "Seed · unpublished",
    premise: "Another placeholder. The reward had three terms. One of them shouted.",
    failed:
      "A heavy peak penalty taught the agents to flatten the curve and ignore the tariff. The district looked calm. The bill rose. The scalar weights were a guess carried over from an earlier week, not a schedule anyone had argued for.",
    lesson: "A weight is a claim. Write it down, or it will quietly become the paper.",
    figure: "/media/fog-path.svg",
  },
];

export const seedReading: ReadingPiece[] = [
  {
    slug: "maddpg",
    title: "Multi-agent actor-critic for mixed cooperative-competitive environments",
    authors: "Lowe, Wu, Tamar, Harb, Abbeel, Mordatch",
    year: "2017",
    why: "The line of centralized training and decentralized execution that the grouping work answers.",
    explainer:
      "Each agent has its own policy. During training a critic is allowed to see more than the agent will see at execution. The paper is the reason the letters CTDE appear so often beside MADDPG. I keep it here because the scalability question begins exactly where this critic stops being affordable.",
    link: "https://arxiv.org/abs/1706.02275",
    infographic: "/media/diagram.svg",
  },
  {
    slug: "maml",
    title: "Model-agnostic meta-learning",
    authors: "Finn, Abbeel, Levine",
    year: "2017",
    why: "The longer question on this site: not only a policy for one tariff, but a way of learning when the tariff changes.",
    explainer:
      "Train so that a few further steps can adapt the model to a new task. The grid is not one task. Prices, weather, and occupancy move. Meta-learning is named here as a direction, not as a result I am claiming.",
    link: "https://arxiv.org/abs/1703.03400",
    infographic: "/media/tracery.svg",
  },
  {
    slug: "citylearn",
    title: "CityLearn",
    authors: "Vázquez-Canteli, Kämpf, Henze, Nagy",
    year: "2020",
    why: "A shared testbed for demand response, so that controllers can be compared without each paper inventing its own city.",
    explainer:
      "CityLearn standardizes multi-agent control of energy storage and flexible loads. Earlier project work with the NeurIPS CityLearn challenges sat on this kind of ground: batteries, tariffs, carbon intensity, and a baseline one has to beat honestly.",
    link: "https://arxiv.org/abs/2012.10504",
    infographic: "/media/quad.svg",
  },
];

export const seedRunway: RunwayItem[] = [
  {
    slug: "selfwho-ss2026",
    title: "SS2026 ready-to-wear",
    house: "SELFWHO",
    season: "Spring / Summer 2026",
    date: "March 2026",
    kind: "campaign",
    credit: "Campaign film. Mother agency: Lacoco Models.",
    note: "A film plate. The stills below are glazed studies, standing in until the campaign frames are uploaded.",
    stills: ["/media/drape.svg", "/media/tracery.svg"],
  },
  {
    slug: "selfwho-smiley-2026",
    title: "Smiley series",
    house: "SELFWHO",
    season: "2026",
    date: "March 2026",
    kind: "campaign",
    credit: "Advertisement. Mother agency: Lacoco Models.",
    note: "Replace the cloth study with the campaign still.",
    stills: ["/media/drape.svg"],
  },
];

export const seedLens: LensPhoto[] = [
  {
    slug: "cloister-study",
    title: "Cloister, low fog",
    series: "Stone",
    year: "Study",
    place: "Cambridge",
    caption: "A glazed stand-in. The photograph itself is uploaded in Studio.",
    image: "/media/cloister.svg",
  },
  {
    slug: "court-lawn",
    title: "Court",
    series: "Stone",
    year: "Study",
    place: "Cambridge",
    caption: "Lawn, gravel, and the long range of a college. Placeholder plate.",
    image: "/media/quad.svg",
  },
  {
    slug: "cloth-fold",
    title: "Fold",
    series: "Cloth",
    year: "Study",
    place: "",
    caption: "Drape without a body. A lighting note, not a portrait.",
    image: "/media/drape.svg",
  },
];

export const seedVideos: VideoPiece[] = [
  {
    slug: "film-slot",
    title: "Film slot",
    url: "",
    kind: "runway",
    caption: "Add a YouTube, Vimeo, or file URL in Studio. This entry is a placeholder and is hidden when it has no URL.",
    poster: "/media/fog-path.svg",
  },
];
