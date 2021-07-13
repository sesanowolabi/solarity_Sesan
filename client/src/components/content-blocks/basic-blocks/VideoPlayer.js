import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        play: false,
        playerSize: this.props.playerSize
      }
      this.play = this.play.bind(this);
  };

  componentDidMount(){
    //console.log(this.props)
  }

  play(){
    this.setState({play: true});
  }

  render() {
    const data = this.props.data;
    const vimeoSrc = 'https://player.vimeo.com/video/' + data.videoLink + '?autoplay=1&loop=1&autopause=0';
    const youtubeSrc = 'https://www.youtube.com/embed/' + data.videoLink + '?autoplay=1&cc_load_policy=1';

    console.log(data)

    return (
      <div className={((this.state.playerSize === 'half-width') ? 'grid1of2 noGutter' : 'full-width stripe_6')}>
        <div className="watch-youtube-block">
          <div className="watch-vid-container watch-vid-preview" onClick={this.play} style={{backgroundImage: 'url('+ data.videoCoverPhoto[0].url +')'}}>
             <div className="player-content">
                <span className={"play-button " + ((this.state.play === true) ? 'is-hidden' : 'is-visible')}>
                </span>

                {(this.state.play === true)
                  ? <div className="embed-container">
                      {(data.playerType.value === 'vimeo')
                      ? <iframe title="frame1" src={vimeoSrc} allow="autoplay" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                      : <iframe title="frame2" src={youtubeSrc} frameborder='0' allowfullscreen autoPlay></iframe>
                      }
                    </div>
                  : ''
                }
              </div>
            </div>
        </div>
      </div>
    );
  }
};

VideoPlayer.defaultProps = {
  playerSize: 'default',
};

export default VideoPlayer;
