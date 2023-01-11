import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CryptoStats from './pages/CryptoStats';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import Protected from './components/Protected';
import WatchList from './pages/WatchList';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CryptoStats />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Protected>
                <WatchList />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
