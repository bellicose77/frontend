import { authReducer } from "./authReducer";
import { createStore } from 'redux';

export const store = createStore(authReducer);
