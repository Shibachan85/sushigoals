import Lantern from "../Lantern/Lantern";
import { LANTERN_COORDS } from "../../../utilities/customfunctions";

const LanternController = () => {
  return (
    <>
      {LANTERN_COORDS.map((lantern, index) => (
        <Lantern key={lantern.x + "key" + index} lantern={lantern} />
      ))}
    </>
  );
};

export default LanternController;
