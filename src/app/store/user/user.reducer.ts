import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/types';
import { loginUser, logoutUser, updateUser } from './user.actions';

export type UserState = Partial<User>;

const initialState: UserState = {};

export const tagsReducer = createReducer(
  initialState,
  on(loginUser, (_, { user }) => {
    return { ...user };
  }),
  on(logoutUser, (_) => {
    return {};
  }),
  on(updateUser, (_, { user }) => {
    return { ...user };
  })
);
