import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable'; // React component for enabling touch and drag

import {
  imageCanvasState,
  textCanvasState,
  deleteImage,
  deleteText
} from './actions';

class Canvas extends Component {

  // fetch Canvas state from server
  componentWillMount() {
    if (!this.props.images.length) {
      this.props.dispatch(imageCanvasState())
    }
    if (!this.props.texts.length) {
      this.props.dispatch(textCanvasState())
    }
  }


  // delete image and text from canvas
  handleStop(e, data) {
    const isImage = e.target.attributes.src;
    // mouse event handler, grab id of object on stop dragging item
    const snapToBottom = document.getElementById('block').clientHeight - 350;

    // check if the object is on the bottom of Canvas where bin placed
    // if true, send object's id to server
    // update Canvas state in server with deleted object
    if (data.y >= snapToBottom) {
      if (isImage) {
        this.props.dispatch(deleteImage({ id: e.target.id }))
        document.getElementById('bin').className="bin";
      } else {
        this.props.dispatch(deleteText({ id: e.target.id }))
        document.getElementById('bin').className="bin";
      }
    }
  }


  // handler for make bin not transparent when the object is on the bin's position
  handleDrag(e, data) {
    let snapToBottom = document.getElementById('block').clientHeight - 350;
    if (data.y >= snapToBottom) {
      document.getElementById('bin').className="bin on";
    } else {
      document.getElementById('bin').className="bin";
    }
  }

  render() {
    return (
      <div class="canvas col-sm-12 col-md-8 col-lg-8">
        <div id="block" class="block">
          <img id="bin" src="javascripts/trash.png" class="bin" />
            {this.props.images.length ? this.props.images.map((image, i) => { // render images on canvas
              return (
                <Draggable
                  key={i}
                  bounds="parent"
                  onDrag={this.handleDrag.bind(this)}
                  onStop={this.handleStop.bind(this)}>
                  <img id={image.id} src={image.image} />
                </Draggable>
              )
            }) : null}

            {this.props.texts.length ? this.props.texts.map((text, i) => { // render texts on canvas
              return (
                <Draggable
                  key={i}
                  bounds="parent"
                  onDrag={this.handleDrag.bind(this)}
                  onStop={this.handleStop.bind(this)}>
                  <div class="text-oncanvas" id={text.id}>{text.text}</div>
                </Draggable>
              )
            }) : null}
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    images: store.CanvasState.images,
    texts: store.CanvasState.texts
  }
})(Canvas);
