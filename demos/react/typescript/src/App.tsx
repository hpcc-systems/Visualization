import React from "react";
import { HPCCZoomElement } from "@hpcc-js/wc-layout";
import logo from './logo.svg';
import './App.css';

HPCCZoomElement.register();

function App() {

  const ref = React.useRef<HPCCZoomElement>(null);

  React.useLayoutEffect(() => {
    const handleChange = () => {
      console.log("zoom", Date.now())
    };

    const { current } = ref;

    if (current) {
      current.addEventListener('zoom', handleChange);
      return () => current.removeEventListener('zoom', handleChange);
    }
  }, [ref]);

  const handleChange = React.useCallback((ev) => {
    console.log("woohoo", Date.now());
  }, []);

  return <div className="App">
    <header className="App-header" >
      <hpcc-zoom ref={ref} scale={0.25} x={200} y={0} scale_min={0.1} onChange={handleChange} onchange={handleChange} style={{ width: "100%", height: "800px", backgroundColor: "darkGray" }}>
        <h2>Try Dragging and Zooming Me</h2>
        <img src={logo} className="App-logo" alt="logo" />
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
        <h2>Try Dragging and Zooming Me</h2>
      </hpcc-zoom>
    </header>
  </div>;
}

export default App;
