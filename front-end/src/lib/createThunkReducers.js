export const createThunkReducers = (initialState, thunk) => {
    return {
      [thunk.pending.type]: (state, action) => {
          state = initialState;
      },
      [thunk.fulfilled.type]: (state, action) => {
          state.data = action.payload;
      },
      [thunk.rejected.type]: (state, action) => {
          state.error = action.error;
      },
    }
  }