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
  read?: boolean;
}

export interface AdjacencyOffset {
  dx: number;
  dy: number;
  modifier: number;
}

export interface BuildingPrerequisite {
  power?: number;
  buildings?: string[];
  level?: number;
}

export interface BuildingMetadata {
  id: string;
  name: string;
  description: string;
  icon: DefineComponent;
}

export interface Building {
  id: string;
  power: number;
  unlocked: boolean;
  index: number | null;
  viewPrerequisite: BuildingPrerequisite,
  buildPrerequisite: BuildingPrerequisite,
  viewUnlocked?: boolean;
  buildUnlocked?: boolean;
  adjacency?: AdjacencyOffset[];
}

export interface Milestones {
  unlocked: boolean;
  level4: boolean;
  level5: boolean;
  level6: boolean;
}

export interface Faction {
  level: number;
  power: number;
  grid: (string | null)[];
  buildings: Building[];
  selectedBuilding: Building | null;
  lore: LoreEntry[];
}

export interface GameState {
  calendar: Calendar;
  factions: {
      sun: Faction,
      moon: Faction,
  },
  milestones: {
    sun: Milestones,
    moon: Milestones,
  }
  fullDaySeconds: number,
  currentlyDay: boolean,
  speedMultiplier: number,
}
