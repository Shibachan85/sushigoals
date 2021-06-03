import "./base.scss";

const BreadCrumb = (props) => {
  const { crumbs } = props;
  const style = {
    animationDelay: `${crumbs.delay}s`,
    boxShadow: `0px 0px ${crumbs.size}px ${crumbs.size}px #fff, 0px 0px ${
      crumbs.size * 2
    }px ${crumbs.size * 2}px #ff0`,
  };
  return (
    <>
      <div className={"breadCrumbs"} style={style} />
    </>
  );
};

export default BreadCrumb;
