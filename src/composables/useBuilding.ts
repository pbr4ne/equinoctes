import { useStore } from './useStore';
import { Faction, Building, FactionKey } from '../utilities/types';

export const useBuilding = () => {

  const computeBuildingPower = (
    faction: Faction,
    building: Building,
    index: number
  ) => {
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

    return totalPower;
  }

  function getXY(index: number, cols: number) {
    const x = index % cols;
    const y = Math.floor(index / cols);
    return { x, y };
  }

  return { computeBuildingPower }
}