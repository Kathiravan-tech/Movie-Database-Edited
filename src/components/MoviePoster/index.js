import {Link} from 'react-router-dom'
import './index.css'

const MoviePoster = props => {
  const {eachMovie} = props
  const baseUrlForPoster = 'https://image.tmdb.org/t/p/w500'
  const posterImageUrl = `${baseUrlForPoster}${eachMovie.poster_path}`
  return (
    <li className="poster-item">
      {eachMovie.poster_path && (
        <img
          src={posterImageUrl}
          alt={`${eachMovie.title} poster`}
          className="poster-image"
        />
      )}
      <h1 className="movie-name">{eachMovie.title}</h1>
      <p className="rating-text">{eachMovie.rating}</p>
      <Link to={`/details/${eachMovie.id}`} className="link-style">
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MoviePoster
