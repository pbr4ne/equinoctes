import mitt from 'mitt';

type GameEvent = {
  autosaved: { timestamp: Date; storeId: string };
};

export const emitter = mitt<GameEvent>();
