import { SunnyOutline, CloudOutline, MoonOutline, StarOutline } from '@vicons/ionicons5';

export type IconComponent = typeof SunnyOutline;

export const iconMap: Record<string, IconComponent> = {
  SunnyOutline,
  CloudOutline,
  MoonOutline,
  StarOutline,
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
    faction: FactionKey;
    icon: string;
    unlocked: boolean;
    prerequisites: [
        power: number,
        buildings: string[],
        level: number,
    ]
}

export interface Faction {
    level: number;
    grid: (string | null)[];
}

export interface GameState {
    lore: LoreEntry[];
    calendar: Calendar;
    selectedBuilding: Building | null,
    buildings: {
        sun: Building[],
        moon: Building[],
    };
    factions: {
        sun: Faction,
        moon: Faction,
    },
}
