import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function App() {
  const [login, setLogin] = useState(false);
  const [cookie, setCookie] = useState(new Cookies());

  useEffect(() => {
    if (cookie.get("Auth")) {
      setLogin(true);
    }
  }, []);

  return (
    <div className="mainMenu">
      <div className="container">
        <div className="col-md-12">{login ? <MainMenu /> : <Login />}</div>
      </div>
    </div>
  );
}

export default App;
