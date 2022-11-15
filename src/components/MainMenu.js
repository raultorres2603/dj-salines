import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function MainMenu() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    let cookie = new Cookies();
    setUsername(cookie.get("Auth").user);
    console.log(username);
  }, []);

  return (
    <div className="card">
      <div className="card-header display-3 text-center bg-info">
        DJ-Salines
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-6 border border-dark border-5 rounded">
                <div className="row">
                  <p className="text-center display-4">Busca tu canción</p>
                </div>
                <hr />
                <div className="row">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      🎼
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="URL o título de la canción"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
