import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/types';

export const loginUser = createAction(
  '[User State] Login User',
  props<{ user: User }>()
);

export const logoutUser = createAction('[User State] Logout User');

export const updateUser = createAction(
  '[User State] Update User',
  props<{ user: User }>()
);
