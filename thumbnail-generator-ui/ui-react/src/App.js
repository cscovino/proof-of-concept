import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { useDropzone } from 'react-dropzone';
import { loadImages } from './actions';
import './App.css';

function App(props) {
  const { images, isLoading, error } = props;
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let reader = new FileReader();
    reader.onload = ev => document.getElementById("preview").src = ev.target.result
    reader.readAsDataURL(acceptedFiles[0])
    setData({
      textUpload: "File: " + acceptedFiles[0].name,
      file: acceptedFiles[0]
    });
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const [data, setData] = useState({
    textUpload: 'Click or Drop your file',
    file: null
  });

  const sendImage = () => {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <PanoramaIcon style={{color: '#ffc901', marginRight: 10}} />
        <div className="title">Thumbnail</div>
        <div className="subtitle">Generator</div>
      </header>
      <div className="body-div">
        <div className="file-div">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              data.file === null ?
              <label htmlFor="contained-button-file">
                <div className="drag-file">
                  <CloudUploadOutlinedIcon style={{color: '#ffc901', fontSize: '15vh'}} />
                  <div className="text-file">
                    {data.textUpload}
                  </div>
                </div>
              </label>
              :
              <img src="#" id="preview" />
            }
          </div>
        </div>
        <Button
          variant="contained"
          onClick={sendImage}
          style={{
            backgroundColor: '#ffc901', 
            width: '80vw',
            marginTop: '5vw'
          }}
        >
          DO IT!
        </Button>
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
