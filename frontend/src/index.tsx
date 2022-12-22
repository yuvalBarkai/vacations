import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import allReducers from './reducers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

const store = configureStore({
  reducer: allReducers,
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);