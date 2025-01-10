import { useStore } from './useStore';
import { FactionKey } from '../utilities/types';

export function computeMilestones() {
  const store = useStore();
  const { factions, milestones } = store;

  const milestoneLevels = [
    { power: 10000, levelKey: 'level4', level: 4 },
    { power: 100000, levelKey: 'level5', level: 5 },
  ];

  const factionsToCheck: { factionKey: FactionKey; milestonesKey: FactionKey }[] = [
    { factionKey: 'sun', milestonesKey: 'sun' },
    { factionKey: 'moon', milestonesKey: 'moon' },
  ];

  factionsToCheck.forEach(({ factionKey, milestonesKey }) => {
    const faction = factions[factionKey];
    const factionMilestones = milestones[milestonesKey];

    if (faction.power > 0 && !factionMilestones.unlocked) {
      factionMilestones.unlocked = true;
      faction.lore.push({
        description: `The ${factionKey} faction has been unlocked!`,
        time: store.calendar,
      });
    }

    milestoneLevels.forEach(({ power, levelKey, level }) => {
      if (faction.power > power && !factionMilestones[levelKey]) {
        factionMilestones[levelKey] = true;
        faction.lore.push({
          description: `The ${factionKey} faction has reached ${power} power!`,
          time: store.calendar,
        });        
        
        //size up the grid:
        
        //add a new null cell to the end of each row
        for (let row = faction.level; row > 0; row--) {
          const index = row * faction.level;
          faction.grid.splice(index, 0, null);
        }
      
        //add a blank new row
        for (let i = 0; i < level; i++) {
          faction.grid.push(null);
        }

        faction.level = level;
      }
    });
  });
}
