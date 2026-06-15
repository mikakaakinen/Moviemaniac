import { Link } from 'react-router-dom';
import Cat from '../../assets/cat.jpg';
import './Recommendations.css';

function Recommendations({ recommendations, query, type }) {
  return (
    <>
      <h2 className='styling underline'>
        Suositellut elokuvat (klikkaa kuvaa!)
      </h2>
      <div className='gallery-container'>
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((movie) => (
            <div className='gallery-item' key={movie.id}>
              {movie.poster_path ? (
                <Link to={`/info/${movie.id}?query=${query}&type=${type}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    loading='lazy'
                  />
                </Link>
              ) : (
                <img src={Cat} alt='Poster not available' loading='lazy' />
              )}
              <p className='image-title'>
                {movie.title.length > 30
                  ? movie.title.slice(0, 30) + '…'
                  : movie.title}
              </p>
            </div>
          ))
        ) : (
          <p>Ei saatavilla</p>
        )}
      </div>
    </>
  );
}

export default Recommendations;
