"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CharacterCard = ({ character, className = "" }) => {
  return (
    <Link
      href={`/characters/${character.id}`}
      className={`block group fontRickMortySub ${className}`}
    >
      <div
        className="relative rounded-xl w-full max-w-[400px] mx-auto"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 50px) 100%, 0 100%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-lg -z-10"
          style={{
            background: "linear-gradient(to top right, #34d399, #06b6d4)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "exclude",
            maskComposite: "exclude",
            padding: "2px",
            borderRadius: "8px",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 50px) 100%, 0 100%)",
          }}
        ></div>
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundColor: "transparent",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 48px) 100%, 0 100%)",
            margin: "2px",
          }}
        >
          <div className="relative h-60 sm:h-72 w-full rounded-lg">
            <Image
              src={character.image}
              alt={character.name}
              fill
              style={{
                borderRadius: "8px",
              }}
              className="p-4 sm:p-6 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-3 sm:p-4">
            <h3 className="text-white font-bold text-lg sm:text-xl truncate">
              {character.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
