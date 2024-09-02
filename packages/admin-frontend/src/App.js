import logo from './logo.svg';
import './App.css';
import SharedButton from '@ecommerce/shared/src/Button';


function App() {
  return (
    <div className="App">
      <SharedButton onClick={() => alert('Hello from the shared button!')}>
        Click me!
      </SharedButton>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
