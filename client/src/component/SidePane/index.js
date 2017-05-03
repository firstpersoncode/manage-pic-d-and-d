import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchImages,
  uploadImageRequest,
  deleteImageList
} from './actions';

// actions for update Canvas's state
import {
  addImageToCanvas as addImage,
  addTextToCanvas
} from '../Canvas/actions';

class SidePane extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      preview: null,
      inputText: false,
      handleAssets: false,
      previewAsset: null,
      bigPreview: null,
    };
  }

  // fetch image from server
  componentWillMount() {
    if (!this.props.images.length) {
      this.props.dispatch(fetchImages());
    }
  }

  // form submit handler
  // send image data to server
  // remove preview
  uploadImages(e) {
    e.preventDefault();
    if (this.state.file) {
      this.props.dispatch(uploadImageRequest(this.state.file));
      this.setState({ preview: null });
    }
  }

  // input file handler
  // grab data from input field
  // set preview
  handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file,
        preview: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  // add image canvas handler
  // dispatch Canvas reducer, send image object to Canvas reducer
  addImageToCanvas(e) {
    const image = e.target.attributes.src.value;
    this.props.dispatch(addImage({id: Date.now(), image}))
  }

  // add text to canvas
  // dispatch Canvas and send text object to Canvas reducer
  addText(e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
    this.props.dispatch(addTextToCanvas({id: Date.now(), text}));
    this.setState({ inputText: false }) // remove text input mode
  }

  // button to text input mode handler
  // auto focus on text input mode
  handleText() {
    this.setState({ inputText: true }, () => {
      setTimeout(() => document.getElementById("text").focus(), 500);
    });
  }


  // Handle asset Manager
  // grab source file
  // show big previewAsset
  // delete image in server and dispatch store
  handleAssets() {
    this.setState({ handleAssets: !this.state.handleAssets });
    this.setState({ previewAsset: null, bigPreview: null })
  }
  grabImgFileName(e) {
    const sourceImg = e.target.attributes.src.value;
    this.setState({ previewAsset: sourceImg })
  }
  bigPreview() {
    this.setState({ bigPreview: !this.state.bigPreview });
  }
  handleDeleteImage() {
    this.props.dispatch(deleteImageList(this.state.previewAsset));
    this.setState({ previewAsset: null });
  }

  render() {
    console.log(this.props)
    return (
      <div class="sidepane col-sm-12 col-md-4 col-lg-4">
        {this.state.handleAssets ? (
          <div>
            <div class="asset-manager">
              <span class="asset-manager-close" onClick={this.handleAssets.bind(this)}>X</span>
              Assets Manager
              <ul>
                {this.props.images.map((image, i) => { // images from server, stored in reducer
                  return (
                    <li key={i}><img src={image} onClick={this.grabImgFileName.bind(this)} /></li>
                  )
                })}
              </ul>
              <div class="preview-manager">
                {this.state.previewAsset ? (
                  <div class="row">
                    <div class="col-sm-5">
                      <button class="btn btn-primary" onClick={this.bigPreview.bind(this)}>Preview</button>
                      <button class="btn btn-primary" onClick={this.handleDeleteImage.bind(this)}>Delete</button>
                    </div>
                    <div class="col-sm-7">
                      <img src={this.state.previewAsset} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {this.state.bigPreview ? (
              <div class="big-preview">
                <span class="big-preview-close" onClick={this.bigPreview.bind(this)}>X</span>
                <img src={this.state.previewAsset} />
              </div>
            ) : null}
            <div class="overlay"></div>
          </div>
        ) : null}
        <Form uploadImages={this.uploadImages.bind(this)} handleUpload={this.handleUpload.bind(this)} preview={this.state.preview} />
        <hr />
        <Assets
          addText={this.addText.bind(this)}
          handleText={this.handleText.bind(this)}
          inputText={this.state.inputText}
          addImageToCanvas={this.addImageToCanvas.bind(this)}
          images={this.props.images}
          handleAssets={this.handleAssets.bind(this)} />
      </div>
    );
  }
}

// FORM widget
const Form = (props) => {
  return (
    <div class="form">
      <h3>Form</h3>
        <form onSubmit={props.uploadImages}>
          <input type="file" onChange={props.handleUpload} class="form-control" placeholder="Upload Your Images" name="upload" />
          {props.preview && (
            <span class="preview-img">
              <img src={props.preview} />
            </span>
          )}
          <button id="submit" class="btn btn-primary">upload</button>
        </form>
    </div>
  );
};


// ASSEYS widget
const Assets = (props) => {
  return (
    <div class="assets">
      <h3>Assets</h3>

      <div class="text">
          <h4>Text</h4>
          {props.inputText ? ( // on input text mode, input text will rendered, otherwise, the add text button
            <form onSubmit={props.addText}>
              <input type="text" id="text" placeholder="Add Text ..." />
            </form>
          ) : (
            <button id="addText" onClick={props.handleText} class="btn btn-primary">Add Text</button>
          )}
      </div>

      <div class="image">
          <h4>Images</h4>
          <ul class="list-unstyled">
            {props.images.map((image, i) => { // images from server, stored in reducer
              return (
                <li id={`item-image-${i}`} key={i}><img src={image} onClick={props.addImageToCanvas} class="img-rounded" /></li>
              )
            })}
          </ul>
          <button onClick={props.handleAssets} class="btn btn-primary">Manage assets</button>
      </div>
    </div>
  );
};

export default connect((store) => {
  return {
    images: store.SidePaneState.images
  }
})(SidePane);
