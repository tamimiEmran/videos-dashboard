import PropTypes from 'prop-types';
import './VideoPlayer.css';

const VideoPlayer = ({ src, poster, title }) => {
  if (!src) {
    return (
      <div className="video-player video-player--empty">
        <p>Select a video to begin reviewing.</p>
      </div>
    );
  }

  return (
    <div className="video-player">
      <video controls poster={poster} preload="metadata">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title ? <p className="video-player__title">Currently playing: {title}</p> : null}
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  title: PropTypes.string
};

VideoPlayer.defaultProps = {
  src: undefined,
  poster: undefined,
  title: undefined
};

export default VideoPlayer;
