const SelectionImage = ({ photo }) => {
  return photo != null ? (
    <div>
      <img
        src={`${process.env.REACT_APP_BASE_URI_IMAGES}/${photo}`}
        width={600}
        alt='answer'
      />
    </div>
  ) : (
    <p>No photo found</p>
  )
}

export default SelectionImage
