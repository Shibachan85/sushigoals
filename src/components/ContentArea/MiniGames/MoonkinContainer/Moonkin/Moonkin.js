import "./base.scss";

const Moonkin = (props) => {
  return (
    <div className={"moonkinContainer__moonkin"}>
      <img
        className={props.moonkin.classname}
        style={props.moonkin.style}
        src={props.moonkin.image}
        alt={"moonkin"}
      />
    </div>
  );
};

export default Moonkin;
