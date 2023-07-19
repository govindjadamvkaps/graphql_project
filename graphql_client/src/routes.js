import Home from "./pages/Home";
import CreateQuotes from './pages/CreateQuotes';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Login from './pages/Login';

export const routes = [
    {
        path:"/", element:<Home/>
    },
    {
        path:"/create-quotes", element:<CreateQuotes/>
    },
    {
        path:"/login", element:<Login/>
    },
    {
        path:"/sign-up", element:<SignUp/>
    },
    {
        path:"/profile", element:<Profile/>
    }
]