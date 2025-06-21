import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CastCard from '../CastCard'
import Header from '../Header'
import './index.css'

class ViewDetails extends Component {
  state = {movieDetails: {genres: []}, castDetailsList: [], isLoading: false}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = '0548e4bb91a761217ee280f89244cfa8'
    const detailsApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const castApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response1 = await fetch(detailsApiUrl, options)
    const response2 = await fetch(castApiUrl, options)
    if (response1.ok && response2.ok) {
      const fetchedData1 = await response1.json()
      const fetchedData2 = await response2.json()
      const updatedDetails = {
        name: fetchedData1.original_title,
        imageUrl: fetchedData1.poster_path,
        rating: fetchedData1.vote_average,
        duration: fetchedData1.runtime,
        genres: fetchedData1.genres,
        releaseDate: fetchedData1.release_date,
        overview: fetchedData1.overview,
        id: fetchedData1.id,
      }
      const updatedCastList = fetchedData2.cast.map(eachCast => ({
        imageUrl: eachCast.profile_path,
        name: eachCast.original_name,
        characterName: eachCast.character,
        id: eachCast.id,
      }))
      this.setState({
        movieDetails: updatedDetails,
        castDetailsList: updatedCastList,
        isLoading: false,
      })
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {movieDetails, castDetailsList} = this.state
    const baseUrlForPoster = 'https://image.tmdb.org/t/p/w500'
    const movieUrl = `${baseUrlForPoster}${movieDetails.imageUrl}`
    const genresString = movieDetails.genres?.map(g => g.name).join(', ')
    return (
      <div className="bottom-container">
        <h1 className="movie-details-section-title">Movie Details</h1>
        <div className="movie-details-container">
          <img
            src={movieUrl}
            alt="details-img"
            className="movie-details-image"
          />
          <div className="details-text-container">
            <h1 className="name">Name: {movieDetails.name}</h1>
            <p className="key-text">
              Rating:{'  '}
              <span className="value-text">{movieDetails.rating}</span>
            </p>
            <p className="key-text">
              Duration:{'  '}
              <span className="value-text">{movieDetails.duration}</span>
            </p>
            <p className="key-text">
              Genre: <span className="value-text">{genresString}</span>
            </p>
            <p className="key-text">
              Release Date:{'  '}
              <span className="value-text">{movieDetails.releaseDate}</span>
            </p>
            <p className="key-text">Overview</p>
            <p className="value-text">{movieDetails.overview}</p>
          </div>
        </div>
        <h1 className="movie-details-section-title">Cast</h1>
        <ul className="cast-container">
          {castDetailsList.map(eachCast => (
            <CastCard eachCast={eachCast} key={eachCast.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <Header />
        {isLoading ? this.renderLoader() : this.renderDetails()}
      </div>
    )
  }
}

export default ViewDetails
