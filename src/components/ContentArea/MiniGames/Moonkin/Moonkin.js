import { BREAD_CRUMBS_COORDS } from "../../../../utilities/customfunctions";
import "./base.scss";
import BreadCrumb from "./BreadCrumb/BreadCrumb";

const Moonkin = () => {
  return (
    <>
      {" "}
      {BREAD_CRUMBS_COORDS.map((crumbs, index) => (
        <BreadCrumb key={crumbs.x + "key" + index} crumbs={crumbs} />
      ))}
    </>
  );
};

export default Moonkin;
