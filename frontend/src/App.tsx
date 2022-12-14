import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';
import LocalUserSave from './services/LocalUserSave';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect");
        LocalUserSave.autoLogin(dispatch);
    }, [dispatch]);
    
    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <NavLink to={"/home"}><h1>Vacations</h1></NavLink>
                </header>
                <nav>
                    <NavigationLinks />
                </nav>
                <main>
                    <Routing />
                </main>
            </BrowserRouter>
            <footer>
                &copy; All Rights reservered
            </footer>
        </div >
    );
}

export default App;