import React, { useEffect, useState } from 'react'
import '../../style/imageuploader.css'
import { useParams } from 'react-router-dom'
import { deleteAnswerPhoto } from '../../api'
import { Player } from '@lottiefiles/react-lottie-player'

const ImageUploader = ({
  photoAdd,
  photoDelete,
  defaultPhotoProp,
  answerNumber,
  aspectratio,
  answerId,
  initial
}) => {
  const [photo, setPhoto] = useState([])
  const [error, setError] = useState(null)
  const [defaultPhoto, setDefaultPhoto] = useState(null)
  const { id } = useParams()

  console.log(aspectratio)

  useEffect(() => {
    setDefaultPhoto(defaultPhotoProp)
  }, [defaultPhotoProp])

  const handlerUpload = event => {
    const files = event.target.files
    const fileArray = Array.from(files)
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)

    fileArray.forEach(file => {
      let filename = file.name.trim()
      const parts = filename.split('.')
      const fileExtension = parts.pop()

      const newFile = new File(
        [file],
        `${answerNumber}_${uniqueSuffix}.${fileExtension}`,
        {
          type: file.type
        }
      )

      if (file.type === 'application/json') {
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result)
            console.log(jsonData)
            setPhoto(prevPhotos => [...prevPhotos, newFile])
            setError(null)
            photoAdd([...photo, newFile])
          } catch (e) {
            setError('Error parsing JSON file.')
          }
        }
        reader.readAsText(file)
      } else {
        const image = new Image()
        image.onload = () => {
          //check for aspect ratio -> optional
          // if (image.width / image.height !== aspectratio) {
          //   setError(`Aspect ratio of all images must be ${aspectratio}`)
          //   return
          // }
          setPhoto(prevPhotos => [...prevPhotos, newFile])
          setError(null)
          photoAdd([...photo, newFile])
        }
        image.src = URL.createObjectURL(file)
      }
    })
  }

  const handleRemovePhoto = index => {
    const updatedPhotos = [...photo]
    updatedPhotos.splice(index, 1)
    setPhoto(updatedPhotos)
    photoDelete(index)
    if (id && answerId && initial) {
      deleteAnswerPhoto(id, answerId)
    }
  }

  const renderPreview = () => {
    return photo.map((file, index) => (
      <div key={index} className='image-preview-item'>
        {file.type.startsWith('image/') ? (
          <img
            src={URL.createObjectURL(file)}
            alt=''
            className='image-preview'
          />
        ) : (
          <Player
            src={URL.createObjectURL(file)}
            className='player'
            loop
            autoplay
            style={{ height: '300px', width: '300px' }}
          />
        )}
        <div
          className='remove-button-image'
          onClick={() => handleRemovePhoto(index)}
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
              accept='image/*,application/json'
              multiple
              onChange={handlerUpload}
              className='inputspace'
            />
            Click here to upload images
          </label>
        )}
        {defaultPhoto && (
          <div className='image-preview-container'>
            <div className='image-preview-item'>
              {defaultPhoto.endsWith('.json') ? (
                <Player
                  src={`http://localhost:3001/lottie/${defaultPhoto}`}
                  className='player'
                  loop
                  autoplay
                  style={{ height: '300px', width: '300px' }}
                />
              ) : (
                <img
                  src={`http://localhost:3001/images/${defaultPhoto}`}
                  className='image-preview'
                  alt=''
                />
              )}

              <div
                className='remove-button-image'
                onClick={() => {
                  handleRemovePhoto(answerNumber)
                  console.log(initial)
                  if (id && answerId && initial) {
                    deleteAnswerPhoto(id, answerId)
                  }
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
