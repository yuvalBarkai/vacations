import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';
import currentSocket from './services/SocketService';

function App() {
    const dispatch = useDispatch();
    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <NavLink to={"/home"}><h1>Vacations</h1></NavLink>
                    <button onClick={() => { currentSocket.disconnect(dispatch) }}>Sign out</button>
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