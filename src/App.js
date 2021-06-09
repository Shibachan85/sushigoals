import Main from "./components/Main/Main.js";
import "./global/globalstyling.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

{
  /* <meta
property="og:title"
content="A World of Warcraft classic commewnity"
/>
<meta
property="og:site_name"
content="A World of Warcraft classic commewnity"
/>
<meta property="og:type" content="website" />
<meta
property="og:image"
content="%PUBLIC_URL%/sushi_guild_logo_394-264_.png"
/>
<meta property="og:url" content="https://www.sushiguild.eu" /> */
}

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          {/* <meta
            property="og:site_name"
            content="A World of Warcraft classic commewnity"
          />
          <meta
            property="og:title"
            content="A World of Warcraft classic commewnity"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="%PUBLIC_URL%/sushi_guild_logo_394-264.png"
          />
          <meta property="og:url" content="https://www.sushiguild.eu" /> */}
        </Helmet>
        <Main />
      </div>
    </HelmetProvider>
  );
}

export default App;
