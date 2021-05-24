import "./base.scss";

const AdminArea = (props) => {
  return (
    <div className={"adminArea"}>
      <button
        className={"adminBtn"}
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
        {props.isOpen ? "Close" : "Login"}
      </button>
    </div>
  );
};

export default AdminArea;
