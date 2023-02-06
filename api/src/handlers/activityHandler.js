const {
  createActivity,
  getActivities,
  deleteActivity,
} = require("../controllers/activityController");

const createActivityHandler = async (req, res) => {
  const { name, difficulty, duration, seasons, countries } = req.body;
  try {
    const message = await createActivity(
      name,
      difficulty,
      duration,
      seasons,
      countries
    );
    //Actividad creada - NO ERRORES
    // Country already has the activity - NO ERRORES
    res.status(200).send(message);
  } catch (error) {
    //Ese pais ya contiene la actividad - ERROR
    res.status(400).send({ error: error.message });
  }
};

const getActivityHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const activity = await getActivities(name);

    res.status(200).send(activity);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteActivityHandler = async (req, res) => {
  const { id } = req.params;
  const { countryId } = req.body;
  try {
    console.log(countryId);
    const deletedActivity = await deleteActivity(id, countryId);

    return res.status(200).send(deletedActivity);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  createActivityHandler,
  getActivityHandler,
  deleteActivityHandler,
};
