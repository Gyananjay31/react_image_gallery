import { useState, useEffect, useRef, useCallback } from 'react';
import ImageCard from './ImageCard';
import Loader from './Loader';
import axios from 'axios';
const accessKey = "zYH0nsHL19_uomlm5lvTBJsqB6kplWdpNokPtepMcz4";

function Gallery({ query }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query || 'nature',
          page: page,
          per_page: 10,
        },
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        }
      });
      setImages(prev => [...prev, ...res.data.results]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [page, query]);

 
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
      <div ref={loader}>
        <Loader />
      </div>
    </>
  );
}

export default Gallery;
