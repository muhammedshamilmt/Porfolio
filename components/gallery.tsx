'use client'


import React, { useState } from "react";
import Link from "next/link";

const images = [
  
  { src: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175602.png?updatedAt=1750681638419", alt: "Gallery Work 1" },
  { src: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175613.png?updatedAt=1750681637898", alt: "Shamil Portrait" },
  { src: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175631.png?updatedAt=1750681637797", alt: "Gallery Work 1" },
  { src: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175638.png?updatedAt=1750681637433", alt: "Shamil Portrait" },
 
 
];

export default function Gallery() {
  const [selected, setSelected] = useState<null | typeof images[0]>(null);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-100">My Works Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            onClick={() => setSelected(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-2xl w-full p-4" onClick={e => e.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} className="w-full h-auto rounded-lg shadow-2xl" />
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      
    </section>
  );
} 