import { useStore } from './useStore';
import { FactionKey } from '../utilities/types';

export function computeMilestones() {
  const store = useStore();
  const { factions, milestones } = store;

  const milestoneLevels = [
    { power: 100, levelKey: 'level4', level: 4 },
    { power: 200, levelKey: 'level5', level: 5 },
    { power: 300, levelKey: 'level6', level: 6 },
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
        faction.level = level;
      }
    });
  });
}
