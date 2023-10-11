import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid m-20">
        <NavBar />
      </div>
      <div className="container-fluid">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
