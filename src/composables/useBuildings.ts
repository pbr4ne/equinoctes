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
  {
    id: 'sun-1',
    power: 1,
    unlocked: true,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {},
    viewUnlocked: true,
    buildUnlocked: true,
  },
  {
    id: 'sun-2',
    power: 2,
    unlocked: true,
    index: null,
    viewPrerequisite: {},
    buildPrerequisite: {
      power: 10,
    },
    adjacency: [
      { dx: 0, dy: -1, modifier: 0.5 },
      { dx: +1, dy: 0, modifier: 0.5 },
      { dx: -1, dy: 0, modifier: 0.5 },
      { dx: 0, dy: +1, modifier: 0.5 },
    ],
  },
  {
    id: 'sun-3',
    power: 3,
    unlocked: true,
    index: null,
    viewPrerequisite: {
      power: 15,
      buildings: ['sun-2'],
    },
    buildPrerequisite: {
      power: 20,
    },
    adjacency: [
      { dx: -1, dy: -1, modifier: -0.25},
      { dx: +1, dy: -1, modifier: -0.25},
      { dx: -1, dy: +1, modifier: -0.25},
      { dx: +1, dy: +1, modifier: -0.25},
    ],
  },
  {
    id: 'sun-4',
    power: 4,
    unlocked: true,
    index: null,
    viewPrerequisite: {
      power: 25,
    },
    buildPrerequisite: {
      power: 30,
    },
  },
  {
    id: 'sun-5',
    power: 5,
    unlocked: true,
    index: null,
    viewPrerequisite: {
      power: 35,
    },
    buildPrerequisite: {
      power: 40,
    },
  }
];

export const moonBuildings: Building[] = [
  {
    id: 'moon-1',
    power: 1,
    unlocked: true,
    index: 0,
    viewPrerequisite: {},
    buildPrerequisite: {},
  },
  {
    id: 'moon-2',
    power: 2,
    unlocked: true,
    index: null,
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: 0, dy: -1, modifier: 0.5 },
      { dx: +1, dy: 0, modifier: 0.5 },
      { dx: -1, dy: 0, modifier: 0.5 },
      { dx: 0, dy: +1, modifier: 0.5 },
      { dx: -1, dy: -1, modifier: -0.25},
      { dx: +1, dy: -1, modifier: -0.25},
      { dx: -1, dy: +1, modifier: -0.25},
      { dx: +1, dy: +1, modifier: -0.25},
    ]
  },
  {
    id: 'moon-3',
    power: 3,
    unlocked: true,
    index: null,
    viewPrerequisite: {},
    buildPrerequisite: {},
    adjacency: [
      { dx: 0, dy: -1, modifier: 0.5 },
      { dx: -1, dy: 0, modifier: 0.5 },
      { dx: -1, dy: -1, modifier: -0.25},
      { dx: -1, dy: +1, modifier: -0.25},
    ]
  },
  {
    id: 'moon-4',
    power: 4,
    unlocked: true,
    index: null,
    viewPrerequisite: {},
    buildPrerequisite: {},
  },
  {
    id: 'moon-5',
    power: 5,
    unlocked: true,
    index: null,
    viewPrerequisite: {},
    buildPrerequisite: {},
  }
];
