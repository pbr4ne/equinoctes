import { useBuildings } from './useBuildings';
import { computeMilestones } from './useMilestones';
import { useStore } from './useStore';
import { emitter } from '../utilities/emitter';
import { FactionKey } from '../utilities/types';

export function startGameLoop() {
  const store = useStore();
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
      computeMilestones();
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
    let canUnlock = !building.viewPrerequisite?.power || faction.power >= building.viewPrerequisite.power;

    if (canUnlock) {
      const index = faction.buildings.findIndex((b) => b.id === building.id);
      if (index !== -1) {
        faction.buildings[index] = { ...building, viewUnlocked: true };
      }
    }
  });
}

export function computeFactionBuildings(factionKey: FactionKey, delta: number) {
  const store = useStore();
  const { computeBuildingPower } = useBuildings();
  const { factions, speedMultiplier, currentlyDay } = store;

  //disable during off-time
  if (factionKey === 'sun' && !currentlyDay) {
    return;
  } else if (factionKey === 'moon' && currentlyDay) {
    return;
  }

  const faction = factions[factionKey];
  faction.grid.forEach((buildingId, index) => {
    const building = faction.buildings.find((b) => b.id === buildingId);
    if (!building) return;

    const powerIncrease = computeBuildingPower(factionKey, building);

    const powerGain = powerIncrease * (delta / 1000) * speedMultiplier;
    faction.power += powerGain;    

    emitter.emit('powerChanged', { faction: factionKey, power: faction.power });
  });
}
