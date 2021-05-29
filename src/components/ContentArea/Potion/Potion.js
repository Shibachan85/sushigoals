import "./base.scss";
import bottle_body from "../../../resources/images/potion_vial/bottle_body.png";
import bottle_outline from "../../../resources/images/potion_vial/bottle_outline.png";
import bottle_top from "../../../resources/images/potion_vial/bottle_top.png";
import cork from "../../../resources/images/potion_vial/cork.png";
import reflection_bottom from "../../../resources/images/potion_vial/reflection_bottom.png";
import reflection_circles from "../../../resources/images/potion_vial/reflection_circles.png";
import reflection_top from "../../../resources/images/potion_vial/reflection_top.png";
import PotionContent from "../PotionContent/PotionContent";

// Opacity back to the front
const OPACITY = {
  body: 0.1,
  reflection_bottom: 0.2,
  cork: 1,
  bottle_top: 0.5,
  bottle_outline: 1,
  reflection_top: 0.75,
  reflection_circles: 0.75,
  content: 0.75,
};

const Potion = (props) => {
  return (
    <div className={"potionContainer"}>
      <PotionContent
        height={props.height}
        max={props.max}
        opacity={OPACITY.content}
      />
      <img
        style={{ opacity: OPACITY.cork }}
        className={"potionCork"}
        src={cork}
        alt={"potion"}
      />
      <img
        className={"potionBody"}
        style={{ opacity: OPACITY.body }}
        src={bottle_body}
        alt={"potion"}
      />
      <img
        className={"potionReflectionBottom"}
        style={{ opacity: OPACITY.reflection_bottom }}
        src={reflection_bottom}
        alt={"potion"}
      />
      <img
        style={{ opacity: OPACITY.bottle_top }}
        src={bottle_top}
        alt={"potion"}
      />
      <img
        className={"potionOutline"}
        style={{ opacity: OPACITY.bottle_outline }}
        src={bottle_outline}
        alt={"potion"}
      />
      <img
        className={"potionOutlineRight"}
        style={{ opacity: OPACITY.bottle_outline }}
        src={bottle_outline}
        alt={"potion"}
      />
      <img
        className={"potionReflectionTop"}
        style={{ opacity: OPACITY.reflection_top }}
        src={reflection_top}
        alt={"potion"}
      />
      <img
        className={"potionReflectionCircles"}
        style={{ opacity: OPACITY.reflection_circles }}
        src={reflection_circles}
        alt={"potion"}
      />
    </div>
  );
};

export default Potion;
