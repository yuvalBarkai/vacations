import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';
import LocalUserSave from './services/LocalUserSave';
import { signin, updateChecked } from './actions';
import SocketService from './services/SocketService';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect");
        (async () => {
            const success = await LocalUserSave.autoLoginAsync();
            console.log(success);
            if (success) {
                dispatch(updateChecked(success.followedVac));
                dispatch(signin(success.user));
                SocketService.connect(dispatch);
            }
        })()
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