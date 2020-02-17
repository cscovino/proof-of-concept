import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { useDropzone } from 'react-dropzone';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { loadImages } from '../../actions';
import './index.css';

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
    file: null,
    interpolation: 'Lanczos3'
  });

  const sendImage = () => {
    loadImages({file: data.file, sizes: "", interpolation: ""})
  }

  const handleChange = event => {
    setData({interpolation: event.target.value});
  };

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
              <img src="#" className="drag-file" id="preview" height="100%" />
            }
          </div>
        </div>
        <div>
          <FormControl className="form-control">
            <InputLabel id="demo-controlled-open-select-label">Interpolation</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={data.interpolation}
              onChange={handleChange}
            >
              <MenuItem value="NearestNeighbor">NearestNeighbor</MenuItem>
              <MenuItem value="Bilinear">Bilinear</MenuItem>
              <MenuItem value="Bicubic">Bicubic</MenuItem>
              <MenuItem value="MitchellNetravali">MitchellNetravali</MenuItem>
              <MenuItem value="Lanczos2">Lanczos2</MenuItem>
              <MenuItem value="Lanczos3">Lanczos3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={sendImage}
            style={{
              backgroundColor: '#ffc901', 
              width: '60vw',
              marginTop: '5vw'
            }}
          >
            DO IT!
          </Button>
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
