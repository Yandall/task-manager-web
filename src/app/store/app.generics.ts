import { Entity } from '../shared/types';
import { AppState } from './app.reducer';

type _stateTypes<
  T = AppState,
  _keys extends keyof T = Extract<keyof T, string>
> = { [k in _keys]: T[k] }[_keys];

export function genericAdd<T extends _stateTypes, R extends Entity>(
  state: T,
  item: R
): T {
  const stateList = state.list as ReadonlyArray<Entity>;
  if (stateList.find((i) => i.id === item.id)) return state;
  const list = [...stateList, item];
  return { ...state, list };
}

export function genericUpdate<T extends _stateTypes, R extends Entity>(
  state: T,
  item: R
): T {
  const list = state.list.map((i) => {
    if (i.id !== item.id) return i;
    return item;
  });
  return { ...state, list };
}

export function genericRemove<T extends _stateTypes>(
  state: T,
  itemId: string
): T {
  const stateList = state.list as ReadonlyArray<Entity>;
  const list = stateList.filter((i) => i.id !== itemId);
  return { ...state, list };
}
