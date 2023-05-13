import classes from "../Modules/App.module.css";
import { Link } from "react-router-dom";

const NavComponent = (props: any) => {
  return (
    <>
      <nav className={classes.navBar}>
        <select
          name="selectLocation"
          className="form-select w-25"
          onChange={props.changeHandler}
        >
          <option value="ყველა">ყველა</option>
          <option value="მთავარი ოფისი">მთავარი ოფისი</option>
          <option value="კავეა გალერეა">კავეა გალერეა</option>
          <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
          <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
          <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
        </select>
        <Link to={"/Add"}>
          <button type="button" className="btn btn-dark">
            დამატება
          </button>
        </Link>
      </nav>
    </>
  );
};

export default NavComponent;
