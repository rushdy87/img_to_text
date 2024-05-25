import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState('');

  const convertImageToText = useCallback(async () => {
    if (selectedImage) {
      const worker = await createWorker('eng');
      const { data } = await worker.recognize(selectedImage);
      setTextResult(data.text);
      await worker.terminate();
    }
  }, [selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleUpload = (event) => {
    if (event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult('');
    }
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
