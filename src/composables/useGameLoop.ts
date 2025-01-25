import { useBuildings } from './useBuildings';
import { useMilestones } from './useMilestones';
import { useStore } from './useStore';
import { emitter } from '../utilities/emitter';
import { FactionKey } from '../utilities/types';

export function startGameLoop() {
  const store = useStore();
  const milestones = useMilestones();
  store.initializeSpeedMultiplier();

  const TICK_RATE = 50;
  let lastTick = performance.now();

  const gameLoop = () => {
    const now = performance.now();
    const delta = now - lastTick;

    if (delta >= TICK_RATE) {
      lastTick = now;
      store.updateTime(delta);

      //compute power for each built building
      computeFactionBuildings('sun', delta);
      computeFactionBuildings('moon', delta);

      //unlock buildings
      unlockBuildings('sun');
      unlockBuildings('moon');

      //milestones
      milestones.computeMilestones();
    }

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

function unlockBuildings(factionKey: FactionKey) {
  const store = useStore();
  const { sunBuildings, moonBuildings } = useBuildings();
  const faction = store.factions[factionKey];
  const factionBuildings = factionKey === 'sun' ? sunBuildings : moonBuildings;

  factionBuildings.filter((b) => !b.viewUnlocked).forEach((building) => {
    const powerPrerequisiteMet = !building.viewPrerequisite?.power || faction.power >= building.viewPrerequisite.power;

    const buildingsPrerequisite = building.viewPrerequisite?.buildings;
    const buildingsPrerequisiteMet = !buildingsPrerequisite || buildingsPrerequisite.every((requiredBuildingId) => {
      return faction.grid.includes(requiredBuildingId);
    });

    const canUnlock = powerPrerequisiteMet && buildingsPrerequisiteMet;

    if (canUnlock) {
      const index = faction.buildings.findIndex((b) => b.id === building.id);
      if (index !== -1) {
        
        if (faction.buildings[index].viewUnlocked) return;
        faction.buildings[index] = { ...building, viewUnlocked: true };
        
        faction.unseenBuildings = true;
      }
    }
  });
}

export function computeFactionBuildings(factionKey: FactionKey, delta: number) {
  const store = useStore();
  const { computeBuildingPower } = useBuildings();
  const { factions, speedMultiplier, currentlyDay } = store;

  //disable during off-time
  if (factionKey === 'sun' && !currentlyDay && !store.milestones.sun.offTimeProgress) {
    return;
  } else if (factionKey === 'moon' && currentlyDay && !store.milestones.moon.offTimeProgress) {
    return;
  }

  const faction = factions[factionKey];
  faction.grid.forEach((buildingId, index) => {
    const building = faction.buildings.find((b) => b.id === buildingId);
    if (!building) return;

    const powerIncrease = computeBuildingPower(factionKey, building);

    let boost = 1;
    
    if (faction.boost) {  
      if (faction.boost.building === building.id && faction.boost.start) {
        if (new Date().getTime() - faction.boost.start < 5000) {
          boost = 2;
        }  else {
          faction.boost = undefined;
        }       
      }
    }

    const powerGain = powerIncrease * (delta / 1000) * speedMultiplier * boost;
    faction.power += powerGain;    

    emitter.emit('powerChanged', { faction: factionKey, power: faction.power });
  });
}
