import React, { Component } from 'react'
import './marker.css'

export default class marker extends Component {
  render() {
    let classes = 'marker';
    if (this.props.selected) {
        classes += ' selected';
    }

    return (
      <div>
          <div className={classes}>{this.props.text}</div>
      </div>
    )
  }
}
