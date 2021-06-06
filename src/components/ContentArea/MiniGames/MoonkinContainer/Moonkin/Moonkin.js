import "./base.scss";

const Moonkin = (props) => {
  return (
    <img
      className={"moonkin__image"}
      //style={props.style}
      src={props.moonkin.image}
      alt={"moonkin"}
    />
  );
};

export default Moonkin;
