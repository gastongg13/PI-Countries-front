import { Detail, Form, Landing, Home } from "./pages";
import { Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "./redux/actions";
import style from "./app.module.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountriesByName(""));
  }, [dispatch]);

  return (
    <div className={style.App}>
      {/* para que aparezca la nav bar se tienen que cumplir los 2 */}
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/detail/:id">
        <Detail />
      </Route>

      <Route path="/form">
        <Form></Form>
      </Route>
    </div>
  );
}

export default App;
