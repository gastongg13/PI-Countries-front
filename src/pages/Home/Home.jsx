import CardContainer from "../../components/CardsContainer/CardContainer";
import Paging from "../../components/Paging/Paging";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActivities, getFilteredByContinent } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countriesByName) || [];
  const filteredByContinent = useSelector((state) => state.filters) || [];
  const activities = useSelector((state) => state.filteredActivities) || [];
  const [countries, setCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [activitiesStatus, setActivitiesStatus] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setContinentFilter] = useState("");
  const itemsPerPage = 10;
  const continents = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Oceania",
    "Africa",
    "Antarctica",
  ];

  const activityFilter = (activities) => {
    if (activitiesStatus !== "" && activitiesStatus !== "select") {
      const aux = activities.filter(
        (activity) => activity.name === activitiesStatus
      );
      // console.log(aux);
      const final = aux[0].countries?.map((country) => country);
      // console.log(final);
      return final;
    }
    return [];
  };
  const countryActivities = activityFilter(activities);

  const sortingHandler = (ordering, countries) => {
    if (ordering === "ascendent") {
      countries.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (ordering === "descendent") {
      countries.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }

        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }

    if (ordering === "high") {
      countries.sort((a, b) => {
        if (a.population < b.population) {
          return 1;
        }
        if (a.population > b.population) {
          return -1;
        }
        return 0;
      });
    }

    if (ordering === "low") {
      countries.sort((a, b) => {
        if (a.population < b.population) {
          return -1;
        }
        if (a.population > b.population) {
          return 1;
        }
        return 0;
      });
    }

    return countries;
  };

  const prevHandler = () => {
    const nextPage = currentPage - 1;
    const index = nextPage * itemsPerPage;

    if (currentPage <= 1) {
      setCountries([...sortedCountries].splice(0, 9));
      setCurrentPage(0);
      return;
    }

    setCountries([...sortedCountries].splice(index, itemsPerPage));
    setCurrentPage(nextPage);
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    const index = nextPage * itemsPerPage;

    if (countries.length > 8) {
      if (nextPage === 25) return;

      setCountries([...sortedCountries].splice(index, itemsPerPage));
      setCurrentPage(nextPage);

      if ([...sortedCountries].splice(index, itemsPerPage).length < 8) {
        setCurrentPage(nextPage);

        return;
      }
    }
  };
  const continentSelectHandler = (e) => {
    setContinentFilter(e.target.value);
  };
  const activitySelectHandler = (e) => {
    setActivitiesStatus(e.target.value);
  };

  const sortSelectHandler = (e) => {
    setSort(e.target.value);
  };
  //el problema que me generaba el async era por que tenia dispatch y el set en el mismo useEffect!
  useEffect(() => {
    dispatch(getFilteredByContinent(filterStatus, allCountries));
    dispatch(getActivities());
  }, [dispatch, filterStatus]);

  useEffect(() => {
    if (
      filteredByContinent &&
      filteredByContinent.length &&
      filterStatus !== "All continents"
    ) {
      if (sort) {
        let sortedArray = sortingHandler(sort, [...filteredByContinent]);
        setSortedCountries([...sortedArray]);
        setCountries([...sortedArray.splice(0, 9)]);
        setCurrentPage(0);
      } else {
        setCountries([...filteredByContinent].splice(0, 9));
        setSortedCountries([...filteredByContinent]);
        setCurrentPage(0);
      }
    } else if (countryActivities && countryActivities.length) {
      if (sort) {
        let sortedArray = sortingHandler(sort, [...countryActivities]);
        setSortedCountries([...sortedArray]);
        setCountries([...sortedArray.splice(0, 9)]);
        setCurrentPage(0);
      } else {
        setCountries([...countryActivities].splice(0, 9));
        setSortedCountries([...countryActivities]);
        setCurrentPage(0);
      }
    } else {
      if (sort) {
        let sortedArray = sortingHandler(sort, [...allCountries]);
        setSortedCountries([...sortedArray]);
        setCountries([...sortedArray.splice(0, 9)]);
      } else {
        setCountries([...allCountries].splice(0, 9));
        setSortedCountries([...allCountries]);
      }

      setCurrentPage(0);
    }
  }, [filteredByContinent, allCountries, sort, activitiesStatus]);

  return (
    <div className={style.HomeComponent}>
      <div className={style.FilterModel}>
        <label className={style.label} htmlFor="continents">
          Choose a filter:
        </label>
        <select
          onChange={continentSelectHandler}
          name="continents"
          id="continents"
        >
          <option value="All continents">All continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>

        <select onChange={activitySelectHandler}>
          <option value="select">Select...</option>
          {activities.map((activity) => (
            <option key={activity.name} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>

        <label className={style.label} htmlFor="sort">
          Choose a sorting method:
        </label>
        <select name="sort" id="sort" onChange={sortSelectHandler}>
          <option value="select">Select...</option>
          <option value="ascendent">A-Z</option>
          <option value="descendent">Z-A</option>
        </select>

        <select onChange={sortSelectHandler}>
          <option value="select">None...</option>
          <option value="high">+Population</option>
          <option value="low">-Population</option>
        </select>
      </div>
      <Paging
        prevHandler={prevHandler}
        currentPage={currentPage}
        nextHandler={nextHandler}
      />
      <CardContainer countries={countries} />
    </div>
  );
};

export default Home;
