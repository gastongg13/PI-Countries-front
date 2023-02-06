import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { getCountriesByName } from "../../redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(getCountriesByName(search));
  }, [dispatch, search]);

  return (
    <div className={style.NavBarStyle}>
      <Link className={style.link} to="/home">
        HOME
      </Link>
      <Link className={style.link} to="/form">
        CREATE ACTIVITY
      </Link>

      <input
        type="text"
        value={search}
        onChange={(e) => changeHandler(e)}
        placeholder="Search..."
      />
    </div>
  );
};

export default NavBar;
