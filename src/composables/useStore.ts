import { defineStore } from 'pinia';
import { GameState } from '../utilities/types';

const initialState = (): GameState => ({
  lore: [],
  calendar: { days: 0, hours: 0, minutes: 0, accumulatedTime: 0 },
  buildings: {
    sun: [
      {
        id: 'sun-1',
        name: 'Sun Building 1',
        description: 'Sun Building 1 description',
        faction: 'sun',
        icon: 'SunnyOutline',
        unlocked: true,
        prerequisites: [
          0,
          [],
          0,
        ],
      },
      {
        id: 'sun-2',
        name: 'Sun Building 2',
        description: 'Sun Building 2 description',
        faction: 'sun',
        icon: 'CloudOutline',
        unlocked: false,
        prerequisites: [
          0,
          [],
          0,
        ],
      },        
    ],
    moon: [
      {
        id: 'moon-1',
        name: 'Moon Building 1',
        description: 'Moon Building 1 description',
        faction: 'moon',
        icon: 'MoonOutline',
        unlocked: false,
        prerequisites: [
          0,
          [],
          0,
        ],
      },
      {
        id: 'moon-2',
        name: 'Moon Building 2',
        description: 'Moon Building 2 description',
        faction: 'moon',
        icon: 'StarOutline',
        unlocked: false,
        prerequisites: [
          0,
          [],
          0,
        ],
      },
    ],
},
  factions: {
    sun: {
      level: 2,
      grid: ["sun-1", null, null, "sun-2"],
    },
    moon: {
      level: 5,
      grid: ["moon-1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "moon-2", null],
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
