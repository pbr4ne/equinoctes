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

export interface GameState {
    lore: LoreEntry[];
    calendar: Calendar;
}
  