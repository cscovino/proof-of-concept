import React from 'react';
import { connect } from 'react-redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { loadImages } from '../../actions';
import Lottie from 'lottie-react-web';
import working from '../../assets/working.json';
import './index.css';

function App(props) {
  const { images, isLoading, error } = props;

  return (
    <div className="App">
      <header className="App-header">
        <PanoramaIcon style={{color: '#ffc901', marginRight: 10}} />
        <div className="title">Thumbnail</div>
        <div className="subtitle">Generator</div>
      </header>
      <div className="body-div">
          <div className="animation">
            <Lottie options={{animationData: working}} />
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ images, isLoading, error }) => ({
  images,
  isLoading,
  error
})

const mapDispatchToProps = (dispatch) => ({
  loadImages: () => dispatch(loadImages())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
