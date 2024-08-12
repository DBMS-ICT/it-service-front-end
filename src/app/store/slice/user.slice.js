import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
