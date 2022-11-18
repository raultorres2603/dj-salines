import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import config from "../config/config.json";
import ReactPlayer from "react-player";

export function MainMenu() {
  const [username, setUsername] = useState("");
  const [song, setSong] = useState("");
  const [songs, setSongs] = useState([]);
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(true);

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
        if (response.data.error) {
          switch (response.data.error) {
            case 1:
              alert("No se puede introducir esta canción");
              break;

            default:
              break;
          }
        } else {
          setPlayer(
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${response.data.song}`}
              width="100%"
              height="60vh"
              playing={playing}
              volume={1}
              onProgress={(state) => {
                seeDuration(state);
              }}
            />
          );
        }
      });
  }

  function seeDuration(state) {
    console.log(parseInt(state.playedSeconds));
    if (parseInt(state.playedSeconds) === 30) {
      console.log("Parar");
      setPlaying(false);
    }
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
                <div className="row mt-4">{player}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
