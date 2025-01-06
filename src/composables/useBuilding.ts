import { FactionKey, Building } from '../utilities/types';
import { useStore } from './useStore';

export const useBuilding = () => {

  const computeBuildingPower = (
    factionKey: FactionKey,
    building: Building,
  ) => {
    const store = useStore();
    const { level, grid, buildings } = store.factions[factionKey];
  
    let totalPower = building.power;
    let adjacencySum = 0;
    
    grid.forEach((neighbourId, neighbourIndex) => {
      
      if (!neighbourId) return;
  
      const neighborBldg = buildings.find(b => b.id === neighbourId);
      if (!neighborBldg || !neighborBldg.adjacency) return;
  
      if (building.index === null) return;
      const { x: bx, y: by } = getXY(building.index, level);
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

    return totalPower;
  }

  function getXY(index: number, cols: number) {
    const x = index % cols;
    const y = Math.floor(index / cols);
    return { x, y };
  }

  return { computeBuildingPower }
}