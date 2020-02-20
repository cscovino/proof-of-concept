import React from 'react';
import './index.css';

function Header(props) {
  return (
    <header className="App-header">
        {props.icon ? props.icon : null}
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>
    </header>
  );
}

export default Header