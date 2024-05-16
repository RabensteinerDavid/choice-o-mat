import React, { useEffect, useState } from 'react'
import '../../style/imageuploader.css'
import { useParams } from 'react-router-dom'
import { deleteAnswerPhoto } from '../../api'

const ImageUploader = ({
  photoAdd,
  photoDelete,
  defaultPhotoProp,
  answerNumber,
  aspectratio,
  answerId
}) => {
  const [photo, setPhoto] = useState([])
  const [error, setError] = useState(null)
  const [defaultPhoto, setDefaultPhoto] = useState(null)
  const { id } = useParams()

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

      file = new File(
        [file],
        `${answerNumber}_${uniqueSuffix}.${fileExtension}`,
        {
          type: file.type
        }
      )

      const image = new Image()
      image.onload = () => {
        if (image.width / image.height !== aspectratio) {
          setError(`Aspect ratio of all images must be ${aspectratio}`)
          return
        }
        setPhoto(prevPhotos => [...prevPhotos, file])
        setError(null)
        photoAdd([...photo, file])
      }
      image.src = URL.createObjectURL(file)
    })
  }

  const handleRemovePhoto = index => {
    const updatedPhotos = [...photo]
    updatedPhotos.splice(index, 1)
    setPhoto(updatedPhotos)
    photoDelete(index)
    deleteAnswerPhoto(id, answerId)
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
          onClick={() => {
            handleRemovePhoto(index)
          }}
        >
          <div className='trash-box'>
            <div className='trash-top'></div>
            <div className='trash-btm'>
              <div className='trash-lines'>
                <div className='trash-line'></div>
                <div className='trash-line'></div>
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
                onClick={() => {
                  handleRemovePhoto(answerNumber)
                  deleteAnswerPhoto(id, answerId)
                  setDefaultPhoto(null)
                }}
              >
                <div className='trash-box'>
                  <div className='trash-top'></div>
                  <div className='trash-btm'>
                    <div className='trash-lines'>
                      <div className='trash-line'></div>
                      <div className='trash-line'></div>
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
