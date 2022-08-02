import React from "react";
import Dropzone from "react-dropzone";
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { BsFiles } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import './TakingImages.css';

export default function TakingImages(props) {
  return (
    <div className="d-flex flex-column align-items-center birthday-row">
      <div className="d-flex flex-row align-items-center">
        <Dropzone
          onDrop={(acceptedFiles) => props.uploadImage(acceptedFiles)}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <div className="container">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button type="button" className="btn btn-warning">
                  <BsFiles />
                </button>
              </div>
            </div>
          )}
        </Dropzone>
        <p className="text-danger">OR</p>
        <button
          type="button"
          className="btn btn-warning ms-3"
          onClick={props.openCamera}
        >
          <AiFillCamera />
        </button>
        {props.showCamera && (
          <div>
            <Camera onTakePhoto={(dataUri) => props.handleTakePhoto(dataUri)} />
            <button
              className="btn btn-danger"
              onClick={props.shutDownCamera}
              type="button"
            >
              close
            </button>
          </div>
        )}
      </div>
      {props.errors.profilePicture && (
        <p className="text-danger">{props.errors.profilePicture}</p>
      )}
    </div>
  );
}
