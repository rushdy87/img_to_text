import { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor obcaecati quidem rerum adipisci magni impedit possimus dolorum sit unde.'
  );

  const handleUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className='App'>
      <h1>Image To Text</h1>
      <p>Gets words from images</p>
      <div className='input-wrapper'>
        <label htmlFor='upload'>Upload Image</label>
        <input
          type='file'
          name='upload'
          id='upload'
          accept='image/*'
          onChange={handleUpload}
        />
      </div>

      <div className='result'>
        {selectedImage && (
          <div className='box-image'>
            <img src={URL.createObjectURL(selectedImage)} alt='thumb' />
          </div>
        )}
        {textResult && (
          <div className='box-p'>
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
