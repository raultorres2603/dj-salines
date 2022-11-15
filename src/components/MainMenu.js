import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { YoutubeAPI } from "./YoutubeAPI";

export function MainMenu() {
  const [username, setUsername] = useState("");
  const [song, setSong] = useState("");
  const [youtubeAPI, setAPI] = useState(new YoutubeAPI());
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let cookie = new Cookies();
    setUsername(cookie.get("User"));
    console.log(username);
  }, []);

  async function searchSong() {
    if (song.length > 0) {
      let object = await youtubeAPI.getSongs(song);
      setSongs(await object.items);
      console.log(songs);
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
                <div className="listSongs row">
                  {songs.map((song, index) => (
                    <div className="card w-25" key={index}>
                      <img
                        src={song.snippet.thumbnails.high.url}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div className="row h-25 overflow-auto">
                          <p className="card-title h5">{song.snippet.title}</p>
                        </div>
                        <div className="row mt-3">
                          <div className="d-grid gap-2">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={searchSong}
                            >
                              Seleccionar
                            </button>
                          </div>
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
