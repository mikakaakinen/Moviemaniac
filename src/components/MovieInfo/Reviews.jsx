function Reviews(props) {
  return (
    <div className='reviews'>
      <h2 className='margin-bottom underline'>Arvostelut</h2>
      <ul>
        {props.reviews && props.reviews.length > 0 ? (
          props.reviews.map((review) => (
            <li key={review.id} style={{ marginBottom: 10 }}>
              <h2 className='margin-bottom underline'>{review.author}</h2>
              <p className='margin-bottom-small text-align-left body'>
                {review.content.slice(0, 500) + '...'}
              </p>
              <h3 className='margin-bottom'>
                {new Date(review.created_at).toLocaleDateString('fi-FI')}
              </h3>
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

export default Reviews;
