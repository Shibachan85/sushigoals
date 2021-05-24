import "./base.scss";

const ContributerItem = (props) => {
  return (
    <div className={"contributerItem"}>
      <p>{props.content}</p>
    </div>
  );
};

export default ContributerItem;
