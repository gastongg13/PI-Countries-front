const {
  getAllCountries,
  getCountriesByName,
  getCountriesById,
} = require("../controllers/countryController");

const getCountryHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const country = await getCountriesByName(name);
      if (country.length) {
        return res.status(200).send(country);
      }
      throw new Error("Pais Inexistente");
    } else {
      const countries = await getAllCountries();
      res.status(200).send(countries);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getCountryByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const countryById = await getCountriesById(id);
    res.status(200).send(countryById);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getCountryHandler, getCountryByIdHandler };
