import React from 'react';
import { connect } from 'react-redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia'
import './index.css';

const data = [
    {
        title: "HOLA1",
        url:"https://miro.medium.com/max/3150/1*yh90bW8jL4f8pOTZTvbzqw.png"
    },{
        title: "HOLA2",
        url:"https://miro.medium.com/max/2800/0*Nh9g_S_eXyjgFY6E.png"
    },{
        title: "HOLA3",
        url:"https://miro.medium.com/max/3200/1*8bPiDNL1K1ZdK9O_T5IVKw.png"
    }
]

const ImageCard = (props) => {
    return (
        <div className="card">
            <div className="image-title">{props.title}</div>
            <a href={props.url}><img className="image-card" src={props.url} /></a>
        </div>
    );
}

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
          <div className="images-div">
            {data.map((img) => <ImageCard title={img.title} url={img.url} />)}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
