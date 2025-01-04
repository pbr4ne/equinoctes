import mitt from 'mitt';
import { FactionKey } from './types';

type GameEvent = {
  autosaved: { timestamp: Date; storeId: string };
  switch: { faction: string };
  powerChanged: { faction: string; power: number };
};

export const emitter = mitt<GameEvent>();
