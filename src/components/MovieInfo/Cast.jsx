import Cat from '../../assets/cat.jpg';

function Cast(props) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';
  return (
    <div className='movie-cast'>
      <h2 className='margin-bottom-small underline'>Cast</h2>
      <ul>
        {props.cast && props.cast.length > 0 ? (
          props.cast.map((person) => (
            <li key={person.credit_id} className='margin-bottom'>
              {person.profile_path ? (
                <div className='card'>
                  <img
                    src={`${IMAGE_BASE_URL}${person.profile_path}`}
                    alt={person.name}
                    style={{
                      width: '100%',
                      border: '5px solid #000000',
                      borderRadius: 8,
                    }}
                  />
                </div>
              ) : (
                <div className='card'>
                  <img
                    src={Cat}
                    alt={person.name}
                    style={{
                      width: '100%',
                      border: '5px solid #000000',
                      borderRadius: 8,
                    }}
                  />
                </div>
              )}
              <p>
                <strong>{person.name}</strong>
              </p>
              <p>{person.character}</p>
            </li>
          ))
        ) : (
          <li>
            <p>Ei saatavilla</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Cast;
