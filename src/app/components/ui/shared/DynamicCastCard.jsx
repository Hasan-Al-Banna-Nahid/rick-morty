import React from "react";

const DynamicCastCard = ({
  children,
  gradient = "from-green-400 to-cyan-500",
  className = "",
}) => (
  <div className={`relative w-full max-w-[400px] mx-auto ${className}`}>
    <div
      className={`absolute inset-0 rounded-lg -z-10 ${gradient}`}
      style={{
        background: "linear-gradient(to top right, #34d399, #06b6d4)",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "exclude",
        maskComposite: "exclude",
        padding: "1.5px",
        borderRadius: "8px",
      }}
    ></div>
    <div className="relative bg-transparent p-2 sm:p-3">{children}</div>
  </div>
);

export default DynamicCastCard;
