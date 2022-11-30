import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { signin, signout } from './actions';
import './App.css';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Vacations</h1>
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