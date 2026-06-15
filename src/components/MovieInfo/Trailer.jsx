function Trailer(props) {
  return (
    <>
      {props.trailer?.key && (
        <div className='margin-bottom'>
          <h2 className='margin-bottom underline'>Trailer</h2>
          <div className='video-wrapper'>
            <iframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${encodeURIComponent(props.trailer.key)}`}
              title='Trailer'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Trailer;
