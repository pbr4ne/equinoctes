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
    Bed24Regular,
    PuzzleCube24Regular,
} from '@vicons/fluent';

export type IconComponent = typeof SunnyOutline;

export const iconMap: Record<string, IconComponent> = {
  SunnyOutline,
  CloudOutline,
  MoonOutline,
  StarOutline,
  Aperture,
  Api,
  ArchitectureOutlined,
  Bed24Regular,
  PuzzleCube24Regular,
  DewPoint,
};

export type FactionKey = 'sun' | 'moon';

export interface Calendar {
    days: number;
    hours: number;
    minutes: number;
    accumulatedTime?: number;
}

export interface LoreEntry {
    description: string;
    time: Calendar;
}

export interface Building {
    id: string;
    name: string;
    description: string;
    icon: string;
    power: number;
    unlocked: boolean;
    prerequisites: [
        power: number,
        buildings: string[],
        level: number,
    ]
}

export interface Faction {
    level: number;
    power: number;
    grid: (string | null)[];
    buildings: Building[];
    selectedBuilding: Building | null;
}

export interface GameState {
    lore: LoreEntry[];
    calendar: Calendar;
    factions: {
        sun: Faction,
        moon: Faction,
    },
}
