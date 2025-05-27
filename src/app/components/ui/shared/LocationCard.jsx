import React from "react";

const LocationCard = ({ location, className = "", idx }) => {
  return (
    <div className={`block group  fontRickMortySub ${className}`}>
      <div
        className="relative rounded-lg w-full max-w-[400px] mx-auto"
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
            padding: "1.5px",
            borderRadius: "8px",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 50px) 100%, 0 100%)",
          }}
        ></div>
        <div
          className="relative rounded-lg bg-black bg-opacity-50 p-3 sm:p-4 flex flex-col gap-2"
          style={{
            margin: "1.5px",
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 48px) 100%, 0 100%)",
            borderRadius: "6px",
          }}
        >
          <h2 className="text-base sm:text-lg text-white">{`${location.type} #${
            idx + 1
          }`}</h2>
          <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
            {location.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
