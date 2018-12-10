import React, { Component } from 'react';
import './nginep.css';

export default class nginep extends Component {


render() {
    const judul = `${this.props.datanginep.nama} - Rp. ${this.props.datanginep.harga} rb`
    const style = {
        backgroundImage: `url('${this.props.datanginep.fotoUrl}')`
    };


    return (
        <div className="homestay">
            <div className="homestay-foto" style={style}></div>
            <div className="homestay-judul">{judul}</div>
        </div>
        )
    }
}
