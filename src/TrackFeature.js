import React from 'react'
import { Sunburst } from 'react-vis';

class TrackFeature extends React.Component {

    render() {

        return (
            <div>
                <Sunburst
                    animation
                    className="basic-sunburst-example"
                    hideRootNode
                    colorType="literal"
                    data={{
                        "title": "analytics",
                        "color": "#12Z",
                        "children": [
                            {
                                "title": "",
                                "color": "12Z",
                                "size": "",
                                "children": [
                                    { "title": "danceability", "color": "#32969A", "size": this.props.track.danceability },
                                    { "title": "energy", "color": "#12934C", "size": this.props.track.energy },
                                    { "title": "speechiness", "color": "#19729B", "size": this.props.track.speechiness },
                                    { "title": "acousticness", "color": "#18439A", "size": this.props.track.acousticness },
                                    { "title": "instrumentalness", "color": "#12437A", "size": this.props.track.instrumentalness },
                                    { "title": "liveness", "color": "#88729D", "size": this.props.track.liveness },
                                    { "title": "valence", "color": "#14759E", "size": this.props.track.valence }
                                ]
                            }/*,
                            {
                                "title": "cluster",
                                "color": "12Z",
                                "size": "",
                                "children": [
                                    { "title": "danceability", "color": "#32969A", "size": this.props.track.danceability },
                                    { "title": "energy", "color": "#12934C", "size": this.props.track.energy },
                                    { "title": "speechiness", "color": "#19729B", "size": this.props.track.speechiness },
                                    { "title": "acousticness", "color": "#18439A", "size": this.props.track.acousticness },
                                    { "title": "instrumentalness", "color": "#12437A", "size": this.props.track.instrumentalness },
                                    { "title": "liveness", "color": "#88729D", "size": this.props.track.liveness },
                                    { "title": "valence", "color": "#14759E", "size": this.props.track.valence }
                                ]
                            },
                            {
                                "title": "cluster",
                                "color": "12Z",
                                "size": "",
                                "children": [
                                    { "title": "danceability", "color": "#32969A", "size": this.props.track.danceability },
                                    { "title": "energy", "color": "#12934C", "size": this.props.track.energy },
                                    { "title": "speechiness", "color": "#19729B", "size": this.props.track.speechiness },
                                    { "title": "acousticness", "color": "#18439A", "size": this.props.track.acousticness },
                                    { "title": "instrumentalness", "color": "#12437A", "size": this.props.track.instrumentalness },
                                    { "title": "liveness", "color": "#88729D", "size": this.props.track.liveness },
                                    { "title": "valence", "color": "#14759E", "size": this.props.track.valence }
                                ]
                            }*/]
                    }}
                    getLabel={d => d.title}
                    height={300}
                    width={350} />
            </div>
        )
    }

}

export default TrackFeature