import "./base.scss";

const LoadingPage = () => {
  return (
    <div className={"loadingPageContainer"}>
      <svg width="0" height="0">
        <filter id="gooey-black-hole">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
            result="goo"
          />
        </filter>
      </svg>
      <div className="black-hole">
        <ul className="gooey-container">
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
        </ul>
      </div>
      <h3 className={"loadingTitle"}>Loading sushi rolls</h3>
    </div>
  );
};

export default LoadingPage;
