import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { logVersion } from "./utils/logger";
import "./App.css";

logVersion();

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  async function greet() {
    if (!window.__TAURI_IPC__) return;
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const message = (await invoke("greet", { name })) as string;
    setGreetMsg(message);
  }

  const verify = useCallback(async () => {
    setCount((v) => v + 1);
    const grecaptcha = (window as any).grecaptcha;
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        "6Lf8ohclAAAAAInG1aKYnPBL4129L8vP6ENZtNo4",
        { action: "login" }
      );
      console.log("token", token);
    });
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
      </div>
      <p>{greetMsg}</p>

      <div style={{ textAlign: "center" }}>
        <button onClick={verify} style={{ width: "fit-content" }}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
