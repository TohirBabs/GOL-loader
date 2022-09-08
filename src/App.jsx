import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  var rows = 20;
  var cols = 20;

  function golAlgo(gridArray) {
    console.log(gridArray[0]);
  }

  const Bloc = ({ i, j, state }) => {
    const [alive, setAlive] = useState(state);

    return (
      <div
        onClick={() => {
          setAlive(!alive);
        }}
        style={{
          width: "15px",
          height: "15px",
          cursor: "pointer",
          backgroundColor: alive ? "#306230" : "#cadc9f",
        }}
      ></div>
    );
  };

  const initGridArray = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      initGridArray.push(
        <Bloc
          i={i}
          j={j}
          state={Math.floor(Math.random() * 100) % 3 === 0 ? true : false}
          key={`${i}${j}`}
        />
      );
    }
  }

  const Grid = ({ children }) => {
    return (
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "1px",
        }}
      >
        {children}
      </div>
    );
  };

  const NexGen = () => {
    return (
      <div
        onClick={() => nextGen()}
        style={{
          color: "white",
          padding: "10px",
          borderRadius: "0.5rem",
          cursor: "pointer",
          backgroundColor: "#306230",
        }}
      >
        Next Gen
      </div>
    );
  };

  const [gridArray, setGridArray] = useState(initGridArray);

  function getblocers(bloc) {
    var blocers = [];
    gridArray.forEach((blocer) => {
      if (
        blocer !== bloc &&
        Math.abs(blocer.props.i - bloc.props.i) < 2 &&
        Math.abs(blocer.props.j - bloc.props.j) < 2
      ) {
        blocers.push(blocer);
      }
    });
    return blocers;
  }

  function checkAlive(blocers) {
    var liveBlocers = 0;
    blocers.forEach((blocer) => {
      if (blocer.props.state) {
        liveBlocers++;
      }
    });
    return liveBlocers;
  }

  // console.log(getblocers(gridArray[15]));
  console.log(checkAlive(getblocers(gridArray[14])));

  console.log(gridArray);
  var nextGen = setInterval(function () {
    var nextGridArray = [];
    gridArray.forEach((bloc) => {
      if (
        bloc.props.state &&
        (checkAlive(getblocers(bloc)) == 2 || checkAlive(getblocers(bloc)) == 3)
      ) {
        nextGridArray.push(
          <Bloc
            i={bloc.props.i}
            j={bloc.props.j}
            state={true}
            key={`${bloc.props.i}${bloc.props.j}`}
          />
        );
      } else if (!bloc.props.state && checkAlive(getblocers(bloc)) == 3) {
        nextGridArray.push(
          <Bloc
            i={bloc.props.i}
            j={bloc.props.j}
            state={true}
            key={`${bloc.props.i}${bloc.props.j}`}
          />
        );
      } else {
        nextGridArray.push(
          <Bloc
            i={bloc.props.i}
            j={bloc.props.j}
            state={false}
            key={`${bloc.props.i}${bloc.props.j}`}
          />
        );
      }
    });
    setGridArray(nextGridArray);
    // console.log(nextGridArray);
    // return nextGridArray;
  }, 1000);
  return (
    <div className="App">
      <Grid>{gridArray}</Grid>
      <NexGen />
    </div>
  );
}

export default App;
