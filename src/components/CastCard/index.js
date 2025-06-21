import './index.css'

const CastCard = props => {
  const {eachCast} = props
  const {imageUrl, name, characterName} = eachCast
  const baseUrlForPoster = 'https://image.tmdb.org/t/p/w500'
  const castImageUrl = `${baseUrlForPoster}${imageUrl}`

  return (
    <li className="list-item">
      <img src={castImageUrl} alt="movie-cast" className="cast-image" />
      <div className="cast-details-text-container">
        <h1 className="real-name">{name}</h1>
        <p className="cast-name">{characterName}</p>
      </div>
    </li>
  )
}

export default CastCard
