import { useBuildings } from './useBuildings';
import { useStore } from './useStore';
import { emitter } from '../utilities/emitter';
import { FactionKey } from '../utilities/types';

export function startGameLoop() {
  const store = useStore();

  const TICK_RATE = 50;
  let lastTick = Date.now();

  const gameLoop = () => {
    const now = Date.now();
    const delta = now - lastTick;

    if (delta >= TICK_RATE) {
      lastTick = now;
      store.updateTime(delta);

      computeFactionBuildings('sun', delta);
      computeFactionBuildings('moon', delta);
    }

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

function computeFactionBuildings(factionKey: FactionKey, delta: number) {
  const store = useStore();
  const { computeBuildingPower } = useBuildings();
  const { factions } = store;

  const faction = factions[factionKey];
  faction.grid.forEach((buildingId, index) => {
    const building = faction.buildings.find((b) => b.id === buildingId);
    if (!building) return;

    const powerIncrease = computeBuildingPower(
      factionKey,
      building,
    );

    const powerGain = powerIncrease * (delta / 1440);
    faction.power += powerGain;
    
    if (faction.power > 100) {      
      if (factionKey === 'sun' && !store.milestones.aurum100) {
        store.milestones.aurum100 = true;
        faction.lore.push({
          description: `The sun faction has reached 100 power!`,
          time: store.calendar,
        });
      } else if (factionKey === 'moon' && !store.milestones.nocturne100) {
        store.milestones.nocturne100 = true;
        faction.lore.push({
          description: `The moon faction has reached 100 power!`,
          time: store.calendar,
        });
      }
    }

    emitter.emit('powerChanged', { faction: factionKey, power: faction.power });
  });
}
