import "./base.scss";

const ImageCache = (props) => {
  return (
    <div className={"_cdGfYlaqPz"}>
      <div className={"_kgkdHkikL"}>
        <div className={"_cache"}>
          {props.deathrollImgs.map((img, index) => (
            <img
              key={`${index}qdFfDpoYzs`}
              name={img.name}
              className={"_cacheImgs"}
              src={img.image}
              onLoad={props.handleLoad}
              alt={"cache"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCache;
