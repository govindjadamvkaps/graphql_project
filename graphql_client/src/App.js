import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CreateQuotes from './pages/CreateQuotes';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useRoutes } from "react-router-dom";
import {routes}  from './routes'
import OtherUserProfile from './pages/OtherUserProfile';
function App() {
  // const element = useRoutes(routes)
  return (
    
   <BrowserRouter>
   <NavBar></NavBar>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/create-quotes" element={<CreateQuotes/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/profile/:userId" element={<OtherUserProfile/>}></Route>

    </Routes> 
    {/* {element} */}
   </BrowserRouter>
  );
}

export default App;
