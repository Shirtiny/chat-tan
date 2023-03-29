import { useState, useCallback } from "react";
import snappy from "snappyjs";
import { str2ab, ab2str } from "@shirtiny/utils/lib/base64";

function App() {
  const [input, setInput] = useState("");

  const handleEncode = useCallback(() => {
    const ab = str2ab(input);
    console.log("str2ab", ab);

    const result = snappy.compress(ab);
    console.log("result\n", result);

    const uncompressData = snappy.uncompress(result);
    console.log("uncompress\n", ab2str(uncompressData));
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
