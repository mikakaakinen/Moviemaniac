import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MovieInfo.css';
import Cat from '../../assets/cat.jpg';
import Spinner from '../Spinner/Spinner';
import Cast from './Cast';
import Crew from './Crew';
import Videos from './Videos';
import Reviews from './Reviews';
import Recommendations from './Recommendations';
import Trailer from './Trailer';
import Footer from '../Footer';

function getRandomReviews(reviews, count = 3) {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function MovieInfo() {
  const [movie, setAll] = useState();
  const [trailer, setTrailer] = useState(null);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  async function fetchAll() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}` +
          `?api_key=${apiKey}` +
          `&append_to_response=reviews,recommendations,credits,videos` +
          `&language=fi-FI`,
      );
      if (!res.ok) {
        throw new Error('Elokuvan haku epäonnistui');
      }
      const data = await res.json();
      setAll(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchVideos() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
      );
      if (!res.ok) {
        throw new Error('Videoiden haku epäonnistui');
      }
      const data = await res.json();
      const firstFive = data.results.slice(0, 3);
      const foundTrailer = data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube',
      );
      setVideos(firstFive);
      setTrailer(foundTrailer || null);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`,
      );
      if (!res.ok) {
        throw new Error('Arvosteluiden haku epäonnistui');
      }
      const data = await res.json();
      const randomThree = getRandomReviews(data.results, 3);
      setReviews(randomThree);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        await Promise.all([fetchAll(), fetchVideos(), fetchReviews()]);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleBack = () => {
    if (query && type && query !== 'null' && type !== 'null') {
      navigate(`/search?query=${query}&type=${type}`);
    } else {
      navigate('/');
    }
  };

  if (!movie) return null;

  const imageSource = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : Cat;

  return (
    <main className='page'>
      <ToastContainer position='top-right' autoClose={5000} />
      {loading && <Spinner />}
      <header className='header'>
        <h1>{movie.title ? movie.title : 'Ei saatavilla'}</h1>
      </header>
      <section className='movie-layout'>
        <section className='movie-details'>
          <section className='content-width'>
            <section>
              <h2 className='margin-bottom-small underline'>Juoni</h2>
              {movie.overview ? (
                <p className='text-align-left margin-bottom-small'>
                  {movie.overview}
                </p>
              ) : (
                <p className='text-align-center margin-bottom-small'>
                  Ei saatavilla
                </p>
              )}
            </section>
            <section>
              <h2 className='margin-bottom-small underline'>Elokuvan tiedot</h2>
              <dl>
                <dt className='margin-bottom-small underline'>Lipputulot</dt>
                <dd className='margin-bottom-small'>
                  {movie.revenue
                    ? `${movie.revenue.toLocaleString()} $`
                    : 'Ei saatavilla'}
                </dd>
                <dt className='margin-bottom-small underline'>Kesto</dt>
                <dd className='margin-bottom-small'>
                  {movie.runtime != null
                    ? `${movie.runtime} min`
                    : 'Ei saatavilla'}
                </dd>
                <dt className='margin-bottom-small underline'>Rating</dt>
                <dd className='margin-bottom-small'>
                  {movie.vote_average
                    ? `${movie.vote_average}/10`
                    : 'Ei saatavilla'}
                </dd>
                <dt className='margin-bottom-small underline'>Julkaisupäivä</dt>
                <dd className='margin-bottom-small body'>
                  {movie.release_date ? movie.release_date : 'Ei saatavilla'}
                </dd>
              </dl>
            </section>
            <section>
              <h2 className='margin-bottom-small underline'>Genre</h2>
              {movie.genres && movie.genres.length > 0 ? (
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>
                      <p className='margin-bottom-small body'>{genre.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ei saatavilla</p>
              )}
            </section>
            <section className='movie-credits'>
              <Cast cast={movie.credits.cast.slice(0, 10)} />
              <Crew crew={movie.credits.crew.slice(0, 10)} />
            </section>
          </section>
        </section>
        <aside className='movie-sidebar'>
          <section className='sidebar-width'>
            <figure className='card margin'>
              <img
                src={imageSource}
                alt={movie.poster_path ? `${movie.title} poster` : movie.name}
                style={
                  movie.poster_path
                    ? {}
                    : {
                        width: '100%',
                        border: '5px solid #000000',
                        borderRadius: 8,
                      }
                }
              />
            </figure>
            <section className='margin-bottom'>
              <Trailer trailer={trailer} />
              <Videos videos={videos} />
            </section>
            <section>
              <Reviews reviews={reviews} />
            </section>
          </section>
        </aside>
      </section>
      <Recommendations
        recommendations={movie.recommendations.results.slice(0, 20)}
        query={query}
        type={type}
      />
      <button
        className='link-button'
        onClick={() => {
          handleBack();
        }}
      >
        Takaisin
      </button>

      <Footer />
    </main>
  );
}

export default MovieInfo;
