import { defineStore } from 'pinia';
import { Building, GameState } from '../utilities/types';
import { useBuildings } from './useBuildings';

const initialState = (): GameState => ({
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  factions: {
    sun: {
      level: 3,
      power: 0,
      grid: [null, null, null, null, "sun-religion-1", null, null, null, null],
      buildings: useBuildings().sunBuildings,
      selectedBuilding: null as Building | null,
      lore: [],
      unseenBuildings: false,
    },
    moon: {
      level: 3,
      power: 0,
      grid: [null, null, null, null, "moon-religion-1", null, null, null, null],
      buildings: useBuildings().moonBuildings,
      selectedBuilding: null as Building | null,
      lore: [],
      unseenBuildings: false,
    },
  },
  milestones: {
    sun: {
      unlocked: false,
      level4: false,
      level5: false,
    },
    moon: {
      unlocked: false,
      level4: false,
      level5: false,
    },
  },
  fullDaySeconds: 30,
  currentlyDay: true,
  speedMultiplier: 1,
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    initializeSpeedMultiplier() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      if (urlSearchParams.get('SPEED')) {
        const parsedMultiplier = parseFloat(urlSearchParams.get('SPEED')!);
        if (!isNaN(parsedMultiplier) && parsedMultiplier > 0) {
          this.speedMultiplier = parsedMultiplier;
        } else {
          console.warn(`Invalid SPEED parameter: ${urlSearchParams.get('SPEED')}. Using default multiplier of 1.`);
        }
      }
    },

    updateTime(deltaTime: number) {
      const multiplier = this.speedMultiplier;

      // 1 day takes `fullDaySeconds` real-world seconds
      const inGameMinutesPassed = deltaTime * (1440 / (this.fullDaySeconds * 1000)) * multiplier;

      this.calendar.accumulatedTime = (this.calendar.accumulatedTime ?? 0) + inGameMinutesPassed;
      
      while (this.calendar.accumulatedTime >= 1) {
        this.calendar.minutes += 1;
        this.calendar.accumulatedTime -= 1;
      }
      if (this.calendar.minutes >= 60) {
        this.calendar.hours += Math.floor(this.calendar.minutes / 60);
        this.calendar.minutes %= 60;
      }
      if (this.calendar.hours >= 24) {
        this.calendar.days += Math.floor(this.calendar.hours / 24);
        this.calendar.hours %= 24;
      }

      this.currentlyDay = this.calendar.hours >= 0 && this.calendar.hours < 12;
    },

    listenForEvents() {
    },

    reset() {
      Object.assign(this.$state, initialState());
      localStorage.removeItem(this.$id);
    },
  },
});
