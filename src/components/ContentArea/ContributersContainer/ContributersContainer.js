import ContributerItem from "../ContributerItem/ContributerItem";
import "./base.scss";

const ContributersContainer = (props) => {
  return (
    <div className={"constributersContainer"}>
      {props.contributers.map((contributer, index) => (
        <ContributerItem
          key={contributer.name + index + contributer.donated}
          content={`${contributer.name} donated ${contributer.donated}g`}
        />
      ))}
    </div>
  );
};

export default ContributersContainer;
