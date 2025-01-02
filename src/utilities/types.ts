import { DefineComponent } from "vue";

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
    icon: DefineComponent;
    unlocked: boolean;
    prerequisites: [
        power: number,
        buildings: string[],
        level: number,
    ]
}

export interface Faction {
    level: number;
    grid: Building[][];
}

export interface GameState {
    lore: LoreEntry[];
    calendar: Calendar;
    buildings: Building[];
    factions: {
        sun: Faction,
        moon: Faction,
    },
}
