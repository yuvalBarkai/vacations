import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { signin, signout } from './actions';
import './App.css';
import NavigationLinks from './components/Routing/NavigationLinks';
import Routing from './components/Routing/Routing';

function App() {
    const isLogged = useSelector((state: any) => state.isLogged);
    const dispatch = useDispatch();
    return (
        <div className="App">
            <header>
                <h1>Vacations</h1>
                Logged status: {isLogged ? <h4>Logged</h4> : <h4>Not logged</h4>}
                <button onClick={() => isLogged ? dispatch(signout()) : dispatch(signin())}>Change</button>
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