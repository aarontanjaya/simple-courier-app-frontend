import { createSlice } from '@reduxjs/toolkit';
import { UserClaims } from '../../interfaces/user';
import { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: UserClaims | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user } }: PayloadAction<{ user: UserClaims }>
    ) => {
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout} = slice.actions;

export default slice.reducer;
