import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import config from "../config/config.json";

export function MainMenu() {
  const [username, setUsername] = useState("");
  const [song, setSong] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let cookie = new Cookies();
    setUsername(cookie.get("User"));
    console.log(username);
  }, []);

  async function searchSong() {
    axios
      .post(`${config.secure}://${config.domain}:${config.port}/api/search`, {
        song: song,
      })
      .then((response) => {
        setSongs(response.data);
      });
  }

  function songSelected(ev) {
    let songEv = ev.target.id;
    axios
      .post(`${config.secure}://${config.domain}:${config.port}/api/selected`, {
        song: songEv,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  function handleInput(ev) {
    switch (ev.target.id) {
      case "titleSong":
        setSong(ev.target.value);
        break;

      default:
        break;
    }
  }

  return (
    <div className="card">
      <div className="card-header bg-info">
        <div className="row">
          <p className="display-3 text-center fw-bold">DJ-Salines</p>
        </div>
        <div className="row">
          <p className="h5 text-center fw-light">
            Login: ({window.atob(username)})
          </p>
        </div>
      </div>
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="row">
                  <p className="text-center display-4">Busca</p>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        🎼
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="URL"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onInput={handleInput}
                        id="titleSong"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={searchSong}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <p className="text-center display-4">Elige</p>
                </div>
                <hr />

                <div
                  className="listSongs row border border-dark border-5 rounded"
                  style={{
                    height: `50vh`,
                    width: `100%`,
                    flexWrap: "nowrap",
                    overflowX: "auto",
                  }}
                >
                  {songs.map((song, index) => (
                    <div
                      className="card mr-2"
                      key={index}
                      style={{ width: `50vh`, height: `auto` }}
                    >
                      <img
                        src={song.snippet.thumbnails.high.url}
                        className="card-img-top"
                        id={song.id.videoId}
                        onClick={songSelected}
                      />
                      <div className="card-body">
                        <div
                          className="row overflow-auto"
                          style={{ height: `10vh` }}
                        >
                          <p
                            className="card-title"
                            style={{ fontSize: 3 + "vh" }}
                          >
                            {song.snippet.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
