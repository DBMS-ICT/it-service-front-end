import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import LanguageReducer from '../store/slice/language';
import roleReducer from '../store/slice/user.slice';
export default configureStore({
  reducer: {
    setUser: roleReducer,
    language: LanguageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gdmw) => gdmw().concat(api.middleware),
});
