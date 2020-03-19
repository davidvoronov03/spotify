import React from 'react';
import { Hint, Sunburst } from 'react-vis';
import Axios from 'axios';


const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    alignItems: 'center',
    padding: '5px'
};

const boxStyle = { height: '10px', width: '10px' };

var danceability_feats = []
var energy_feats = []
var speechiness_feats = []
var acousticness_feats = []
var instrumentalness_feats = []
var liveness_feats = []
var valence_feats = []

var bool = false
var danceability_sum = 0
var energy_sum = 0
var speechiness_sum = 0
var acousticness_sum = 0
var instrumentalness_sum = 0
var liveness_sum = 0
var valence_sum = 0

const clr = [
    '#19CDD7',
    '#DDB27C',
    '#88572C',
    '#FF991F',
    '#F15C17',
    '#223F9A',
    '#DA70BF',
    '#125C77',
    '#4DC19C',
    '#776E57',
    '#12939A',
    '#17B8BE',
    '#F6D18A',
    '#B7885E',
    '#FFCB99',
    '#F89570',
    '#829AE3',
    '#E79FD5',
    '#1E96BE',
    '#89DAC1',
    '#B3AD9E'
];


class PlaylistFeature extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            hoveredCell: undefined,
            //bool: true,
            sizeS: 1
        }

    }

    zoom() {
        if (this.state.hoveredCell !== undefined) {
            if (this.state.hoveredCell.title === "danceability" || this.state.hoveredCell.parent.data.title === "danceability") {
                //danceability_feats = [...danceability_feats, { title: t.track.name, color: this.color(index), size: (this.isZero(d.danceability)) }]
                energy_feats = []
                acousticness_feats = []
                valence_feats = []
                speechiness_feats = []
                liveness_feats = []
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "energy" || this.state.hoveredCell.parent.data.title === "energy") {
                danceability_feats = []
                //energy_feats = [...energy_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.energy)) }]
                acousticness_feats = []
                valence_feats = []
                speechiness_feats = []
                liveness_feats = []
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "acousticness" || this.state.hoveredCell.parent.data.title === "acousticness") {
                danceability_feats = []
                energy_feats = []
                //acousticness_feats = []
                valence_feats = []
                speechiness_feats = []
                liveness_feats = []
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "valence" || this.state.hoveredCell.parent.data.title === "valence") {
                danceability_feats = []
                energy_feats = []
                acousticness_feats = []
                //valence_feats = [...valence_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.valence)) }]
                speechiness_feats = []
                liveness_feats = []
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "speechiness" || this.state.hoveredCell.parent.data.title === "speechiness") {
                danceability_feats = []
                energy_feats = []
                acousticness_feats = []
                valence_feats = []
                //speechiness_feats = [...speechiness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.speechiness)) }]
                liveness_feats = []
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "liveness" || this.state.hoveredCell.parent.data.title === "liveness") {
                danceability_feats = []
                energy_feats = []
                acousticness_feats = []
                valence_feats = []
                speechiness_feats = []
                //liveness_feats = [...liveness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.liveness)) }]
                instrumentalness_feats = []
            }
            if (this.state.hoveredCell.title === "instrumentalness" || this.state.hoveredCell.parent.data.title === "instrumentalness") {
                danceability_feats = []
                energy_feats = []
                acousticness_feats = []
                valence_feats = []
                speechiness_feats = []
                liveness_feats = []
                //instrumentalness_feats = [...instrumentalness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.instrumentalness)) }]
            }
        }
    }

    buildValue(hoveredCell) {
        const { radius, angle, angle0 } = hoveredCell;
        const truedAngle = (angle + angle0) / 2;
        return {
            x: radius * Math.cos(truedAngle),
            y: radius * Math.sin(truedAngle)
        }
    }

    updateData(data, keyPath) {
        data.style = {
            ...data.style,
            fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1
        };

        return data;
    }

    isZero(value) {
        if (value === 0) {
            return 0.00000000000000000000000001
        }
        else return value

    }

    componentWillMount() {
        this.props.tracks.map(ids => {
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

                </div>
            )
        })
    }

    color = (index) => {
        return (clr[index])
    }
    //-----------------------------------------




    render() {

        if (this.props.feat !== undefined) {
            energy_sum = 0
            instrumentalness_sum = 0
            liveness_sum = 0
            speechiness_sum = 0
            acousticness_sum = 0
            valence_sum = 0
            danceability_sum = 0
            this.props.feat.map(p => {
                danceability_sum = danceability_sum + p.danceability
                energy_sum = energy_sum + p.energy
                speechiness_sum = speechiness_sum + p.speechiness
                acousticness_sum = acousticness_sum + p.acousticness
                instrumentalness_sum = instrumentalness_sum + p.instrumentalness
                liveness_sum = liveness_sum + p.liveness
                valence_sum = valence_sum + p.valence
                bool = true
            })


            if (bool === true && this.props.tracks !== undefined) {
                danceability_feats = []
                energy_feats = []
                speechiness_feats = []
                acousticness_feats = []
                instrumentalness_feats = []
                liveness_feats = []
                valence_feats = []
                this.props.feat.map((d, index) => {
                    this.props.tracks.map(t => {
                        var filter = this.props.feat.filter(f => d.id === t.track.id)[0]                //(d.danceability * this.state.sizeS)
                        if (filter !== undefined) {
                            danceability_feats = [...danceability_feats, { title: t.track.name, color: this.color(index), size: (this.isZero(d.danceability)) }]
                            energy_feats = [...energy_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.energy)) }]
                            acousticness_feats = [...acousticness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.acousticness)) }]
                            valence_feats = [...valence_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.valence)) }]
                            speechiness_feats = [...speechiness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.speechiness)) }]
                            liveness_feats = [...liveness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.liveness)) }]
                            instrumentalness_feats = [...instrumentalness_feats, { title: t.track.name, color: this.color(index * 2), size: (this.isZero(d.instrumentalness)) }]

                        }
                    })
                })
            }
            this.zoom()
        }
        return (
            <div>
                <h1>Playlist Features</h1>
                <Sunburst
                    animation={true}
                    onValueMouseOver={v => {
                        
                            this.setState({
                                hoveredCell: v
                                })
                                
                            }
                        }

                    onValueMouseOut={v => {
                        if(this.hoveredCell !== undefined){
                            if(v.parent === this.hoveredCell || v === this.hoveredCell.parent || v.parent === this.hoveredCell.parent){
                                console.log("match")
                            }else{
                                this.setState({
                                    hoveredCell: undefined
                                    })
                                    console.log("no match")
                                }}else{
                                this.setState({
                                    hoveredCell: undefined
                                    })
                                    console.log("no match")
                                }
                            }
                        }
    
                    hideRootNode
                    colorType="literal"
                    data={{
                        "title": "analytics",
                        "color": "WHITE",
                        "children": [
                            {
                                "title": "danceability",
                                "size": "1",

                                "children": danceability_feats

                            },
                            {
                                "title": "energy",
                                "color": "BLUE",
                                "size": "1",
                                "children": energy_feats
                            },
                            {
                                "title": "acousticness",
                                "color": "PURPLE",
                                "size": "1",
                                "children": acousticness_feats
                            },
                            {
                                "title": "liveness",
                                "color": "DARKBLUE",
                                "size": "1",
                                "children": liveness_feats
                            },
                            {
                                "title": "speechiness",
                                "color": "VIOLET",
                                "size": "1",
                                "children": speechiness_feats
                            },
                            {
                                "title": "valence",
                                "color": "GREEN",
                                "size": "1",
                                "children": valence_feats
                            },
                            {
                                "title": "instrumentalness",
                                "color": "BLACK",
                                "size": "1",
                                "children": instrumentalness_feats
                            }

                        ]


                    }}
                    getLabel={d => d.title}
                    getColor={d => d.color}
                    height={500}
                    width={550}
                >
                    {this.state.hoveredCell !== undefined ?
                        <Hint value={this.state.hoveredCell.title}>

                            <div style={tipStyle}>
                                <div style={{ ...boxStyle, background: "BLACK" }} />
                                {this.state.hoveredCell.title}
                            </div>
                        </Hint>
                        : <div></div>
                    }

                </Sunburst>

            </div >
        )
    }
}

export default PlaylistFeature;