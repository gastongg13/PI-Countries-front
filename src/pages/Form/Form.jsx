import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../redux/actions";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  let country = useSelector((state) => state.countriesByName);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    seasons: "",
    countries: [],
  });
  const [countryId, setCountryId] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const initialFormState = {
    name: "",
    difficulty: "",
    duration: "",
    seasons: "",
    countries: [],
  };

  const validate = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!form.name.trim()) {
      errors.name = "The name field is required";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "Only letters can be used";
    }

    if (form.difficulty.length === 0 || form.difficulty === "Select...") {
      errors.difficulty = "You must choose a difficulty";
    }

    if (form.duration.length === 0 || form.duration === "Hours...") {
      errors.duration = "You must choose a duration";
    }

    if (!form.seasons.trim() || form.seasons === "Select...") {
      errors.seasons = "Choose a season";
    }
    if (form.countries.length === 0) {
      errors.countries = "Add at least '1' country";
    }

    return errors;
  };

  const handlerFilter = (array) => {
    if (array) {
      return array.filter(
        (country) => country.name.toLowerCase() === inputCountry.toLowerCase()
      );
    }
    return [];
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    changeHandler(e);
    setErrors(validate(form));
  };

  const countryHandler = (e) => {
    setInputCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(form));
    if (form.name !== "" && Object.keys(errors).length === 0) {
      submitForm(form).then((message) => alert(message));
      setForm(initialFormState);
    } else {
      alert("Complete the missing data");
      e.preventDefault();
      return;
    }
  };

  const listHandler = (e) => {
    e.preventDefault();
    setErrors(validate(form));
    if (!countryId.length) return;
    if (!form.countries.includes(countryId)) {
      setForm({ ...form, countries: [...form.countries, countryId] });
      setInputCountry("");
    }
  };

  useEffect(() => {
    let filter = handlerFilter(country);
    if (filter.length === 1) {
      setCountryId(filter[0].id);
    } else {
      setCountryId([]);
    }
  }, [dispatch, inputCountry]);

  const handleDelete = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      countries: form.countries.filter((el) => el !== e.target.value),
    });
  };

  const errorClass = (error) => {
    if (error) {
      return style.ErrorSpan;
    }
    return `${style.NotVisible} ${style.ErrorSpan}`;
  };

  return (
    <div className={style.FormImage}>
      <form className={style.FormContainer}>
        <div className={style.FormModel}>
          <label>Activity Name&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            className={style.InputModel}
            value={form.name}
            name="name"
            onChange={changeHandler}
            onBlur={handleBlur}
            required
          ></input>
        </div>
        <div className={errorClass(errors.name)}>{errors.name}</div>

        <div className={style.FormModel}>
          <label>Activity Difficulty&nbsp;&nbsp;&nbsp;</label>
          <select
            name="difficulty"
            onChange={changeHandler}
            onBlur={handleBlur}
            value={form.difficulty}
            className={style.InputModel}
          >
            <option>Select...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div className={errorClass(errors.difficulty)}>{errors.difficulty}</div>

        <div className={style.FormModel}>
          <label>Activity Duration&nbsp;&nbsp;&nbsp;</label>
          <select
            name="duration"
            className={style.InputModel}
            value={form.duration}
            onChange={changeHandler}
            onBlur={handleBlur}
            required
          >
            <option>Hours...</option>
            <option>1 </option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div className={errorClass(errors.duration)}>{errors.duration}</div>

        <div className={style.FormModel}>
          <label>Activity Season&nbsp;&nbsp;&nbsp;</label>
          <select
            className={style.InputModel}
            value={form.seasons}
            onChange={changeHandler}
            onBlur={handleBlur}
            required
            name="seasons"
          >
            <option>Select...</option>
            <option>Autumn</option>
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
          </select>
        </div>

        <div className={errorClass(errors.seasons)}>{errors.seasons}</div>

        <div className={style.FormModel}>
          <label>Country&nbsp;&nbsp;&nbsp;</label>
          <input
            onBlur={handleBlur}
            className={style.InputModel}
            value={inputCountry}
            onChange={countryHandler}
          ></input>
        </div>

        <div className={errorClass(errors.countries)}>{errors.countries}</div>

        <div className={style.CountriesAdded}>
          <label>Added Countries&nbsp;&nbsp;&nbsp;</label>
          {form.countries.map((country) => (
            <button value={country} onClick={handleDelete} key={country}>
              {country}&nbsp;&nbsp;&nbsp;
            </button>
          ))}
        </div>
        <div className={style.ButtonContainer}>
          <button className={style.ButtonFormModel} onClick={listHandler}>
            Add To The List
          </button>
          <button className={style.ButtonFormModel} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
//para hacer un comentario en bloque alt+shift+a
/*Mediante un input buscar el pais en un estado global , validando si existe, y si es asi, tomar el id
y pasarlo por body al post */

export default Form;
