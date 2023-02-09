import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.LandingImg}>
      <div className={style.LandingText}>
        <h1>
          <Link className={style.link} to="/home">
            Discover The World
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Landing;
