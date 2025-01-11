import { FactionKey, Building } from '../utilities/types';
import { useStore } from './useStore';

export const useBuildings = () => {

  const computeBuildingPower = (
    factionKey: FactionKey,
    building: Building,
  ) => {
    const store = useStore();
    const { level, grid, buildings } = store.factions[factionKey];
  
    let totalPower = building.power;
    let adjacencySum = 0;
    
    const buildingIndex = grid.indexOf(building.id);
    if (buildingIndex === -1) return totalPower;

    const { x: bx, y: by } = getXY(buildingIndex, level);

    grid.forEach((neighborId, neighborIndex) => {
      if (!neighborId) return;

      const neighborBldg = buildings.find(b => b.id === neighborId);
      if (!neighborBldg || !neighborBldg.adjacency) return;

      const { x: nx, y: ny } = getXY(neighborIndex, level);

      const dx = bx - nx;
      const dy = by - ny;
  
      const offset = neighborBldg.adjacency.find(o => o.dx === dx && o.dy === dy);
      if (offset) {
        adjacencySum += offset.modifier;
      }
    });
  
    const finalMultiplier = 1 + adjacencySum;
    totalPower *= finalMultiplier;

    return totalPower;
  };

  //replace with costs
  sunBuildings.forEach((building, index) => {
    const sunCost = sunCosts.find(cost => cost[0] === building.id);
    if (!sunCost) {
      console.warn(`No cost found for ${building.id}`);
      return;
    }
    building.power = sunCost[1];
    building.buildPrerequisite.power = sunCost[2];
    building.viewPrerequisite.power = sunCost[3];
  });

  moonBuildings.forEach((building, index) => {
    const moonCost = moonCosts.find(cost => cost[0] === building.id);
    if (!moonCost) {
      console.warn(`No cost found for ${building.id}`);
      return;
    }
    building.power = moonCost[1];
    building.buildPrerequisite.power = moonCost[2];
    building.viewPrerequisite.power = moonCost[3];
  });

  return { computeBuildingPower, sunBuildings, moonBuildings };
}

function getXY(index: number, cols: number) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  return { x, y };
}

const sunCosts = [
  //----------------------POWER-COST--VIEW----------------------------------------
  // ─────────────────────────────────────────────────────────────────────────────
  // TIER 1
  // ─────────────────────────────────────────────────────────────────────────────
  ['sun-farming-1',       1,    20,   10],
  ['sun-production-1',    1,    100,   50],
  ['sun-religion-1',      1,    0,   0],
  ['sun-entertainment-1', 1,    180,   90],
  ['sun-education-1',     1,    250,   125],
  ['sun-other-1',         5,    500,   250],
  // ─────────────────────────────────────────────────────────────────────────────
  // TIER 2
  // ─────────────────────────────────────────────────────────────────────────────
  ['sun-farming-2',       10,   5000,  2500],
  ['sun-production-2',    10,   5000,  2500],
  ['sun-religion-2',      10,   5000,  2500],
  ['sun-entertainment-2', 10,   5000,  2500],
  ['sun-education-2',     10,   5000,  2500],
  ['sun-other-2',         50,   12500, 6250],
  // ─────────────────────────────────────────────────────────────────────────────
  // TIER 3
  // ─────────────────────────────────────────────────────────────────────────────
  ['sun-farming-3',       100,  10000, 5000 ],
  ['sun-production-3',    100,  10000, 5000 ],
  ['sun-religion-3',      100,  10000, 5000 ],
  ['sun-entertainment-3', 100,  10000, 5000 ],
  ['sun-education-3',     100,  10000, 5000 ],
  ['sun-other-3',         500,  20000, 10000],
  // ─────────────────────────────────────────────────────────────────────────────
  // TIER 4
  // ─────────────────────────────────────────────────────────────────────────────
  ['sun-farming-4',       1000, 20000, 10000],
  ['sun-production-4',    1000, 20000, 10000],
  ['sun-religion-4',      1000, 20000, 10000],
  ['sun-entertainment-4', 1000, 20000, 10000],
  ['sun-education-4',     1000, 20000, 10000],
  ['sun-other-4',         5000, 40000, 20000],
  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  ['sun-endgame-1',       5000, 40000, 20000],
  ['sun-endgame-2',       5000, 40000, 20000],
  ['sun-endgame-3',       5000, 40000, 20000],
  ['sun-endgame-4',       5000, 40000, 20000],
];

const moonCosts = [
  //----------------------POWER-COST----------------------------------------------
  // ─────────────────────────────────────────────────────────────────────────────
  // TIER 1
  // ─────────────────────────────────────────────────────────────────────────
  ['moon-sustenance-1',   1,    30,   15],
  ['moon-science-1',      1,    100,   50],
  ['moon-religion-1',     1,    0,   0],
  ['moon-entertainment-1',1,    180,   90],
  ['moon-education-1',    1,    250,   125],
  ['moon-other-1',        5,    500,   250],
  // ─────────────────────────────────────────────────────────────────────────
  // TIER 2
  // ─────────────────────────────────────────────────────────────────────────
  ['moon-sustenance-2',   10,   5000,  2500],
  ['moon-science-2',      10,   5000,  2500],
  ['moon-religion-2',     10,   5000,  2500],
  ['moon-entertainment-2',10,   5000,  2500],
  ['moon-education-2',    10,   5000,  2500],
  ['moon-other-2',        50,   12500, 6250],
  // ─────────────────────────────────────────────────────────────────────────
  // TIER 3
  // ─────────────────────────────────────────────────────────────────────────
  ['moon-sustenance-3',   100,  10000, 5000 ],
  ['moon-science-3',      100,  10000, 5000 ],
  ['moon-religion-3',     100,  10000, 5000 ],
  ['moon-entertainment-3',100,  10000, 5000 ],
  ['moon-education-3',    100,  10000, 5000 ],
  ['moon-other-3',        500,  20000, 10000],
  // ─────────────────────────────────────────────────────────────────────────
  // TIER 4
  // ─────────────────────────────────────────────────────────────────────────
  ['moon-sustenance-4',   1000, 20000, 10000],
  ['moon-science-4',      1000, 20000, 10000],
  ['moon-religion-4',     1000, 20000, 10000],
  ['moon-entertainment-4',1000, 20000, 10000],
  ['moon-education-4',    1000, 20000, 10000],
  ['moon-other-4',        5000, 40000, 20000],
  // ─────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────
  ['moon-endgame-1',      5000, 40000, 20000],
  ['moon-endgame-2',      5000, 40000, 20000],
  ['moon-endgame-3',      5000, 40000, 20000],
  ['moon-endgame-4',      5000, 40000, 20000],
];

const sunBuildings: Building[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // FARMING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-farming-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'sun-farming-2',
    viewPrerequisite: {
        buildings: ['sun-farming-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-farming-1'],
    },
    adjacency: [
      { dx: 0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: 0, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-farming-3',
    viewPrerequisite: {
        buildings: ['sun-farming-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-farming-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: +0.2 },
      { dx: -1, dy:  0, modifier: -0.1 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-farming-4',
    viewPrerequisite: {
        buildings: ['sun-farming-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-farming-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.2 },
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PRODUCTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-production-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy: -1, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-production-2',
    viewPrerequisite: {
        buildings: ['sun-production-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-production-1'],
    },
    adjacency: [
      { dx: 0, dy: -1, modifier: +0.15 },
    ],
  },
  {
    id: 'sun-production-3',
    viewPrerequisite: {
        buildings: ['sun-production-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-production-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.1 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-production-4',
    viewPrerequisite: {
        buildings: ['sun-production-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-production-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: +2, dy:  0, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: +0.1 },
      { dx:  0, dy: +2, modifier: -0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-religion-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    viewUnlocked: true,
    buildUnlocked: true,
  },
  {
    id: 'sun-religion-2',
    viewPrerequisite: {
        buildings: ['sun-religion-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-religion-1'],
    },
    adjacency: [
      { dx: -1, dy: 0, modifier: +0.1 },
      { dx: +1, dy: 0, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-religion-3',
    viewPrerequisite: {
        buildings: ['sun-religion-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-religion-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.25 },
      { dx:  0, dy: -1, modifier: -0.2 },
      { dx: +1, dy: -1, modifier: +0.25 },
      { dx: -1, dy:  0, modifier: +0.05 },
      { dx: +1, dy:  0, modifier: +0.05 },
    ],
  },
  {
    id: 'sun-religion-4',
    viewPrerequisite: {
        buildings: ['sun-religion-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-religion-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx: -1, dy: -2, modifier: +0.1 },
      { dx: +1, dy: -2, modifier: -0.2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-entertainment-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
    ],
  },
  {
    id: 'sun-entertainment-2',
    viewPrerequisite: {
        buildings: ['sun-entertainment-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-entertainment-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-entertainment-3',
    viewPrerequisite: {
        buildings: ['sun-entertainment-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-entertainment-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: +0.15 },
      { dx: +1, dy:  0, modifier: -0.05 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: +0.05 },
    ],
  },
  {
    id: 'sun-entertainment-4',
    viewPrerequisite: {
        buildings: ['sun-entertainment-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-entertainment-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.1 },
      { dx:  0, dy: -3, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-education-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'sun-education-2',
    viewPrerequisite: {
        buildings: ['sun-education-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-education-1'],
    },
    adjacency: [
      { dx: -1, dy: +1, modifier: +0.15 },
    ],
  },
  {
    id: 'sun-education-3',
    viewPrerequisite: {
        buildings: ['sun-education-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-education-2'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -2, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-education-4',
    viewPrerequisite: {
        buildings: ['sun-education-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-education-3'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.3 },
      { dx: -2, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: +2, dy:  0, modifier: +0.05 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-other-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-other-2',
    viewPrerequisite: {
        buildings: ['sun-other-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-other-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: +0, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-other-3',
    viewPrerequisite: {
        buildings: ['sun-other-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-other-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-other-4',
    viewPrerequisite: {
        buildings: ['sun-other-3'],
    },
    buildPrerequisite: {
        buildings: ['sun-other-3'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: -2, dy: +0, modifier: -0.1 },
      { dx: +1, dy: -1, modifier: +0.2 },
      { dx: +2, dy: -2, modifier: -0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-endgame-1',
    viewPrerequisite: {
      buildings: ['sun-farming-4', 'sun-production-4', 'sun-religion-4', 'sun-entertainment-4', 'sun-education-4', 'sun-other-4'],
    },
    buildPrerequisite: {
      buildings: ['sun-farming-4', 'sun-production-4', 'sun-religion-4', 'sun-entertainment-4', 'sun-education-4', 'sun-other-4'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-endgame-2',
    viewPrerequisite: {
        buildings: ['sun-endgame-1'],
    },
    buildPrerequisite: {
        buildings: ['sun-endgame-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: -1, dy: -1, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-endgame-3',
    viewPrerequisite: {
        buildings: ['sun-endgame-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-endgame-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: +0.1 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: -1, dy: +1, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: +0.1 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-endgame-4',
    viewPrerequisite: {
        buildings: ['sun-endgame-2'],
    },
    buildPrerequisite: {
        buildings: ['sun-endgame-2'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: -1, dy: -1, modifier: -0.1 },
      { dx: +1, dy: -1, modifier: +0.1 },
      { dx: -2, dy:  0, modifier: +0.2 },
      { dx: +2, dy:  0, modifier: -0.1 },
    ],
  },
];

const moonBuildings: Building[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // SUSTENANCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-sustenance-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-sustenance-2',
    viewPrerequisite: {
        buildings: ['moon-sustenance-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-sustenance-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-sustenance-3',
    viewPrerequisite: {
        buildings: ['moon-sustenance-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-sustenance-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: +0.2 },
      { dx: -1, dy:  0, modifier: +0.1 },
      { dx: +1, dy:  0, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-sustenance-4',
    viewPrerequisite: {
        buildings: ['moon-sustenance-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-sustenance-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx:  0, dy: -3, modifier: -0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SCIENCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-science-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-science-2',
    viewPrerequisite: {
        buildings: ['moon-science-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-science-1'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-science-3',
    viewPrerequisite: {
        buildings: ['moon-science-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-science-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: -1, dy: +1, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: +0.1 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-science-4',
    viewPrerequisite: {
        buildings: ['moon-science-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-science-3'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-religion-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    viewUnlocked: true,
    buildUnlocked: true,
  },
  {
    id: 'moon-religion-2',
    viewPrerequisite: {
        buildings: ['moon-religion-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-religion-1'],
    },
    adjacency: [
      { dx:  0, dy: +1, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-religion-3',
    viewPrerequisite: {
        buildings: ['moon-religion-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-religion-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.3 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -2, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-religion-4',
    viewPrerequisite: {
        buildings: ['moon-religion-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-religion-3'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: -0.2 },
      { dx: +1, dy: -1, modifier: +0.2 },
      { dx: -1, dy:  0, modifier: +0.1 },
      { dx: +1, dy:  0, modifier: +0.1 },
      { dx: -1, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: +0.05 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-entertainment-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-entertainment-2',
    viewPrerequisite: {
        buildings: ['moon-entertainment-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-entertainment-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -2, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-entertainment-3',
    viewPrerequisite: {
        buildings: ['moon-entertainment-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-entertainment-2'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-entertainment-4',
    viewPrerequisite: {
        buildings: ['moon-entertainment-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-entertainment-3'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -2, modifier: +0.1 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx: +1, dy: +1, modifier: +0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-education-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-education-2',
    viewPrerequisite: {
        buildings: ['moon-education-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-education-1'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-education-3',
    viewPrerequisite: {
        buildings: ['moon-education-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-education-2'],
    },
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: -2, dy:  0, modifier: +0.1 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: +2, dy:  0, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-education-4',
    viewPrerequisite: {
        buildings: ['moon-education-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-education-3'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -2, modifier: +0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-other-1',
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy: -1, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-other-2',
    viewPrerequisite: {
        buildings: ['moon-other-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-other-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
    ],
  },
  {
    id: 'moon-other-3',
    viewPrerequisite: {
        buildings: ['moon-other-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-other-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.2 },
      { dx:  0, dy: +1, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-other-4',
    viewPrerequisite: {
        buildings: ['moon-other-3'],
    },
    buildPrerequisite: {
        buildings: ['moon-other-3'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy:  0, modifier: -0.05 },
      { dx: +1, dy:  0, modifier: +0.05 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: +0.1 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-endgame-1',
    viewPrerequisite: {
      buildings: ['moon-sustenance-4', 'moon-science-4', 'moon-religion-4', 'moon-entertainment-4', 'moon-education-4', 'moon-other-4'],
    },
    buildPrerequisite: {
        buildings: ['moon-sustenance-4', 'moon-science-4', 'moon-religion-4', 'moon-entertainment-4', 'moon-education-4', 'moon-other-4'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-endgame-2',
    viewPrerequisite: {
        buildings: ['moon-endgame-1'],
    },
    buildPrerequisite: {
        buildings: ['moon-endgame-1'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: -1, dy: +0, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-endgame-3',
    viewPrerequisite: {
        buildings: ['moon-endgame-2'],
    },
    buildPrerequisite: {
        buildings: ['moon-endgame-2'],
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx: -1, dy: +1, modifier: +0.1 },
      { dx: +1, dy: +1, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-endgame-4',
    viewPrerequisite: {
      buildings: ['moon-endgame-2'],
    },
    buildPrerequisite: {
      buildings: ['moon-endgame-2'],
    },
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
      { dx:  0, dy: -2, modifier: +0.2 },
      { dx: -1, dy: -1, modifier: -0.1 },
      { dx: +1, dy: -1, modifier: +0.1 },
      { dx: -1, dy: +1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: -0.2 },
    ],
  },
];
