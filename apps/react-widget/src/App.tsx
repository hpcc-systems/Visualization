import React from "react";
import "./App.css";
import { ECLEditorComponent, AutosizeECLEditorComponent } from "./ECLEditor";

function App() {

  const code = `\
MySample := SAMPLE(Person,10,1) // get every 10th record
SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                      {'F'},{'G'},{'H'},{'I'},{'J'},
                      {'K'},{'L'},{'M'},{'N'},{'O'},
                      {'P'},{'Q'},{'R'},{'S'},{'T'},
                      {'U'},{'V'},{'W'},{'X'},{'Y'}],
                      {STRING1 Letter});
Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U`;

  return <div className="App">
    <header className="App-header" >
      <h2>Quick and Nasty Demo</h2>
      <ECLEditorComponent text={code} width={800} height={200}></ECLEditorComponent>
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <div style={{ width: "600px", height: "333px" }}>
        <AutosizeECLEditorComponent text={code}></AutosizeECLEditorComponent>
      </div>
    </header>
  </div>;
}

export default App;
