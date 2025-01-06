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
    name: 'Sun Building 1',
    description: 'Sun Building 1 description',
    icon: 'SunnyOutline',
    power: 1,
    unlocked: true,
    index: 0,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
  {
    id: 'sun-2',
    name: 'Sun Building 2',
    description: 'Sun Building 2 description',
    icon: 'CloudOutline',
    power: 2,
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
    adjacency: [
      { dx: 0, dy: -1, modifier: 0.5 },
      { dx: +1, dy: 0, modifier: 0.5 },
      { dx: -1, dy: 0, modifier: 0.5 },
      { dx: 0, dy: +1, modifier: 0.5 },
    ],
  },
  {
    id: 'sun-3',
    name: 'Sun Building 3',
    description: 'Sun Building 3 description',
    icon: 'Aperture',
    power: 3,
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
    adjacency: [
      { dx: -1, dy: -1, modifier: -0.25},
      { dx: +1, dy: -1, modifier: -0.25},
      { dx: -1, dy: +1, modifier: -0.25},
      { dx: +1, dy: +1, modifier: -0.25},
    ],
  },
  {
    id: 'sun-4',
    name: 'Sun Building 4',
    description: 'Sun Building 4 description',
    icon: 'Api',
    power: 4,
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
  {
    id: 'sun-5',
    name: 'Sun Building 5',
    description: 'Sun Building 5 description',
    icon: 'ArchitectureOutlined',
    power: 5,
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
  }
];

export const moonBuildings: Building[] = [
  {
    id: 'moon-1',
    name: 'Moon Building 1',
    description: 'Moon Building 1 description',
    power: 1,
    icon: 'MoonOutline',
    unlocked: true,
    index: 0,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
  {
    id: 'moon-2',
    name: 'Moon Building 2',
    description: 'Moon Building 2 description',
    power: 2,
    icon: 'StarOutline',
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
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
    name: 'Moon Building 3',
    description: 'Moon Building 3 description',
    power: 3,
    icon: 'Bed24Regular',
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
    adjacency: [
      { dx: 0, dy: -1, modifier: 0.5 },
      { dx: -1, dy: 0, modifier: 0.5 },
      { dx: -1, dy: -1, modifier: -0.25},
      { dx: -1, dy: +1, modifier: -0.25},
    ]
  },
  {
    id: 'moon-4',
    name: 'Moon Building 4',
    description: 'Moon Building 4 description',
    power: 4,
    icon: 'PuzzleCube24Regular',
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
  {
    id: 'moon-5',
    name: 'Moon Building 5',
    description: 'Moon Building 5 description',
    power: 5,
    icon: 'DewPoint',
    unlocked: true,
    index: null,
    prerequisites: [
      0,
      [],
      0,
    ],
  }
];
