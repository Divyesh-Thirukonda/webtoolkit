"use client";

import { useState } from "react";

export default function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(0.7);
  const [isUploaded, setIsUploaded] = useState(false);

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Compress the image (resize and adjust quality)
  const handleCompress = () => {
    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set desired width and height (based on compression settings)
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions preserving aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to JPEG with adjusted quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", compressionQuality);
        setCompressedImage(compressedDataUrl);
      };
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = "compressed-image.jpg";
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mt-4 mb-4">Custom Image Compression Tool</h1>

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

      {isUploaded && (
        <div className="flex flex-col items-center space-y-4">
          <div className="mb-4">
            <label className="text-lg font-semibold">Compression Quality: {Math.round(compressionQuality * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={compressionQuality}
              onChange={(e) => setCompressionQuality(e.target.value)}
              className="mt-2"
            />
          </div>

          <button
            onClick={handleCompress}
            className="px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Compress Image
          </button>
        </div>
      )}

      {compressedImage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Preview of Compressed Image:</h2>
          <img src={compressedImage} alt="Compressed Preview" className="mt-4 w-64 h-auto" />
        </div>
      )}

      {compressedImage && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-green-500 font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
}
