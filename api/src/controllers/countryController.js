const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const normalize = require("../helpers");

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.cca3,
      name: normalize(elem.translations.spa.common),
      flag: elem.flags[1],
      continent: elem.continents[0],
      capital: elem.capital && elem.capital[0],
      subregion: elem.subregion,
      area: elem.area,
      population: elem.population,
    };
  });

const getAllCountries = async () => {
  const dataBaseCountries = await Country.findAll();
  if (dataBaseCountries.length === 0) {
    const response = await axios.get("https://restcountries.com/v3/all");

    const countries = cleanArray(response.data);

    await Country.bulkCreate(countries);
    const dataBaseCountries = await Country.findAll();
    // console.log("api");
    return dataBaseCountries;
  } else {
    // console.log("base");
    return dataBaseCountries;
  }
};

const getCountriesByName = async (name) => {
  const countryByName = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  return countryByName;
};

const getCountriesById = async (id) => {
  const country = await Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ["id", "name", "difficulty", "duration", "seasons"],
    },
  });

  if (!country) throw new Error("No existe pais asociado a dicho Id");

  return country;
};

module.exports = { getAllCountries, getCountriesByName, getCountriesById };
