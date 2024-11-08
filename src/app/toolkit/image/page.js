// pages/index.js
import Link from 'next/link';

export default function Random() {
  const toolkits = [
    {
      name: "Image Toolkit",
      description: "Explore random tools for generating numbers and outcomes.",
      tools: [
        { name: "Image Compressor", path: "/toolkit/image/compressor" },
        { name: "Image Cropper", path: "/toolkit/image/cropper" },
        { name: "Image Background Remover", path: "/toolkit/image/background-remover" },
        { name: "Image Color Picker", path: "/toolkit/image/color-picker" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 mt-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Toolkit</h1>
        
        {/* Render each toolkit card */}
        {toolkits.map((toolkit, index) => (
          <div key={index} className="p-8 bg-slate-900 shadow-lg rounded-lg mb-8 hover:bg-slate-800 transition">
            <h2 className="text-2xl font-semibold mb-4">{toolkit.name}</h2>
            <p className="mb-6">{toolkit.description}</p>
            
            {/* Render each tool link within the toolkit */}
            <div className="flex flex-col gap-4">
              {toolkit.tools.map((tool, idx) => (
                <Link key={idx} href={tool.path} className="px-4 py-2 bg-blue-500 text-center rounded-lg font-semibold hover:bg-blue-600 transition">
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
