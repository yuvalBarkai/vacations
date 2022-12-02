import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavigationLinks from './routing/NavigationLinks';
import Routing from './routing/Routing';

function App() {
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