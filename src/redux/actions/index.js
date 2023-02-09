import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_CONTINENT,
  GET_ACTIVITIES,
} from "./constants";
import axios from "axios";
const { REACT_APP_URL } = process.env;

const getAllCountries = () => {
  return async function (dispatch) {
    const allCountries = await axios.get(`${REACT_APP_URL}/countries/`);

    dispatch({ type: GET_ALL_COUNTRIES, payload: allCountries.data });
  };
};

const getCountryById = (id) => {
  return async function (dispatch) {
    const country = await axios.get(`${REACT_APP_URL}/countries/${id}`);

    dispatch({ type: GET_COUNTRY_BY_ID, payload: country.data });
  };
};

const getCountriesByName = (name) => {
  return async function (dispatch) {
    const countries = await axios.get(
      `${REACT_APP_URL}/countries?name=${name}`
    );

    dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countries.data });
  };
};

// const filteredByJoan = (continent) => (dispatch) => {
//   dispatch({ type: JOAN_FILTER_COUNTRIES, payload: { continent: continent } });
// };

const getFilteredByContinent = (continent, countries) => {
  return function (dispatch) {
    let countriesFiltered = [];
    if (continent === "All continents") {
      //POR ESTO SE ME ROMPE LA BUSQUEDA POR NOMBRE EN LA NAV,
      //POR QUE CUANDO VUELVO A ALL CONTINENT ME CAMBIA DE ARRAY.
      //Y ME USA LA DE COUNTRIESFILTERED
      countriesFiltered = countries;
    } else {
      countriesFiltered = countries.filter(
        (country) => country.continent === continent
      );
    }

    dispatch({ type: GET_COUNTRIES_BY_CONTINENT, payload: countriesFiltered });
  };
};

const getActivities = () => async (dispatch) => {
  const activities = await axios.get(`${REACT_APP_URL}/activities`);

  dispatch({ type: GET_ACTIVITIES, payload: activities.data });
};

const submitForm = async (formData) => {
  const aux = await axios({
    method: "post",
    url: `${REACT_APP_URL}/activities/`,
    data: formData,
  });

  console.log(aux.data);
  return aux.data;
};

const deleteActivityById = async (id, countryId) => {
  const aux = await axios.delete(`${REACT_APP_URL}/activities/${id}`, {
    data: { countryId },
  });

  return aux.data;
};

export {
  getAllCountries,
  getCountryById,
  getCountriesByName,
  getFilteredByContinent,
  submitForm,
  getActivities,
  deleteActivityById,
};
