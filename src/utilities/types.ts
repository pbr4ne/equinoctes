export type faction = 'sun' | 'moon';

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
    faction: faction;
    unlocked: boolean;
    prerequisites: [
        power: number,
        buildings: string[],
        level: number,
    ]
}

export interface GameState {
    lore: LoreEntry[];
    calendar: Calendar;
    buildings: Building[];
    sunGrid: Building[][];
    moonGrid: Building[][];
    sunLevel: number;
    moonLevel: number;
}
