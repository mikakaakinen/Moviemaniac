import { useEffect, useState } from 'react';
import _ from 'lodash';
import './MovieList.css';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: 'default',
    order: 'asc',
  });
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (sort.by !== 'default') {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  const fetchMovies = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=fi-FI`,
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className='section-container'>
        <header className='header-container'>
          <h2 className='title'>{title}</h2>
          <img src={emoji} alt={`${emoji} icon`} className='emoji' />
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name='by'
            id=''
            onChange={handleSort}
            value={sort.by}
            className='sort-select'
          >
            <option value='default'>Lajittele</option>
            <option value='release_date'>Aika</option>
            <option value='vote_average'>Rating</option>
          </select>
          <select
            name='order'
            id=''
            onChange={handleSort}
            value={sort.order}
            className='sort-select'
          >
            <option value='asc'>Nouseva</option>
            <option value='desc'>Laskeva</option>
          </select>
        </header>
      </section>
      <section className='movie_cards'>
        {filterMovies.map((movie) => (
          <MovieCard
            className='movie_cards_item'
            key={movie.id}
            movie={movie}
          />
        ))}
      </section>
    </>
  );
};

export default MovieList;
