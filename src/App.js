import logo from './logo.svg';
import './App.css';
const OpenAlert = () => 
{
  alert("hello react!!!!!!!!!!!")
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={OpenAlert}>Klik</button>



        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://github.com/maciekalfut/DaftAcademy-homework"
          target="_blank"
          rel="noopener noreferrer">
          github
        </a>
      </header>
    </div>
  );
}

export default App;
