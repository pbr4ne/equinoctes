import { useStore } from './useStore';

export function computeMilestones() {
    const store = useStore();
    const { factions } = store;
    const sunFaction = factions['sun'];
    const moonFaction = factions['moon'];
  
    if (sunFaction.power > 0 && !store.milestones.sunUnlocked) {
      store.milestones.sunUnlocked = true;
      sunFaction.lore.push({
        description: `The sun faction has been unlocked!`,
        time: store.calendar,
      });
    }
  
    if (moonFaction.power > 0 && !store.milestones.moonUnlocked) {
      store.milestones.moonUnlocked = true;
      moonFaction.lore.push({
        description: `The moon faction has been unlocked!`,
        time: store.calendar,
      });
    }
  
    //sun power
    if (sunFaction.power > 100 && !store.milestones.aurum100) {
      store.milestones.aurum100 = true;
      sunFaction.lore.push({
        description: `The sun faction has reached 100 power!`,
        time: store.calendar,
      });
      sunFaction.level = 3;
    }
  
    //sun power
    if (sunFaction.power > 200 && !store.milestones.aurum200) {
      store.milestones.aurum200 = true;
      sunFaction.lore.push({
        description: `The sun faction has reached 200 power!`,
        time: store.calendar,
      });
      sunFaction.level = 4;
    }

    //sun power
    if (sunFaction.power > 300 && !store.milestones.aurum300) {
        store.milestones.aurum200 = true;
        sunFaction.lore.push({
          description: `The sun faction has reached 300 power!`,
          time: store.calendar,
        });
        sunFaction.level = 5;
      }
  
    //moon power
    if (moonFaction.power > 100 && !store.milestones.nocturne100) {
      store.milestones.nocturne100 = true;
      moonFaction.lore.push({
        description: `The moon faction has reached 100 power!`,
        time: store.calendar,
      });
      moonFaction.level = 3;
    }
  
    //moon power
    if (moonFaction.power > 200 && !store.milestones.nocturne200) {
      store.milestones.nocturne200 = true;
      moonFaction.lore.push({
        description: `The moon faction has reached 200 power!`,
        time: store.calendar,
      });
      moonFaction.level = 4;
    }

    //moon power
    if (moonFaction.power > 200 && !store.milestones.nocturne300) {
        store.milestones.nocturne300 = true;
        moonFaction.lore.push({
          description: `The moon faction has reached 300 power!`,
          time: store.calendar,
        });
        moonFaction.level = 5;
      }
  }