import { useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function saveInputs(ev) {
    switch (ev.target.id) {
      case "username":
        setUsername(ev.target.value);
        break;
      case "password":
        setPassword(ev.target.value);
        break;

      default:
        break;
    }
  }

  function handleSubmit() {
    console.log(`Username: ${username} || Password: ${password}`);
  }

  return (
    <div className="card">
      <div className="card-header display-3 text-center bg-info fw-bold">
        LOGIN
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                onInput={saveInputs}
                placeholder="Pon tu usuario aquí"
              />
              <label htmlFor="username">Usuario</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                onInput={saveInputs}
                placeholder="Pon tu password aquí"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="col-md-4 align-middle">
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-success btn-lg"
                onClick={handleSubmit}
              >
                Success
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
