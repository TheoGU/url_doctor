import React from "react";
import axios from "axios";
import Item from "./components/Item";
import "./App.css";

function App() {
  const [timer, setTimer] = React.useState(5);
  const [url, setUrl] = React.useState("");

  const [stateUrl, setStateUrl] = React.useState("");

  const getUrl = () => {
    axios.get("http://localhost:5000/url").then((res) => {
      setUrl(res.data.url);
      setStateUrl(res.data.state);
    });
  };

  React.useEffect(() => {
    getUrl();
    const realTime = setInterval(() => {
      getUrl();
    }, 5000);
    return () => clearInterval(realTime);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>URL doctor</h1>
        <strong style={{ color: "#A29BFE" }}>{url || "Aucun url"}</strong>
      </div>
      <h2>Last value state : </h2>
      <div style={{ marginTop: 30 }}>
        {stateUrl && <Item state={stateUrl} />}
      </div>
    </div>
  );
}

export default App;
