import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faImage,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { avatarRoute } from '../utils/APIRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageCropDialog from '../components/ImageCropDialog';
import { useDispatch, useSelector } from 'react-redux';

function SetAvatar() {
  const navigate = useNavigate();
  const [avatarName, setAvatarName] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarImageCrop, setAvatarImageCrop] = useState(null);
  const [file, setFile] = useState(null);
  const [selecteImg, setSelecteImg] = useState(false);
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleSelectImg = () => {
    setSelecteImg(true);
  };

  const onCancel = () => {
    setSelecteImg(false);
  };

  const resetImage = () => {
    setCroppedImageFor();
  };

  const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
    setAvatarImageCrop({
      imageUrl: croppedImageUrl ? croppedImageUrl : avatarImage,
      crop: crop,
      zoom: zoom,
      aspect: aspect,
    });
    handleImageCrop(croppedImageUrl);
    setSelecteImg(false);
  };

  const handleImageCrop = url => {
    const toDataURL = url =>
      fetch(url)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    toDataURL(url).then(dataUrl => {
      var fileData = dataURLtoFile(dataUrl, 'imageName.jpg');
      // console.log(fileData);
      setFile(fileData);
    });
  };

  const handleChange = e => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    var reader = new FileReader();
    reader.onloadend = function () {
      setAvatarImage(reader.result);
      setAvatarImageCrop({ imageUrl: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (file) {
      const avatar = new FormData();
      avatar.append('avatar', file);
      avatar.append('username', auth.username);
      const data = await axios.post(avatarRoute, avatar);
      dispatch({
        type: 'AUTH',
        payload: { ...auth, avatar: data.data.data.avatar },
      });
      if (data.status === 200) {
        navigate('/');
      } else {
      }
    } else {
      toast.error('Please set up your avatar', toastOptions);
    }
  };

  return (
    <>
      {selecteImg && (
        <ImageCropDialog
          imageUrl={avatarImage}
          cropInit={avatarImageCrop?.crop}
          zoomInit={avatarImageCrop?.zoom}
          aspectInit={avatarImageCrop?.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      )}
      {!selecteImg && (
        <FormContainer>
          <form
            encType="multipart/form-data"
            action="/upload"
            method="post"
            onSubmit={e => handleSubmit(e)}
          >
            <div onClick={() => navigate('/')} className="back-btn">
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </div>

            <div className="brand">
              <h1>Set Avatar</h1>
            </div>
            <div className="input-file">
              <label htmlFor="file">
                <FontAwesomeIcon icon={faImage} size="lg" />
                <p>{avatarName ? `File: ${avatarName}` : 'Add an avatar'}</p>
              </label>
              <input
                type="file"
                id="file"
                // name="avatar"
                onChange={e => {
                  setAvatarName(e.target.files[0].name);
                  handleChange(e);
                }}
              />

              {avatarName && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="1x"
                  id="close-icon"
                  onClick={() => {
                    setAvatarName('');
                    setAvatarImage(null);
                    setAvatarImageCrop(null);
                  }}
                />
              )}
            </div>

            <img
              onClick={() => {
                handleSelectImg();
              }}
              src={avatarImageCrop?.imageUrl}
              alt=""
            />
            <button
              type="submit"
              className="rounded hover:bg-opacity-95 bg-[#63a09e] text-white font-normal"
            >
              Confirm
            </button>
          </form>
        </FormContainer>
      )}
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  witdh: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to bottom left, #79c7c5 40%, #f9fbff 100%);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #777777;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: rgba(161, 226, 217, 0.5);
    box-shadow: -5px 5px 10px rgb(119 119 119 / 50%);
    border-radius: 1rem;
    padding: 2rem 5rem;
    align-items: center;
    position: relative;
    .back-btn {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      background: transparent;
      box-shadow: -2px 2px 5px rgb(119 119 119 / 50%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      top: 0;
      left: 0;
      margin: 1rem 0 0 1rem;
    }
    .back-btn:hover {
      opacity: 0.6;
      cursor: pointer;
    }
    img {
      width: 10rem;
      height: 10rem;
      object-fit: cover;
      border-radius: 50%;
    }
    input {
      display: none;
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #777777;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
    }
    .input-file {
      position: relative;
      #close-icon {
        position: absolute;
        right: -1.5rem;
        top: 1.2rem;
        cursor: pointer;
      }
    }
    label {
      display: flex;
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #777777;
      color: #777777;
      border-radius: 0.4rem;
      width: 250px;
      font-size: 1rem;
      text-transform: none;
      align-items: center;
      overflow: hidden;
      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
      p {
        padding-left: 1rem;
      }
    }

    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      width: 100%;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default SetAvatar;
