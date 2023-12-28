// Import necessary dependencies
import React, { useEffect , useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ChainInfo from './Components/ChainInfo/ChainInfo'; // Assurez-vous que ce composant est bien défini
import FakeBayc from './Components/FakeBayc/fakeBayc'; // Assurez-vous que ce composant est bien défini
import ErrorPage from './Components/Wrong_Page_404/ErrorPage'; // Assurez-vous que ce composant est bien défini
//import FakeNefturians from "./components/pages/fakeNefturians";
//import FakeMeebits from "./components/pages/fakeMeebits";
import { connectToMetamask } from './web3'; // Votre fonction pour se connecter à MetaMask

function App() {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    // Au montage de l'app, on tente de se connecter à MetaMask
    const initWeb3 = async () => {
      try {
        await connectToMetamask();
        console.log('Connected to MetaMask');
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };
    initWeb3();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  
  return (
    <div className="App">
      <header className="App-header">
      <img src="https://www.logo.wine/a/logo/Ethereum/Ethereum-Icon-Purple-Logo.wine.svg" alt="Logo Ethereum" className="ethereum-logo" />
        <nav>
          {showMenu && (
            <>
              <Link to="/ChainInfo">ChainInfo</Link>
              <Link to="/fakeBayc">FakeBayc</Link>
              <Link to="/fakeNefturians">FakeNefturians</Link>
              <Link to="/fakeNefturiansUser">FakeNefturiansUser</Link>
            </>
          )}
          <button onClick={toggleMenu}>Open / Close </button>
        </nav>
      </header>
      <Routes>
        <Route path="/ChainInfo" element={<ChainInfo />} />
        <Route path="/fakeBayc" element={<FakeBayc />} />
        <Route path="/fakeNefturians" element={<FakeBayc />} />
        <Route path="/" element={
          <>
            <p>Edit <code>src/App.js</code> and save to reload.</p>
          </>
        } />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
    
  );
}

export default App;
