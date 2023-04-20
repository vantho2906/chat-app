import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropedImage';
import styled from 'styled-components';

const aspectRatios = [{ value: 1 / 1, text: '1/1' }];

function ImageCropDialog({
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  resetImage,
}) {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = crop => {
    setCrop(crop);
  };

  const onZoomChange = zoom => {
    setZoom(zoom);
  };

  const onAspectChange = e => {
    const value = e.target.value;
    const ratio = aspectRatios.find(ratio => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
  };

  const onResetImage = () => {
    resetImage();
  };

  return (
    <Container>
      <div>
        <div className="backdrop"></div>
        <div className="crop-container">
          <Cropper
            image={imageUrl}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="controls">
          <div className="controls-upper-area">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onInput={e => {
                onZoomChange(e.target.value);
              }}
              className="slider"
            ></input>
          </div>
          <div className="button-area">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onResetImage}>Reset</button>
            <button onClick={onCrop}>Crop</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .imageCard {
    text-align: center;
  }

  .imageCard img {
    width: 100px;
  }

  .backdrop {
    position: fixed;
    background-color: black;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .reactEasyCrop_CropArea {
    border-radius: 50%;
  }

  .crop-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    border-radius: 50%;
  }

  .controls {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 80px;
  }

  .controls-upper-area {
    text-align: center;
  }

  .slider {
    width: 50%;
  }

  input {
    color: green;
  }

  .button-area {
    text-align: center;
    margin-top: 20px;
  }
  button {
    margin-left: 10px;
    margin-right: 10px;
    background-color: black;
    color: white;
    border: 2px solid rgb(0, 91, 150);
    font-size: 20px;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
  }
`;

export default ImageCropDialog;
