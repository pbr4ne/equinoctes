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
    
    grid.forEach((neighbourId, neighbourIndex) => {
      
      if (!neighbourId) return;
  
      const neighborBldg = buildings.find(b => b.id === neighbourId);
      if (!neighborBldg || !neighborBldg.adjacency) return;
  
      if (building.index === null) return;
      const { x: bx, y: by } = getXY(building.index, level);
      const { x: nx, y: ny } = getXY(neighbourIndex, level);
  
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

  return { computeBuildingPower, sunBuildings, moonBuildings };
}

function getXY(index: number, cols: number) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  return { x, y };
}

export const sunBuildings: Building[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // FARMING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-farming-1',
    power: 1,
    unlocked: true,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {},
    viewUnlocked: true,
    buildUnlocked: true,
  },
  {
    id: 'sun-farming-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-farming-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-farming-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: 0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: 0, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-farming-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-farming-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-farming-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-farming-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-farming-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-production-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-production-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-production-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: 0, dy: -1, modifier: +0.15 },
    ],
  },
  {
    id: 'sun-production-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-production-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-production-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-production-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-production-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-religion-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-religion-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-religion-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy: 0, modifier: +0.1 },
      { dx: +1, dy: 0, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-religion-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-religion-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-religion-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-religion-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-religion-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-entertainment-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-entertainment-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-entertainment-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-entertainment-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-entertainment-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-entertainment-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-entertainment-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-entertainment-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-education-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-education-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-education-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy: +1, modifier: +0.15 },
    ],
  },
  {
    id: 'sun-education-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-education-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-education-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx:  0, dy: -2, modifier: +0.1 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-education-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-education-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-education-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-other-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-other-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-other-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: +0, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-other-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-other-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-other-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'sun-other-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-other-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-other-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      buildings: ['sun-farming-4', 'sun-production-4', 'sun-religion-4', 'sun-entertainment-4', 'sun-education-4', 'sun-other-4'],
    },
    buildPrerequisite: {
      power: 40,
      buildings: ['sun-farming-4', 'sun-production-4', 'sun-religion-4', 'sun-entertainment-4', 'sun-education-4', 'sun-other-4'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'sun-endgame-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['sun-endgame-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['sun-endgame-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: -1, dy: -1, modifier: +0.1 },
    ],
  },
  {
    id: 'sun-endgame-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['sun-endgame-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['sun-endgame-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['sun-endgame-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['sun-endgame-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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

export const moonBuildings: Building[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // SUSTENANCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-sustenance-1',
    power: 1,
    unlocked: true,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: true,
    buildUnlocked: true,
  },
  {
    id: 'moon-sustenance-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-sustenance-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-sustenance-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-sustenance-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-sustenance-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-sustenance-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-sustenance-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-sustenance-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'moon-science-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-science-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-science-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: -0.1 },
    ],
  },
  {
    id: 'moon-science-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-science-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-science-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-science-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-science-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'moon-religion-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-religion-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-religion-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: +1, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-religion-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-religion-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-religion-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.3 },
      { dx: +1, dy: -1, modifier: -0.1 },
      { dx:  0, dy: -2, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-religion-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-religion-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-religion-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: true,
  },
  {
    id: 'moon-entertainment-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-entertainment-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-entertainment-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.1 },
      { dx:  0, dy: -2, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-entertainment-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-entertainment-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-entertainment-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
      { dx:  0, dy: +1, modifier: -0.1 },
      { dx:  0, dy: +2, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-entertainment-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-entertainment-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-entertainment-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'moon-education-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-education-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-education-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: +1, dy:  0, modifier: +0.2 },
    ],
  },
  {
    id: 'moon-education-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-education-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-education-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy:  0, modifier: +0.2 },
      { dx: -2, dy:  0, modifier: +0.1 },
      { dx: +1, dy:  0, modifier: -0.1 },
      { dx: +2, dy:  0, modifier: +0.05 },
    ],
  },
  {
    id: 'moon-education-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-education-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-education-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 40,
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'moon-other-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-other-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-other-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.3 },
    ],
  },
  {
    id: 'moon-other-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-other-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-other-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx: -1, dy: -1, modifier: +0.2 },
      { dx: +1, dy: -1, modifier: -0.2 },
      { dx:  0, dy: +1, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-other-4',
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-other-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-other-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 1,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      buildings: ['moon-sustenance-4', 'moon-science-4', 'moon-religion-4', 'moon-entertainment-4', 'moon-education-4', 'moon-other-4'],
    },
    buildPrerequisite: {
      power: 20,
      buildings: ['moon-sustenance-4', 'moon-science-4', 'moon-religion-4', 'moon-entertainment-4', 'moon-education-4', 'moon-other-4'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
  },
  {
    id: 'moon-endgame-2',
    power: 4,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 40,
      buildings: ['moon-endgame-1'],
    },
    buildPrerequisite: {
      power: 80,
      buildings: ['moon-endgame-1'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
    adjacency: [
      { dx:  0, dy: -1, modifier: +0.2 },
      { dx: -1, dy: +0, modifier: +0.1 },
    ],
  },
  {
    id: 'moon-endgame-3',
    power: 7,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 70,
      buildings: ['moon-endgame-2'],
    },
    buildPrerequisite: {
      power: 140,
      buildings: ['moon-endgame-2'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
    power: 10,
    unlocked: false,
    index: null,
    viewPrerequisite: {
      power: 100,
      buildings: ['moon-endgame-3'],
    },
    buildPrerequisite: {
      power: 200,
      buildings: ['moon-endgame-3'],
    },
    viewUnlocked: false,
    buildUnlocked: false,
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
