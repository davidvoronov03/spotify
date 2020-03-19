import Axios from 'axios';
import React from 'react';
import './App.css';

class AudioFeatures extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props
        }
        this.tracks();
        this.AudioFeatures();
    }
    tracks() {
        console.log('request')
        console.log(localStorage.getItem("accessToken"))

        Axios.get('https://api.spotify.com/v1/playlists/' + this.state.id + '/tracks',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then((response) => {
            console.log(response);
            this.setState({
                tracks: response.data.items
            })
        }, (error) => {
            console.log(error);
        });
    }

    AudioFeatures() {
        Axios.get('https://api.spotify.com/v1/audio-features/tracks/' + this.state.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then((response) => {
            console.log(response);
            this.setState({
                tracks: response.data.items
            })
        }, (error) => {
            console.log(error);
        });
    }
    render() {
        if (this.state.tracks !== undefined) {
            var tracks = this.state.tracks.map(t => {

                return (


                    <div>

                        <p>{t.track.name} </p><br />
                        <img src={t.track.album.images[0].url} alt={t.track.name} />
                    </div>


                )
            })
        }
        return (
            <div>
                {tracks}
            </div>
        )
    }
}

export default AudioFeatures;