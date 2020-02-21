import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { useDropzone } from 'react-dropzone';
import './index.css';

function InputImage(props) {
    const [data, setData] = useState({
        textUpload: 'Click or Drop your file',
        file: null,
        interpolation: 'Lanczos3',
        sizes: "400x300,160x120,120x120"
    });

    const sendImage = () => {
        props.loadImages(data)
    }

    const onDrop = useCallback(acceptedFiles => {
        let reader = new FileReader();
        reader.onload = ev => document.getElementById("preview").src = ev.target.result
        reader.readAsDataURL(acceptedFiles[0])
        setData({
            ...data,
            textUpload: "File: " + acceptedFiles[0].name,
            file: acceptedFiles[0]
        });
    },[]);

    const { getRootProps, getInputProps } = useDropzone({onDrop});

    return (
        <div className="input-div">
            <div className="file-div" {...getRootProps()}>
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
                    <img src="#" className="drag-file" alt="preview" id="preview" height="100%" />
                }
            </div>
            {/* <InterpolationSelect /> */}
            <Button
                variant="contained"
                onClick={sendImage}
                style={{
                    backgroundColor: '#ffc901', 
                    width: '80vw',
                    marginTop: '2vw'
                }}
            >
                DO IT!
            </Button>
        </div>
    )
}

export default InputImage