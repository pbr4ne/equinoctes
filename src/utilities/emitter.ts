import mitt from 'mitt';
import { FactionKey } from './types';

type GameEvent = {
  autosaved: { timestamp: Date; storeId: string };
  switch: { faction: string };
  powerChanged: { faction: string; power: number };
  buildingEnter: { faction: FactionKey; buildingId: string };
  buildingLeave: {  faction: FactionKey; };
};

export const emitter = mitt<GameEvent>();
