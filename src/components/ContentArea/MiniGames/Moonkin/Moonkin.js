import { BREAD_CRUMBS_COORDS } from "../../../../utilities/customfunctions";
import "./base.scss";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Moonkin_Standing_Straight from "../../../../resources/images/moonkin/mk_standing_straight.png";

const Moonkin = () => {
  return (
    <>
      {" "}
      {BREAD_CRUMBS_COORDS.map((crumbs, index) => (
        <BreadCrumb key={crumbs.x + "key" + index} crumbs={crumbs} />
      ))}
      <img
        className={"moonkin__standing__straight"}
        src={Moonkin_Standing_Straight}
        alt={"moonkin"}
      />
    </>
  );
};

export default Moonkin;
