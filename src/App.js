import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Callback from './Callback';
import Playlists from './Playlists';
import Tracks from './Tracks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Nav, Row, Col, Card } from 'react-bootstrap';
import PlaylistFeature from './PlaylistFeature';

class SpotifyAnalytics extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      client_id: '32219331445e49c29fcc65491fe880ce',
      client_secret: '4e4abb4f65ea4a6ab674678bc1c39a04',
      client_id_base64: new Buffer('32219331445e49c29fcc65491fe880ce').toString('base64'),
      client_secret_base64: new Buffer('4e4abb4f65ea4a6ab674678bc1c39a04').toString('base64')
    }
  }

  render() {
    return (
      <div className="App">
        <a href={"https://accounts.spotify.com/authorize?client_id=" + this.state.client_id + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private"}>Auth</a>
        <Router>
          <Switch>
            <Route path='/callback' component={Callback} />
            <Route exact path='/playlist/:id' component={Tracks} />
            <Route exact path='/playlists' component={Playlists} />
            <Route exact path='/playlist-analytics' component={PlaylistFeature}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default SpotifyAnalytics;
