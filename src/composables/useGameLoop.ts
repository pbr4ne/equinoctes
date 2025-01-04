import { useStore } from './useStore';
import { emitter } from '../utilities/emitter';

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
    }

    store.factions['sun'].grid.forEach(buildingId => {
      const building = store.factions['sun'].buildings.find(building => building.id === buildingId);
      if (building) {
        const powerIncrease = building.power * (delta / 1000);
        store.factions['sun'].power += powerIncrease;
        emitter.emit('powerChanged', { faction: 'sun', power: store.factions['sun'].power });
      }
    });

    store.factions['moon'].grid.forEach(buildingId => {
      const building = store.factions['moon'].buildings.find(building => building.id === buildingId);
      if (building) {
        const powerIncrease = building.power * (delta / 1000);
        store.factions['moon'].power += powerIncrease;
        emitter.emit('powerChanged', { faction: 'moon', power: store.factions['moon'].power });
      }
    });

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}
