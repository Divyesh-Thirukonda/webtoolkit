"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundTransparentMaker() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [tolerance, setTolerance] = useState(30);
  const [processedImage, setProcessedImage] = useState(null);

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw the image onto the canvas when it's uploaded
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (image) {
        const img = new Image();
        img.src = image;

        img.onload = () => {
          // Set the canvas size to the image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  }, [image]);

  // Function to make the background transparent based on selected color and tolerance
  const makeBackgroundTransparent = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert selected color to RGB
    const selectedRGB = hexToRgb(selectedColor);

    // Calculate tolerance range
    const toleranceRange = (tolerance / 100) * 255;

    // Loop through each pixel and check if it matches the selected color within tolerance
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check if the pixel is within the tolerance range of the selected color
      if (
        Math.abs(r - selectedRGB.r) <= toleranceRange &&
        Math.abs(g - selectedRGB.g) <= toleranceRange &&
        Math.abs(b - selectedRGB.b) <= toleranceRange
      ) {
        // Make the pixel transparent (set alpha to 0)
        data[i + 3] = 0;
      }
    }

    // Update the canvas with the new image data
    ctx.putImageData(imgData, 0, 0);

    // Set the processed image as a downloadable data URL
    const processedDataUrl = canvas.toDataURL("image/png");
    setProcessedImage(processedDataUrl);
  };

  // Convert HEX color to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mt-4 mb-4">Image Background Transparent Maker</h1>

      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 border rounded"
        />
      </div>

      {image && (
        <div className="mb-6 relative">
          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            className="border"
          />
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="colorPicker" className="mr-2">Select Background Color</label>
        <input
          type="color"
          id="colorPicker"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="toleranceSlider" className="mr-2">Tolerance: {tolerance}%</label>
        <input
          type="range"
          id="toleranceSlider"
          min="0"
          max="100"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          className="w-full"
        />
      </div>

      <button
        onClick={makeBackgroundTransparent}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition mb-4"
      >
        Make Background Transparent
      </button>

      {processedImage && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Processed Image</h2>
          <img src={processedImage} alt="Processed" className="max-w-full max-h-80" />
          <a
            href={processedImage}
            download="processed-image.png"
            className="block text-blue-500 hover:underline mt-4"
          >
            Download Processed Image
          </a>
        </div>
      )}
    </div>
  );
}
