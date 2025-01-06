import { defineStore } from 'pinia';
import { Building, GameState } from '../utilities/types';
import { sunBuildings, moonBuildings } from './useBuildings';

const initialState = (): GameState => ({
  lore: [],
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  factions: {
    sun: {
      level: 2,
      power: 0,
      grid: ["sun-1", null, null, null],
      buildings: sunBuildings,
      selectedBuilding: null as Building | null,
    },
    moon: {
      level: 5,
      power: 0,
      grid: ["moon-1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      buildings: moonBuildings,
      selectedBuilding: null as Building | null,
    },
  },
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    updateTime(deltaTime: number) {
      //1 day takes 15 mins
      const realWorldMillisecondsPerInGameMinute = 625;
      let inGameMinutesPassed = deltaTime / realWorldMillisecondsPerInGameMinute;
      
      this.calendar.accumulatedTime = (this.calendar.accumulatedTime ?? 0) + inGameMinutesPassed;
      
      while (this.calendar.accumulatedTime >= 1) {
        this.calendar.minutes += 1;
        this.calendar.accumulatedTime -= 1;
      }
       
      if (this.calendar.minutes >= 60) {
        this.calendar.hours += Math.floor(this.calendar.minutes / 60);
        this.calendar.minutes = this.calendar.minutes % 60;
      }
       
      if (this.calendar.hours >= 24) {
        this.calendar.days += Math.floor(this.calendar.hours / 24);
        this.calendar.hours = this.calendar.hours % 24;
      }
    },

    listenForEvents() {
    },

    reset() {
      Object.assign(this.$state, initialState());
      localStorage.removeItem(this.$id);
    },
  },
});
