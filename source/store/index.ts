import { compose, createStore } from 'redux';
import { rootReducer } from './reducers/RootReducer';

export { IStore } from './reducers/RootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const AppStore = createStore(rootReducer, composeEnhancers());
