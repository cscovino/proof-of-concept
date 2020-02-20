import React from 'react';
import { connect } from 'react-redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { loadImages, resetImages } from '../../actions';
import Header from '../../components/Header';
import InputImage from '../../components/InputImage';
import LoadingAnim from '../../components/LoadingAnim';
import ImagesContainer from '../../components/ImagesContainer'
import './index.css';
import AlertDialog from '../../components/AlertDialog';

function App(props) {
  return (
    <div className="App">
      <Header 
        title={"Thumbnail"} 
        subtitle={"Generator"} 
        icon={
          <PanoramaIcon style={{color: '#ffc901', marginRight: 10}} />
        } 
      />
      <AlertDialog 
        open={props.error!==null} 
        message={props.error!==null?props.error.message:""} 
        code={props.error!==null?props.error.code:404} />
      <div className="body-div">
        {
          props.isLoading 
          ?
          <LoadingAnim />
          :
          props.images.length !== 0
          ?
          <ImagesContainer images={props.images} resetImages={props.resetImages} />
          :
          <InputImage loadImages={props.loadImages} />
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    images: state.imagesReducer.images,
    isLoading: state.imagesReducer.isLoading,
    error: state.imagesReducer.error
  }
};

const mapDispatchToProps = (dispatch) => ({
  loadImages: (payload) => dispatch(loadImages(payload)),
  resetImages: () => dispatch(resetImages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
