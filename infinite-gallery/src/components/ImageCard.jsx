function ImageCard({ image }) {
    return (
      <div className="overflow-hidden rounded-lg shadow-md">
        <img src={image.urls.small} alt={image.alt_description} className="w-full h-48 object-cover" />
      </div>
    );
  }
  
  export default ImageCard;
  