import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import MovieInfo from './components/MovieInfo/MovieInfo';
import SearchComponent from './components/Search/SearchComponent';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/info/:id' element={<MovieInfo />} />
        <Route path='/search' element={<SearchComponent />} />
      </Routes>
    </Router>
  </StrictMode>,
);
