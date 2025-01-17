import React, { Component } from "react";
import M from "materialize-css";
import { Link } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";

class Sidenav extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };

    M.Sidenav.init(this.Sidenav);

  }
  render() {
    return (
      <>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav"
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
        >
            <li>
                <div>
                    <a
                    href='/' 
                    className="brand-logo black-text"
                    style={{position:'relative', height: '2rem', display: 'flex', alignItems: 'center', margin:'1rem 0rem'}}
                    >
                        <img src='/stool-squad.png' style={{height: '100%', width: 'auto'}}></img> 
                        Stool Story
                    </a>
                </div>
            </li>
            {this.props.children}
            <li key='4'><i className='exit-menu material-icons large sidenav-close'>close</i></li>
        </ul>
        <div className="hide-on-small-only">
          <i id='hamburger-menu' data-target='slide-out' className="sidenav-trigger material-icons">menu</i>
        </div>
      </>
    );
  }
}

export default Sidenav;