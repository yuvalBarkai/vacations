import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import allReducers from './reducers';
// import SocketService from './services/SocketService';
// const socket = new SocketService();

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