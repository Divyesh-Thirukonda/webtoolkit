"use client";

import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function ImageCropper() {
  const [image, setImage] = useState(null); // Uploaded image
  const [croppedImage, setCroppedImage] = useState(null); // Result after cropping
  const [isUploaded, setIsUploaded] = useState(false); // Check if the image has been uploaded
  const cropperRef = useRef(null); // Reference for the Cropper component

  // Handle the file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the uploaded image as base64 URL
        setIsUploaded(true); // Set uploaded state to true
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  // Crop and resize the image
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper; // Access the cropper instance
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL(); // Get the cropped canvas data URL
      setCroppedImage(croppedDataUrl); // Set the cropped image data URL
    }
  };

  // Download the cropped image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = 'cropped-image.png'; // Set the download file name
    link.click(); // Trigger the download
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mt-4 mb-4">Image Crop and Resize Tool</h1>

      {/* Upload Image */}
      {!isUploaded && (
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 border rounded"
          />
        </div>
      )}

      {/* Show cropper if image is uploaded */}
      {isUploaded && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-96 h-96">
            <Cropper
              src={image}
              ref={cropperRef}
              style={{ width: '100%', height: '100%' }}
              aspectRatio={16 / 9} // Aspect ratio for cropping (optional)
              guides={false} // Disable grid lines
              cropBoxResizable={true} // Allow resizing of the crop box
              cropBoxMovable={true} // Allow moving of the crop box
            />
          </div>

          {/* Crop button */}
          <button
            onClick={handleCrop}
            className="mt-4 px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Crop Image
          </button>
        </div>
      )}

      {/* Preview of cropped image */}
      {croppedImage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Preview of Cropped Image:</h2>
          <img src={croppedImage} alt="Cropped Preview" className="mt-4 w-64 h-auto" />
        </div>
      )}

      {/* Download Button */}
      {croppedImage && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-green-500 font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Download Cropped Image
          </button>
        </div>
      )}
    </div>
  );
}
