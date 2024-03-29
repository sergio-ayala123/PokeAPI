import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootswatch/dist/darkly/bootstrap.min.css";
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CardSetPage from './pages/CardSetPage';
import Paths from './components/Paths';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <NavBar/>

    <Paths/>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
