import { combineReducers } from 'redux';

const searchReducer = (state = { searchTerm: '', searchRegion: '' }, action) => {
    switch (action.type) {
      case 'SET_SEARCH_TERM':
        return { ...state, searchTerm: action.payload };
      case 'SET_SEARCH_REGION':
        return { ...state, searchRegion: action.payload };
      default:
        return state;
    }
};

const countryReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_COUNTRY':
        return action.payload;
      default:
        return state;
    }
};

const rootReducer = combineReducers({
    search: searchReducer,
    countryReducer,
});

export default rootReducer;