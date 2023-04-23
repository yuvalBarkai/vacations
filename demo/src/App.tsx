import './App.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';
import LocalUserSave from './services/LocalUserSave';
import { signin, updateChecked } from './actions';
import SocketService from './services/SocketService';
import Footer from './components/Footer/Footer';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const success = await LocalUserSave.autoLoginAsync();
            if (success) { // connects the user automaticly if success has values
                dispatch(updateChecked(success.followedVac));
                dispatch(signin(success.user));
                SocketService.connect(dispatch, success.user.token);
            }
        })()
    }, [dispatch]);

    return (
        <div className="app">
            <BrowserRouter>
                <NavigationLinks />
                <main>
                    <Routing />
                </main>
            </BrowserRouter>
            <Footer />
        </div >
    );
}

export default App;