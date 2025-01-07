import mitt from 'mitt';
import { FactionKey } from './types';

type GameEvent = {
  autosaved: { timestamp: Date; storeId: string };
  switchedToGrid: { faction: string };
  powerChanged: { faction: string; power: number };
  buildingEntered: { faction: FactionKey; buildingId: string };
  buildingLeft: {  faction: FactionKey; };
};

export const emitter = mitt<GameEvent>();
