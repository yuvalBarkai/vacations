import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { signin, updateChecked } from './actions';
import './App.css';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';
import SocketService from './services/SocketService';
import configuration from "./configuration.json"

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("useEffect");
        const savedUserInfo = localStorage.getItem(configuration.localStorageObjName);
        if (savedUserInfo) {
            const user = JSON.parse(savedUserInfo);
            const now = new Date();
            if (new Date(user.expirationTime) > now) {
                (async () => {
                    const followedVac = await axios.get<{ vacation_id: number }[]>(`http://localhost:5000/medium/followed/${user.user_id}`,
                        { headers: { Authorization: `bearer ${user.token}` } });
                    dispatch(updateChecked(followedVac.data.map(f => f.vacation_id)));
                    dispatch(signin(user));
                    SocketService.connect(dispatch);
                })()
            }
        }
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