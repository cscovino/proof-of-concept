import React, { useState } from 'react';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import './App.css';

function App() {
  const [textUpload, setTextUpload] = useState('Click or Drop your file');

  return (
    <div className="App">
      <header className="App-header">
        <PanoramaIcon style={{color: '#ffc901', marginRight: 10}} />
        <div className="title">Thumbnail</div>
        <div className="subtitle">Generator</div>
      </header>
      <div className="body-div">
        <div className="file-div" onDragEnter={ev => {
          console.log(ev.target)
        }}>
          <input
            accept="image/*"
            style={{width:'80vw',height:'40vh'}}
            id="contained-button-file"
            type="file"
            onChange={ev => {
              setTextUpload("File: " + ev.target.files[0].name)
            }}
          />
          <label htmlFor="contained-button-file">
            <div className="drag-file">
              <CloudUploadOutlinedIcon style={{color: '#ffc901', fontSize: '15vh'}} />
              <div className="text-file">
                {textUpload}
              </div>
            </div>
          </label>
        </div>
        <Button
          variant="contained"
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

export default App;
