import style from "./Paging.module.css";

const Paging = (props) => {
  return (
    <div className={style.PagingModel}>
      <button onClick={props.prevHandler}>Prev</button>

      <h3 className={style.H3Model}>{props.currentPage + 1}</h3>

      <button onClick={props.nextHandler}>Next</button>
    </div>
  );
};

export default Paging;
