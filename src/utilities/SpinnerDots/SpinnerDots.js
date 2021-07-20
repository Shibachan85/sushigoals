import "./base.scss";

const SpinnerDots = (props) => {
  return (
    <div className={"spinnerDots"}>
      <div
        className={"lds-ellipsis"}
        style={{ transform: `scale(${props.scale}` }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SpinnerDots;
