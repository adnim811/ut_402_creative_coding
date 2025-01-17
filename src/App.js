import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./taubman_college.png')} alt="tc_logo" className='logo'/>
        <p>
          Welcome to Urban Technology 402.001 "Creative Coding"!
        </p>
        <a
          className="App-link"
          href="https://github.com/jschwartzuofm/ut_402_creative_coding"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to checkout the class Github Repository
        </a>
      </header>
    </div>
  );
};

export default App;
