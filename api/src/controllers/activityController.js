const { Activity, Country } = require("../db");

const createActivity = async (
  name,
  difficulty,
  duration,
  seasons,
  countries
) => {
  if (!name || !difficulty || !duration || !seasons || !countries) {
    throw new Error("Missing data");
  }

  const oldActivity = await Activity.findOne({ where: { name: name } });
  if (!oldActivity) {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      seasons,
    });

    const country = await Country.findAll({ where: { id: countries } });

    if (!country) {
      throw new Error("Country has not been found");
    }
    await newActivity.addCountry(country);

    return "Activity created and country added";
  } else {
    const country = await Country.findAll({ where: { id: countries } });
    if (!country) {
      throw new Error("Country has not been found");
    }

    await oldActivity.addCountry(country);

    return "Activity has been assigned to country";
  }
};

const getActivities = async (name) => {
  if (name) {
    const activity = await Activity.findAll({
      where: {
        name,
      },
      include: {
        model: Country,
      },
    });
    return activity;
  }

  const activity = await Activity.findAll({
    include: {
      model: Country,
    },
  });
  return activity;
};

const deleteActivity = async (id, idCountry) => {
  const deleteActById = await Activity.findOne({
    where: { id },
  });

  deleteActById.removeCountry(idCountry);

  return "Actividad eliminada";
};

module.exports = { createActivity, getActivities, deleteActivity };
