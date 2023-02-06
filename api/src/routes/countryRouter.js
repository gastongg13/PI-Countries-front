const { Router } = require("express");
const {
  getCountryHandler,
  getCountryByIdHandler,
} = require("../handlers/countryHandler");

const countryRouter = Router();

countryRouter.get("/", getCountryHandler);
countryRouter.get("/:id", getCountryByIdHandler);

module.exports = countryRouter;
