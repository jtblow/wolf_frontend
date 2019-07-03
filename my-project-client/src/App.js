import React from "react";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="imgcontainer">
          <img
            src="https://i.ibb.co/SvwdGLJ/WolfLogo.png"
            alt="WolfLogo"
            border="0"
            className="WolfLogo"
          />
        </div>
      </header>

      <Home />
    </div>
  );
}

export default App;
