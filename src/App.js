import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Login } from "./components/Login";
import { MainMenu } from "./components/MainMenu";

function App() {
  const [login, setLogin] = useState(false);
  const [cookie, setCookie] = useState(new Cookies());
  const [comprob, setComprob] = useState();

  useEffect(() => {
    if (cookie.get("Auth")) {
      setLogin(true);
      setComprob(
        setInterval(() => {
          if (!cookie.get("Auth")) {
            setLogin(false);
          } else {
            setLogin(true);
          }
        }, 500)
      );
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
