import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchComponent.css';
import Cat from '../../assets/cat.jpg';
import Spinner from '../Spinner/Spinner';
import Footer from '../Footer';

function SearchComponent() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  // 🔑 URL = truth
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'elokuva';
  // 🎨 UI-state (vain näkymää varten)
  const [inputValue, setInputValue] = useState(query);
  const [selectValue, setSelectValue] = useState(type);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔄 Synkkaa URL → UI
  useEffect(() => {
    setInputValue(query);
    setSelectValue(type);
  }, [query, type]);
  // 🔍 Haku – reagoi vain URL:n muutoksiin
  useEffect(() => {
    if (!query) return;
    setHasSearched(true);
    async function fetchData() {
      try {
        setLoading(true);
        if (type === 'elokuva') {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query,
            )}&api_key=${apiKey}`,
          );
          if (!res.ok) throw new Error('Elokuvan haku epäonnistui');
          const data = await res.json();
          setMovies(data.results.slice(0, 20));
        } else {
          const personRes = await fetch(
            `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
              query,
            )}&api_key=${apiKey}`,
          );
          const personData = await personRes.json();
          const director = personData.results[0];
          if (!director) {
            setMovies([]);
            toast.info('Ohjaajaa ei löytynyt');
            return;
          }
          const creditsRes = await fetch(
            `https://api.themoviedb.org/3/person/${director.id}/movie_credits?api_key=${apiKey}`,
          );
          const creditsData = await creditsRes.json();
          const directedMovies = creditsData.crew
            .filter((c) => c.job === 'Director')
            .sort((a, b) =>
              (b.release_date || '').localeCompare(a.release_date || ''),
            );
          setMovies(directedMovies);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, type, apiKey]);
  // 📨 Submit = kirjoita URL:iin
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSearchParams({
      query: inputValue,
      type: selectValue,
    });
  };
  // 🔁 Select = kirjoita URL:iin
  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    if (query) {
      setSearchParams({
        query,
        type: value,
      });
    }
  };
  return (
    <main className='page'>
      <ToastContainer position='top-right' autoClose={5000} />
      {loading && <Spinner />}
      <header className='header'>
        <h1 className='underline'>Elokuvahaku</h1>
      </header>
      <section className='search-layout'>
        <section className='select-and-form'>
          <select
            value={selectValue}
            onChange={handleTypeChange}
            className='margin-bottom-small'
          >
            <option value='elokuva'>Elokuva</option>
            <option value='ohjaaja'>Ohjaaja</option>
          </select>
          <form className='underline' onSubmit={handleSubmit}>
            <label htmlFor='movieName'>
              {selectValue.charAt(0).toUpperCase() + selectValue.slice(1) + 'n'}{' '}
              nimi:
            </label>
            <input
              type='text'
              id='movieName'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='border'
            />
            <button type='submit'>Lähetä</button>
          </form>
        </section>
        <section className='gallery-container'>
          {hasSearched ? (
            movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div className='gallery-item' key={movie.id}>
                  <Link to={`/info/${movie.id}?query=${query}&type=${type}`}>
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <img src={Cat} alt='No poster' />
                    )}
                  </Link>
                  <p className='image-title body'>{movie.title}</p>
                </div>
              ))
            ) : (
              <p className='text-align-center'>Elokuvia ei löytynyt</p>
            )
          ) : null}
        </section>
        <Link to='/' className='link-button'>
          Pääsivulle
        </Link>
      </section>
      <Footer />
    </main>
  );
}

export default SearchComponent;
