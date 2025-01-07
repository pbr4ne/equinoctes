import { defineStore } from 'pinia';
import { Building, GameState } from '../utilities/types';
import { sunBuildings, moonBuildings } from './useBuildings';

const initialState = (): GameState => ({
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  factions: {
    sun: {
      level: 2,
      power: 0,
      grid: ["sun-1", null, null, null],
      buildings: sunBuildings,
      selectedBuilding: null as Building | null,
      lore: [{
        time: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      }, {
        time: { days: 1, hours: 1, minutes: 1, accumulatedTime: 1 },
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      }, {
        time: { days: 2, hours: 2, minutes: 2, accumulatedTime: 2 },
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"
      }],
    },
    moon: {
      level: 5,
      power: 0,
      grid: ["moon-1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      buildings: moonBuildings,
      selectedBuilding: null as Building | null,
      lore: [{
        time: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      }],
    },
  },
  milestones: {
    sunUnlocked: false,
    moonUnlocked: false,
    aurum100: false,
    nocturne100: false,
  },
  fullDaySeconds: 120,
});

export const useStore = defineStore('gameState', {
  state: (): GameState => initialState(),

  actions: {
    _gameLoopId: null as null | number,

    updateTime(deltaTime: number) {
      //1 day takes 2 mins
      const realWorldMillisecondsPerInGameMinute = 1000 * this.fullDaySeconds;
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
