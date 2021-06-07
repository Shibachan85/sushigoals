import "./base.scss";
import backgoundImage from "../../../resources/images/background_big.jpg";
import backgoundImageMobile from "../../../resources/images/background_mobile.jpg";

const Background = (props) => {
  const handleLoad = (e) => {
    const { name } = e.target;
    props.setLoadingState({ ...props.loadingState, [name]: true });
  };

  return (
    <img
      name={"background"}
      className={props.isMobile ? "backgroundImageMobile" : "backgroundImage"}
      src={props.isMobile ? backgoundImageMobile : backgoundImage}
      onLoad={handleLoad}
      alt={"background"}
    />
  );
};

export default Background;
