import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Analytics from './pages/Analytics';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={  <Home /> }></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/analytics' element={<Analytics />}></Route>

          </Routes>
          
        </BrowserRouter>
    </div>
  );
}

export default App;
