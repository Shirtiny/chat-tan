import { useState, useCallback } from "react";
import * as eccryptoJS from 'eccrypto-js';

const pubKeyPem = `
`;

function App() {
  const [input, setInput] = useState("");

  const handleEncode = useCallback(() => {
    // const pubKey = PublicKey.fromHex(pubKeyPem);
    // console.log(input, pubKey);
  }, [input]);

  return (
    <div>
      <input
        onChange={(e) => setInput(e.target.value)}
        style={{ margin: "8px" }}
      />
      <button onClick={handleEncode}>Endocde</button>
    </div>
  );
}

export default App;
