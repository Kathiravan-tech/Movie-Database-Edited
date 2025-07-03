import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoviePoster from '../MoviePoster'
import './index.css'

class UpComingMovies extends Component {
  state = {moviesList: [], isLoading: false}

  componentDidMount() {
    this.getMovieList()
  }

  getMovieList = async () => {
    this.setState({isLoading: true})
    const apiKey = '0548e4bb91a761217ee280f89244cfa8'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        overview: eachData.overview,
        releasedDate: eachData.release_date,
        rating: eachData.vote_average,
        poster_path: eachData.poster_path,
      }))
      this.setState({moviesList: updatedData, isLoading: false})
    } else {
      this.setState({moviesList: [], isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickSearch = data => {
    this.setState({moviesList: data})
  }

  renderMovieList = () => {
    const {moviesList} = this.state
    return (
      <div className="bottom-container">
        <h1 className="heading-text">Upcoming Movies</h1>
        <ul className="upcoming-movie-list-container">
          {moviesList.map(eachMovie => (
            <MoviePoster eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <Header onSearch={this.onClickSearch} />
        {isLoading ? this.renderLoader() : this.renderMovieList()}
      </div>
    )
  }
}

export default UpComingMovies
