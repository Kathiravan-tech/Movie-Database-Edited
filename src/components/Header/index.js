import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const [name, setName] = useState('')
  const {onSearch} = props

  const onChangeSearchInput = event => setName(event.target.value)

  const onClickSearch = async () => {
    const apiKey = '0548e4bb91a761217ee280f89244cfa8'
    const options = {
      method: 'GET',
    }
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${name}&page=1`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachData => ({
        id: eachData.id,
        title: eachData.original_title,
        overview: eachData.overview,
        releasedDate: eachData.release_date,
        rating: eachData.vote_average,
        poster_path: eachData.poster_path,
      }))
      console.log(updatedData)
      onSearch(updatedData)
    }
  }

  return (
    <nav className="header-container">
      <Link to="/" className="link-style">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dd2v2zlbh/image/upload/e_background_removal/f_png/v1749730946/pngtree-movie-icon-design-png-image_2153114_wtuukh.jpg"
            alt="movie-logo"
            className="logo-image"
          />
          <h1 className="logo-title">movieDB</h1>
        </div>
      </Link>
      <div className="search-container">
        <button className="search-btn" type="button" onClick={onClickSearch}>
          Search
        </button>
        <input
          type="text-box"
          className="search-bar"
          onChange={onChangeSearchInput}
        />
      </div>
      <ul className="menu-container">
        <Link to="/" className="link-style">
          <li className="menu-item">Popular</li>
        </Link>
        <Link to="/top-rated" className="link-style">
          <li className="menu-item">Top Rated</li>
        </Link>
        <Link to="/upcoming" className="link-style">
          <li className="menu-item">Upcoming</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Header
