import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import listReducer from "./reducers/listReducer";
import notificationReducer from "./reducers/notificationReducer";
import langReducer from './reducers/langReducer';

const rootReducer = combineReducers({
    list: listReducer,
    notification: notificationReducer,
    lang: langReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

export default store;