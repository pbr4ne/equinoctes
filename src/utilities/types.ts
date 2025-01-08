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
  sunUnlocked: boolean;
  moonUnlocked: boolean;
  aurum100: boolean;
  aurum200: boolean;
  aurum300: boolean;
  nocturne100: boolean;
  nocturne200: boolean;
  nocturne300: boolean;
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
  milestones: Milestones,
  fullDaySeconds: number,
  currentlyDay: boolean,
  speedMultiplier: number,
}
