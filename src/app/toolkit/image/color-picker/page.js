"use client";

import { useState, useRef, useEffect } from "react";

export default function ColorPicker() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [colorPreview, setColorPreview] = useState("rgb(0, 0, 0)");

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image source after loading
      };
      reader.readAsDataURL(file); // Convert image to a data URL
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

  // Handle mouse movement to get pixel color
  const handleMouseMove = (e) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Get the mouse position relative to the canvas
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Get pixel data at mouse position
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      // Extract the RGB values from the pixel data (array of RGBA values)
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];

      // Update the state with the new RGB values
      setRgb({ r, g, b });
      setColorPreview(`rgb(${r}, ${g}, ${b})`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mt-4 mb-4">Color Picker from Image</h1>

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
            onMouseMove={handleMouseMove} // Track mouse movements
            className="border"
          />
        </div>
      )}

      <div className="text-lg">
        <p>RGB: {rgb.r}, {rgb.g}, {rgb.b}</p>
        <div
          style={{ backgroundColor: colorPreview }}
          className="mt-4 w-32 h-32 rounded-lg"
        ></div>
      </div>
    </div>
  );
}
