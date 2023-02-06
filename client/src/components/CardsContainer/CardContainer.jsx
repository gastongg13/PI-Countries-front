import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardContainer = (props) => {
  return (
    <div className={style.CardsContainerStyle}>
      {props.countries.map((country) => {
        return (
          <Card
            name={country.name}
            continent={country.continent}
            flag={country.flag}
            key={country.name}
            id={country.id}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
