function Videos(props) {
  return (
    <>
      <h2 className='margin-bottom underline'>Videot</h2>
      <ul>
        {props.videos && props.videos.length > 0 ? (
          props.videos.map((video) => (
            <li key={video.id} className='margin-bottom'>
              {video.site === 'YouTube' && (
                <div className='margin-bottom-small'>
                  <div className='video-wrapper'>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      width='560'
                      height='315'
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>
            <p>Ei saatavilla</p>
          </li>
        )}
      </ul>
    </>
  );
}

export default Videos;
