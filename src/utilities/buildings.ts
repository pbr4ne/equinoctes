import { Building } from '../utilities/types';

export const sunBuildings: Building[] = [
  {
    id: 'sun-1',
    name: 'Sun Building 1',
    description: 'Sun Building 1 description',
    icon: 'SunnyOutline',
    power: 1,
    unlocked: true,
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
    prerequisites: [
      0,
      [],
      0,
    ],
  }
];
