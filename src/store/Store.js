import { createStore } from 'redux';
import Reducer from '../reducer/reducers.js';
export const Store = createStore(Reducer);