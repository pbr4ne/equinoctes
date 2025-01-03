import mitt from 'mitt';
import { Faction } from './types';

type GameEvent = {
  autosaved: { timestamp: Date; storeId: string };
  switch: { faction: string };
};

export const emitter = mitt<GameEvent>();
