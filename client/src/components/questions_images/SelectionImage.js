const SelectionImage = ({ photo }) => {
    return (
      photo ? (
        <div>
          <img
            src={`http://localhost:3001/images/${photo}`}
            width={600}
            alt='answer'
          />
        </div>
      ) : (
        <p>No photo found</p>
      )
    );
  };
  
  export default SelectionImage;
  