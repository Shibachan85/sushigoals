import Main from "./components/Main/Main.js";
import "./global/globalstyling.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet></Helmet>
        <Main />
      </div>
    </HelmetProvider>
  );
}

export default App;
