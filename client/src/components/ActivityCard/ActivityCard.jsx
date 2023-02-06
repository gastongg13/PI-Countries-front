import style from "./ActivityCard.module.css";
import { deleteActivityById } from "../../redux/actions";

const handleDelete = async (id, idCountry) => {
  const aux = await deleteActivityById(id, idCountry);
  alert(aux);
  window.location.reload();
};

const ActivityCard = (props) => {
  return (
    <div className={style.ActivityCardModel}>
      <h2>{props.name}</h2>
      <p>Difficulty(1-5): {props.difficulty} Level</p>
      <p>Duration in hours: {props.duration} </p>
      <p>Season: {props.seasons}</p>
      <button onClick={() => handleDelete(props.id, props.countryId)}>x</button>
    </div>
  );
};

export default ActivityCard;
