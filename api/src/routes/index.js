const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require("./countryRouter");
const activityRouter = require("./activityRouter");

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use("/countries", countryRouter);
mainRouter.use("/activities", activityRouter);

module.exports = mainRouter;
