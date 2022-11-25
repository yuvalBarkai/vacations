import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavigationLinks from './components/Routing/NavigationLinks';
import Routing from './components/Routing/Routing';

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
        </div>
    );
}

export default App;