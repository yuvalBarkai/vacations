import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { signin, signout } from './actions';
import './App.css';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';

function App() {
    const isLogged = useSelector((state: any) => state.isLogged);
    const dispatch = useDispatch();
    return (
        <div className="App">
            <header>
                <h1>Vacations</h1>
                Logged status: {isLogged ? <h4>Logged</h4> : <h4>Not logged</h4>}
                <button onClick={() => isLogged ? dispatch(signout()) : dispatch(signin(true))}>Change</button>
            </header>
            <BrowserRouter>
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