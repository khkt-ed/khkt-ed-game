import './App.css';
import { useState, useEffect } from 'react';
import Main from './pages/Main';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  // useEffect(() => {
  //   if (width > 1500  ) {
  //     setScale(1);
  //   }
  //   if (width <= 1500) {
  //     setScale(0.9);
  //   }
  //   if (width <= 1200) {
  //     setScale(0.8);
  //   }
  //   if (width <= 1024) {
  //     setScale(0.7);
  //   }
  //   if (width <= 900) {
  //     setScale(0.4);
  //   }
  // }, [width]);

  return (
    <div className="App">
      <Main scale={scale} />
    </div>
  )
}

export default App;