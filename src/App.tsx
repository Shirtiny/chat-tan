import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://chat-tan.shirtiny.cn" target="self">
          <img src="/logo.svg" className="logo" alt="logo" />
        </a>
      </div>
      <h1>Chat - Tan， 茶与青春范</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>We are ready to go</p>
      </div>
      <p className="read-the-docs">
        Click on the 'Chat-Tan' logo to learn more
      </p>
    </div>
  );
}

export default App;
