import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
    countryReducer: {
        countries: []
      },
};
const store = createStore(rootReducer, initialState);

export default store;