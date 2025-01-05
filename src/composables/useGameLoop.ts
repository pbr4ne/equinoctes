import { useStore } from './useStore';
import { emitter } from '../utilities/emitter';
import { Faction, Building, FactionKey } from '../utilities/types';

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

    computeFactionBuildings('sun', delta);
    computeFactionBuildings('moon', delta);

    store._gameLoopId = requestAnimationFrame(gameLoop);
  };

  store._gameLoopId = requestAnimationFrame(gameLoop);
}

function computeFactionBuildings(factionKey: FactionKey, delta: number) {
  const store = useStore();
  const { factions } = store;

  const faction = factions[factionKey];
  faction.grid.forEach((buildingId, index) => {
    const building = faction.buildings.find((b) => b.id === buildingId);
    if (!building) return;

    const powerIncrease = computeBuildingPower(
      faction,
      building,
      index,
      delta
    );
    faction.power += powerIncrease;
    
    emitter.emit('powerChanged', { faction: factionKey, power: faction.power });
  });
}

function computeBuildingPower(
  faction: Faction,
  building: Building,
  index: number,
  delta: number
) {
  const { level, grid, buildings } = faction;

  let totalPower = building.power;
  let adjacencySum = 0; 
  
  grid.forEach((neighbourId, neighbourIndex) => {
    
    if (!neighbourId) return;

    const neighborBldg = buildings.find(b => b.id === neighbourId);
    if (!neighborBldg || !neighborBldg.adjacency) return;

    const { x: bx, y: by } = getXY(index, level);
    const { x: nx, y: ny } = getXY(neighbourIndex, level);

    const dx = bx - nx;
    const dy = by - ny;

    const offset = neighborBldg.adjacency.find(o => o.dx === dx && o.dy === dy);
    if (offset) {
      adjacencySum += offset.modifier;
    }
  });

  const finalMultiplier = 1 + adjacencySum;
  totalPower *= finalMultiplier;

  const powerGain = totalPower * (delta / 1000);

  return powerGain;
}

function getXY(index: number, cols: number) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  return { x, y };
}
