import Axios from 'axios';
import React from 'react';
import './App.css';
import { Redirect } from "react-router-dom";

class Playlists extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            bool: false
        }

        this.playlists();
    }

    playlists() {
        console.log('request')
        console.log(localStorage.getItem("accessToken"))

        Axios.get('https://api.spotify.com/v1/me/playlists',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then((response) => {
            console.log(response);
            this.setState({
                playlists: response.data.items
            });
        }, (error) => {
            console.log(error);
            
                this.playlists();
         
        });

    }
    render() {
        if (this.state.playlists !== undefined) {
            var playlists = this.state.playlists.map(p => {
                return (
                    <div>
                        <p><a href={"/playlist/" + p.id}>{p.name}</a></p><br />
                        <img src={p.images[0].url} alt={p.name} />
                    </div>
                )
            })
        } else { console.log("map") }
        return (
            <div>
                {playlists}
            </div>
        )
    }

}

export default Playlists;