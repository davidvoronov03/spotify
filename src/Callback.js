import Axios from 'axios';
import qs from 'querystring';
import React from 'react';
import { Redirect } from "react-router-dom";

class Callback extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            code: this.props.location.search.substring(6, this.props.location.search.length),
            client_id: '32219331445e49c29fcc65491fe880ce',
            client_secret: '4e4abb4f65ea4a6ab674678bc1c39a04'
        }
        localStorage.setItem("auth_code", this.state.code)
        this.getToken();

    }

    getToken() {

        const body = {
            code: localStorage.getItem("auth_code"),
            redirect_uri: 'http://localhost:3000/callback',
            grant_type: 'authorization_code'
        }

        

        Axios.post('https://accounts.spotify.com/api/token',
            qs.stringify(body), {
            headers: {
                "Authorization": ("Basic " + new Buffer(this.state.client_id + ":" + this.state.client_secret).toString("base64")),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        )
            .then((response) => {
                console.log(response);
                this.setState({
                    refresh_token: response.data.refresh_token,
                    accessToken: response.data.access_token
                })
                localStorage.setItem("accessToken", this.state.accessToken)
                //this.refreshToken();
                //this.request();


            }, (error) => {
                console.log(error);
            });



    }
    /*
    refreshToken() {

        console.log('AUTH')
        console.log(this.state.refresh_token)

        const body = {
            grant_type: 'refresh_token',
            refresh_token: this.state.refresh_token
        }

        console.log(qs.stringify(body))

        Axios.post('https://accounts.spotify.com/api/token',
            qs.stringify(body), {
            headers: {
                "Authorization": ("Basic " + new Buffer(this.state.client_id + ":" + this.state.client_secret).toString("base64")),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        )
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
       

    }
    */
  /* request() {
    console.log('request')
    console.log(localStorage.getItem("accessToken"))

  



    Axios.get('https://api.spotify.com/v1/me',
        {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    )
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });

    }

    render() {
        return (
            <Router>
            <div>
            <h1>Test</h1>
            </div>
            </Router>
        )
    } */

    render(){
        return(
            <div>
                {this.state.accessToken !== undefined ? <Redirect to = "/playlists" />: <div>loading...</div>}
            </div>
        )
    }

}

export default Callback