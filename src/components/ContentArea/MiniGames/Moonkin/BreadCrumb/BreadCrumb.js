import "./base.scss";
import {
  X_MODIFIER,
  Y_MODIFIER,
} from "../../../../../utilities/customfunctions";

const BreadCrumb = (props) => {
  const { crumbs } = props;
  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(crumbs.x, X_MODIFIER)}%`,
    top: `${percentifyCoord(crumbs.y, Y_MODIFIER)}%`,
    animationDelay: `${crumbs.delay}s`,
    boxShadow: `0px 0px ${crumbs.size}px ${crumbs.size}px #fff, 0px 0px ${
      crumbs.size * 2
    }px ${crumbs.size * 2}px #ff0`,
  };
  return (
    <>
      <div className={"breadCrumbs"} style={style} />
    </>
  );
};

export default BreadCrumb;
