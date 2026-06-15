import './App.css';
import Fire from './assets/fire.png';
import Star from './assets/glowing-star.png';
import Party from './assets/partying-face.png';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <h3 className='h3-styling'>Klikkaa kuvaa!</h3>
      <MovieList type='popular' title='Suositut' emoji={Fire} />
      <MovieList type='top_rated' title='Parhaat' emoji={Star} />
      <MovieList type='upcoming' title='Tulevat' emoji={Party} />
      <Footer className='footer' />
    </>
  );
};

export default App;
