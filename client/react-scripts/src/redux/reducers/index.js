import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './authReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: [],
};

const rootReducer = combineReducers({
    auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
