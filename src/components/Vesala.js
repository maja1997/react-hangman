import React from 'react';

const Vesala = (props) => {
    //props.img dobijamo kao prop u hangman.js '<Vesala img={this.props.slike[this.state.greske]}/>'
    return (
        <div className="vesala-container">
            <img src={props.img} alt="slika vesala"/>
        </div>
    )
}

export default Vesala;