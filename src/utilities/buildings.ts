import { Building } from '../utilities/types';

export const sunBuildings: Building[] = [
  {
    id: 'sun-1',
    name: 'Sun Building 1',
    description: 'Sun Building 1 description',
    faction: 'sun',
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
    faction: 'sun',
    icon: 'CloudOutline',
    power: 5,
    unlocked: true,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
];

export const moonBuildings: Building[] = [
  {
    id: 'moon-1',
    name: 'Moon Building 1',
    description: 'Moon Building 1 description',
    faction: 'moon',
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
    faction: 'moon',
    power: 5,
    icon: 'StarOutline',
    unlocked: true,
    prerequisites: [
      0,
      [],
      0,
    ],
  },
];
