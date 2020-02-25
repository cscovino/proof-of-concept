import React from 'react';
import Button from '@material-ui/core/Button';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './index.css';

function ImageContainer(props) {
    const { images } = props;

    const reset = () => {
        props.resetImages()
    }

    return (
        <div className="images-div">
            <Button
                variant="contained"
                onClick={reset}
                style={{
                    backgroundColor: '#ffc901', 
                    width: '80vw',
                    marginTop: '2vw'
                }}
            >
                TRY AGAIN!
            </Button>
            {images.map(tile => (
                <GridListTile key={tile.path}>
                    <a href={`http://${tile.path}`} target="_blank"><img src={`http://${tile.path}`} alt={tile.name} className="image-tag" /></a>
                    <GridListTileBar title={tile.name} />
                </GridListTile>
            ))}
        </div>
    );
}

export default ImageContainer