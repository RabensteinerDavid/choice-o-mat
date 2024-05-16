import React, { useEffect, useState } from 'react'
import '../../style/imageuploader.css'

const ImageUploader = ({ onPhotosSelected, defaultPhotoProp }) => {
  const [photo, setPhoto] = useState([])
  const [error, setError] = useState(null)
  const [defaultPhoto, setDefaultPhoto] = useState(null)

  useEffect(() => {
    setDefaultPhoto(defaultPhotoProp)
  }, [defaultPhotoProp])

  const handlerPhoto = event => {
    const files = event.target.files
    const fileArray = Array.from(files)
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)

    fileArray.forEach(file => {
      let filename = file.name.trim()
      const parts = filename.split('.')
      const fileExtension = parts.pop()

      file = new File([file], `${uniqueSuffix}.${fileExtension}`, {
        type: file.type
      })

      const image = new Image()
      image.onload = () => {
        setPhoto(prevPhotos => [...prevPhotos, file])
        setError(null)
        onPhotosSelected([...photo, file])
      }
      image.src = URL.createObjectURL(file)
    })
  }

  const handleRemovePhoto = index => {
    const updatedPhotos = [...photo]
    updatedPhotos.splice(index, 1)
    setPhoto(updatedPhotos)
    onPhotosSelected(updatedPhotos)
  }

  const renderPreview = () => {
    return photo.map((file, index) => (
      <div key={index} className='image-preview-item'>
        <img
          src={URL.createObjectURL(file)}
          alt={`Uploaded image ${index}`}
          className='image-preview'
        />

        <div
          className='remove-button-image'
          onClick={() => handleRemovePhoto(index)}
        >
          <div class='trash-box'>
            <div class='trash-top'></div>
            <div class='trash-btm'>
              <div class='trash-lines'>
                <div class='trash-line'></div>
                <div class='trash-line'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      {error && <div className='error-message'>{error}</div>}
      <div className='image-uploader-container'>
        {photo.length === 0 && !defaultPhoto && (
          <label className='file-input-label'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handlerPhoto}
              className='inputspace'
            />
            Click here to upload images
          </label>
        )}
        {defaultPhoto && (
          <div className='image-preview-container'>
            <div className='image-preview-item'>
              <img
                src={`http://localhost:3001/images/${defaultPhoto}`}
                className='image-preview'
              />

              <div
                className='remove-button-image'
                onClick={() => setDefaultPhoto(null)}
              >
                <div class='trash-box'>
                  <div class='trash-top'></div>
                  <div class='trash-btm'>
                    <div class='trash-lines'>
                      <div class='trash-line'></div>
                      <div class='trash-line'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='image-preview-container'>{renderPreview()}</div>
      </div>
    </>
  )
}

export default ImageUploader
