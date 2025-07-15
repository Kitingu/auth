// Importing Libraries
import React from "react";

// Importing Style
import './Main.css';

function Main({children}) {
  return (
    <React.Fragment>
      <main id="main" className="main-niceadmin">
        {children}
      </main>
    </React.Fragment>
  );
}

export default Main;