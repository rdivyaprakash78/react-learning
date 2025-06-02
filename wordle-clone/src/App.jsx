import { useState } from "react";
import "./App.css";
import Tiles from "./components/Tiles.jsx";

function App() {
  return (
    <div>
      <h1 className="Title">Wordle clone</h1>
      <Tiles />
    </div>
  );
}

export default App;
