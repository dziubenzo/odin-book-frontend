import PropTypes from 'prop-types';
import {
  StyledLinkInput,
  StyledVideoEditor,
} from '../styles/NewPostPage.styled';
import { useState } from 'react';

function VideoEditor({ videoURL, setVideoURL }) {
  const [inputValue, setInputValue] = useState('');

  function handleYouTubeLink(link) {
    setInputValue(link);
    const youTubeRegEx = new RegExp(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    );
    // Make sure the link is valid
    if (link.match(youTubeRegEx)) {
      // Convert the link to embed format
      if (link.startsWith('https://youtu.be/')) {
        const firstSplit = link.split('/');
        const secondSplit = firstSplit[3].split('?');
        return setVideoURL(`https://www.youtube.com/embed/${secondSplit[0]}`);
      }
      const firstSplit = link.split('watch?v=');
      const secondSplit = firstSplit[firstSplit.length - 1].split('&');
      return setVideoURL(`https://www.youtube.com/embed/${secondSplit[0]}`);
    }
    return setVideoURL('');
  }

  return (
    <StyledVideoEditor>
      <StyledLinkInput>
        <label htmlFor="video_url">YouTube URL:</label>
        <input
          type="url"
          className={!videoURL ? 'invalid-link' : undefined}
          name="video_url"
          id="video_url"
          placeholder={'Only YouTube videos are supported'}
          title={'Only YouTube videos are supported'}
          onChange={(event) => {
            handleYouTubeLink(event.target.value);
          }}
          value={inputValue}
        />
      </StyledLinkInput>
      {videoURL && (
        <div className="video-preview-wrapper">
          <h2>Video Preview:</h2>
          <iframe
            src={videoURL}
            title="YouTube video player"
            frameBorder={'0'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </StyledVideoEditor>
  );
}

VideoEditor.propTypes = {
  videoURL: PropTypes.string,
  setVideoURL: PropTypes.func,
};

export default VideoEditor;
