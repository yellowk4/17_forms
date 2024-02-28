import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
};

// authSlice 추가
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer; // 전체 슬라이스를 export 하지 않고, 리듀서만 export 합니다.
