import Axios from 'axios';
import React from 'react';
import './App.css';
import TrackFeature from './TrackFeature';
import PlaylistFeature from './PlaylistFeature';
import { Tabs, Tab, Container, Row, Col, Card } from 'react-bootstrap';

//import AudioFeatures from './AudioFeatures';


class Tracks extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            feat: [],
            tracks: []
        }
    }

    onClick() {
        return (
            <PlaylistFeature feat={this.state.feat} tracks={this.state.tracks} />
        )
    }
    componentDidMount() {
        Axios.get('https://api.spotify.com/v1/playlists/' + this.state.id + '/tracks',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then((response) => {
            this.setState({
                tracks: response.data.items
            }, function () {
                this.AudioFeatures();
            })
        }, (error) => {
        });

    }


    AudioFeatures() {
        this.state.tracks.map(ids => {
            Axios.get('https://api.spotify.com/v1/audio-features/' + ids.track.id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            ).then((response) => {
                this.setState({
                    features: response.data
                }, function () {
                    this.setState((prevState) => ({
                        feat: [...prevState.feat, this.state.features]
                    }))
                })
            }, (error) => {
                console.error(error)
            });
            return (
                <div>
                    <p>{ids.track.name} </p><br />
                    <img src={ids.track.album.images[0].url} alt={ids.track.name} />
                </div>
            )
        })
    }


    render() {

        var tracks = this.state.tracks.map(t => {

            var feat = this.state.feat.filter(f => f.id === t.track.id)[0]

            if (feat !== undefined) {
                return (
                    <Card>
                        <Row className="p-3">
                            <Col>
                                <div> <Card.Title>{t.track.name} </Card.Title><br />  </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <img src={t.track.album.images[0].url} alt={t.track.name} />
                            </Col>
                            <Col>
                                <TrackFeature key={t.track.id} track={feat} />
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <Col>
                                <div>danceability: {feat.danceability}</div>
                                <div>energy: {feat.energy}</div>
                                <div>key: {feat.key}</div>
                                <div>loudness: {feat.loudness}</div>
                                <div>mode: {feat.mode}</div>
                                <div>speechiness: {feat.speechiness}</div>
                                <div>acousticness: {feat.acousticness}</div>
                                <div>instrumentalness: {feat.instrumentalness}</div>
                                <div>liveness: {feat.liveness}</div>
                                <div>valence: {feat.valence}</div>
                                <div>tempo: {feat.tempo}</div>
                                <div>type: {feat.type}</div>
                                <div>id: {feat.id}</div>
                                <div>uri: {feat.uri}</div>
                                <div>track_href: {feat.track_href}</div>
                                <div>analysis_url: {feat.analysis_url}</div>
                                <div>duration_ms: {feat.duration_ms}</div>
                                <div>time_signature: {feat.time_signature}</div>
                            </Col>
                        </Row>
                    </Card>
                )
            }
            return (<div>No audio feat</div>)
        })

        return (
            <Container>
                <Tabs defaultActiveKey="tracks">
                    <Tab eventKey="tracks" title="Tracks" >
                        {tracks}
                    </Tab>
                    <Tab onClick={this.onClick()} eventKey="playlist" title="Playlist" >
                        <PlaylistFeature feat={this.state.feat} tracks={this.state.tracks} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default Tracks;