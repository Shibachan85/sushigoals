import "./base.scss";
import bottle_body from "../../../resources/images/potion_vial/bottle_body.png";
import bottle_outline from "../../../resources/images/potion_vial/bottle_outline.png";
import bottle_top from "../../../resources/images/potion_vial/bottle_top.png";
import cork from "../../../resources/images/potion_vial/cork.png";
import reflection_bottom from "../../../resources/images/potion_vial/reflection_bottom.png";
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
  reflection_circles: 0.6,
  reflection_bottle_right: 0.4,
  content: 0.75,
};

const Potion = (props) => {
  const handleLoad = (e) => {
    const { name } = e.target;
    props.setLoadingState({ ...props.loadingState, [name]: true });
  };

  return (
    <div className={"potionContainer"}>
      <PotionContent
        height={props.height}
        max={props.max}
        opacity={OPACITY.content}
      />
      <img
        name={"cork"}
        style={{ opacity: OPACITY.cork }}
        className={"potionCork"}
        src={cork}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"body"}
        className={"potionBody"}
        style={{ opacity: OPACITY.body }}
        src={bottle_body}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"reflection_bottom"}
        className={"potionReflectionBottom"}
        style={{ opacity: OPACITY.reflection_bottom }}
        src={reflection_bottom}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"bottle_top"}
        style={{ opacity: OPACITY.bottle_top }}
        src={bottle_top}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"bottle_outline"}
        className={"potionOutline"}
        style={{ opacity: OPACITY.bottle_outline }}
        src={bottle_outline}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"bottle_outline_right"}
        className={"potionOutlineRight"}
        style={{ opacity: OPACITY.bottle_outline }}
        src={bottle_outline}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <img
        name={"reflection_top"}
        className={"potionReflectionTop"}
        style={{ opacity: OPACITY.reflection_top }}
        src={reflection_top}
        onLoad={handleLoad}
        alt={"potion"}
      />
      <div
        className={"potionReflectionCircles_base potionReflectionCircles_small"}
        style={{ opacity: OPACITY.reflection_circles }}
      />
      <div
        className={"potionReflectionCircles_base potionReflectionCircles_large"}
        style={{ opacity: OPACITY.reflection_circles }}
      />
      <div
        className={"potionReflectionRightLine"}
        style={{ opacity: OPACITY.reflection_bottle_right }}
      />
    </div>
  );
};

export default Potion;
