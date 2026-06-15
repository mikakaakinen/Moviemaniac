import Cat from '../../assets/cat.jpg';

function Crew(props) {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';
  return (
    <div className='movie-crew'>
      <h2 className='margin-bottom-small underline'>Crew</h2>
      <ul>
        {props.crew && props.crew.length > 0 ? (
          props.crew.map((person) => (
            <li key={person.credit_id} className='margin-bottom'>
              {person.profile_path ? (
                <div className='card'>
                  <img
                    src={`${IMAGE_BASE_URL}${person.profile_path}`}
                    alt={person.name}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      border: '5px solid #000000',
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
              <p>{person.job}</p>
            </li>
          ))
        ) : (
          <p>Ei saatavilla</p>
        )}
      </ul>
    </div>
  );
}

export default Crew;
