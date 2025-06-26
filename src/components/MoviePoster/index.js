import {Link} from 'react-router-dom'
import './index.css'

const MoviePoster = props => {
  const {eachMovie} = props
  const baseUrlForPoster = 'https://image.tmdb.org/t/p/w500'
  const posterImageUrl = `${baseUrlForPoster}${eachMovie.poster_path}`

  return (
    <li className="poster-item">
      <img
        src={posterImageUrl}
        alt={`${eachMovie.title} poster`}
        className="poster-image"
        onError={e => {
          e.target.onerror = null
          e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster'
        }}
      />
      <h1 className="movie-name">{eachMovie.title}</h1>
      <p className="rating-text">Rating: {eachMovie.rating}</p>
      <Link to={`/details/${eachMovie.id}`} className="link-style">
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MoviePoster

