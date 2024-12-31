import { useStore } from './useStore';

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

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}
