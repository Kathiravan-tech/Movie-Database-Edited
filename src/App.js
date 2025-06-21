import {Route, Switch} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import UpComingMovies from './components/UpComingMovies'
import TopRatedMovies from './components/TopRatedMovies'
import ViewDetails from './components/ViewDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={PopularMovies} />
    <Route exact path="/top-rated" component={TopRatedMovies} />
    <Route exact path="/upcoming" component={UpComingMovies} />
    <Route exact path="/details/:id" component={ViewDetails} />
  </Switch>
)

export default App
