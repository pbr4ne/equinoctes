import { BuildingMetadata } from '../utilities/types';
import { 
  SunnyOutline, 
  CloudOutline, 
  MoonOutline, 
  StarOutline 
} from '@vicons/ionicons5';

import { 
  Aperture,
  Api,
  DewPoint,
} from '@vicons/carbon';

import {
  ArchitectureOutlined,
} from '@vicons/material';

import {
  Question24Filled,
  Bed24Regular,
  PuzzleCube24Regular,
} from '@vicons/fluent';
import { DefineComponent } from 'vue';

export const sunBuildingMetadata: BuildingMetadata[] = [
    {
      id: 'sun-1',
      name: 'Sun Building 1',
      description: 'Sun Building 1 description',
      icon: SunnyOutline as DefineComponent,
    },
    {
      id: 'sun-2',
      name: 'Sun Building 2',
      description: 'Sun Building 2 description',
      icon: CloudOutline as DefineComponent,
    },
    {
      id: 'sun-3',
      name: 'Sun Building 3',
      description: 'Sun Building 3 description',
      icon: Aperture as DefineComponent,
    },
    {
      id: 'sun-4',
      name: 'Sun Building 4',
      description: 'Sun Building 4 description',
      icon: Api as DefineComponent,
    },
    {
      id: 'sun-5',
      name: 'Sun Building 5',
      description: 'Sun Building 5 description',
      icon: ArchitectureOutlined as DefineComponent,
    }
  ];

  export const moonBuildingMetadata: BuildingMetadata[] = [
    {
      id: 'moon-1',
      name: 'Moon Building 1',
      description: 'Moon Building 1 description',
      icon: MoonOutline as DefineComponent,
    },
    {
      id: 'moon-2',
      name: 'Moon Building 2',
      description: 'Moon Building 2 description',
      icon: StarOutline as DefineComponent,
    },
    {
      id: 'moon-3',
      name: 'Moon Building 3',
      description: 'Moon Building 3 description',
      icon: Bed24Regular as DefineComponent,
    },
    {
      id: 'moon-4',
      name: 'Moon Building 4',
      description: 'Moon Building 4 description',
      icon: PuzzleCube24Regular as DefineComponent,
    },
    {
      id: 'moon-5',
      name: 'Moon Building 5',
      description: 'Moon Building 5 description',
      icon: DewPoint as DefineComponent,
    }
  ];
  