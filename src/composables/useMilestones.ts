import { useStore } from './useStore';
import { FactionKey } from '../utilities/types';

function sendMessage(message: string) {
  window.$message.info(message);
}

function newLore(factionKey: FactionKey) {
  factionKey === 'sun' ? sendMessage('New Revelation') : sendMessage('New Mysterium');
}

function newMilestone() {
  sendMessage('New Milestone');
}

function newLoreAndMilestone(factionKey: FactionKey) {
  factionKey === 'sun' ? sendMessage('New Revelation and Milestone') : sendMessage('New Mysterium and Milestone');
}

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

      if (store.factionAchievements[factionKey].met) {
        newLore(factionKey);
      } else {
        newLoreAndMilestone(factionKey);
        store.factionAchievements[factionKey].met = true;
        store.factions[factionKey].unseenAchievements = true;
      }      
    }

    //if 9 buildings in grid
    if (faction.grid.filter((cell) => cell).length >= 9 && !store.factionAchievements[factionKey].level3Buildings) {
      store.factionAchievements[factionKey].level3Buildings = true;
      store.factions[factionKey].unseenAchievements = true;
      newLoreAndMilestone(factionKey);
    }

    //if 16 buildings in grid
    if (faction.grid.filter((cell) => cell).length >= 16 && !store.factionAchievements[factionKey].level4Buildings) {
      store.factionAchievements[factionKey].level4Buildings = true;
      store.factions[factionKey].unseenAchievements = true;
      newMilestone();
    }

    //if 25 buildings in grid
    if (faction.grid.filter((cell) => cell).length >= 25 && !store.factionAchievements[factionKey].level5Buildings) {
      store.factionAchievements[factionKey].level5Buildings = true;
      store.factions[factionKey].unseenAchievements = true;
      newMilestone();
    }

    //if offtime building built
    if (faction.grid.some((cell) => cell === `${factionKey}-other-1`) && !factionMilestones.offTimeBuilding) {
      faction.lore.push({
        description: `Can now build during off-time`,
        time: store.calendar,
      });
      factionMilestones.offTimeBuilding = true;
      newLoreAndMilestone(factionKey);
    }

    //if offtime progress built
    if (faction.grid.some((cell) => cell === `${factionKey}-other-1`) && !factionMilestones.offTimeProgress) {
      faction.lore.push({
        description: `Can now progress during off-time`,
        time: store.calendar,
      });
      factionMilestones.offTimeProgress = true;
      newLoreAndMilestone(factionKey);
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
        newLoreAndMilestone(factionKey);
      }
    });
  });
}
