import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryById } from "../../redux/actions";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const countryById = useSelector((state) => state.countryById);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  return (
    <div>
      {countryById && (
        <div>
          <div className={style.DetailModel}>
            <h1>{countryById.name}</h1>

            <img
              className={style.FlagModel}
              src={countryById.flag}
              alt="Not Found"
            />

            <h4>Country Code: {countryById.id}</h4>
            <p>Continent: {countryById.continent}</p>
            <p>Capital: {countryById.capital}</p>
            <p>Subregion: {countryById.subregion}</p>
            <p>Area: {countryById.area} km²</p>
            <p>Population: {countryById.population}</p>
          </div>
          <div className={style.DetailActivities}>
            <h3 className={style.h3model}>Activities:</h3>
            <div className={style.ActivityCardContainer}>
              {countryById.activities.map((activity) => (
                <ActivityCard
                  countryId={countryById.id}
                  key={activity.id}
                  id={activity.id}
                  name={activity.name}
                  difficulty={activity.difficulty}
                  duration={activity.duration}
                  seasons={activity.seasons}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
