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
                <div className="col-sm-6 border border-dark border-5 rounded">
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
                          placeholder="URL o título de la canción"
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
                </div>
                <div className="col-sm-6 border border-dark border-5 rounded">
                  <div className="row">
                    <p className="text-center display-4">Elige</p>
                  </div>
                  <hr />
                  <div className="listSongs">
                    {songs.map((song, index) => (
                      <div className="card">
                        <img
                          src={song.snippet.thumbnails.high.url}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a href="#" className="btn btn-primary">
                            Go somewhere
                          </a>
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
    </div>
  );
}
