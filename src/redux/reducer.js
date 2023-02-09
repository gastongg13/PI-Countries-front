import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_CONTINENT,
  GET_ACTIVITIES,
} from "./actions/constants";

const initialState = {
  countries: [],
  countryById: {},
  countriesByName: [],
  filters: [],
  filteredActivities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, countries: action.payload };
    case GET_COUNTRY_BY_ID:
      return { ...state, countryById: action.payload };
    case GET_COUNTRIES_BY_NAME:
      return { ...state, countriesByName: action.payload };
    case GET_COUNTRIES_BY_CONTINENT:
      return { ...state, filters: action.payload };
    case GET_ACTIVITIES:
      return { ...state, filteredActivities: action.payload };
    // case JOAN_FILTER_COUNTRIES:
    //   const results = state.countries.filter((country) => country.continent === action.payload.continent);
    //   return { ...state, filters: action.payload };
    //se puede hacer logica en el reducer! No es mala practica!
    default:
      return { state };
  }
};

export default rootReducer;
