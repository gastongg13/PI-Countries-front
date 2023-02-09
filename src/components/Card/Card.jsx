import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.CardStyle}>
      <Link className={style.link} to={`/detail/${props.id}`}>
        <p>{props.name}</p>
        <p>{props.continent}</p>
        <img className={style.FlagModel} src={props.flag} alt="Not Available" />
      </Link>
    </div>
  );
};

export default Card;
