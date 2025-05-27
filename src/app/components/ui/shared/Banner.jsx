"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const BackgroundWrapper = ({ children }) => {
  const pathname = usePathname();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let backgroundStyles;

  if (pathname === "/") {
    let backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat;
    if (scrollPosition < 400) {
      backgroundImage = "url('/assets/homeBg.png')";
      backgroundPosition = "center";
      backgroundSize = "cover";
      backgroundRepeat = "no-repeat";
    } else if (scrollPosition < 600) {
      backgroundImage = "url('/assets/bg2.png')";
      backgroundPosition = "center";
      backgroundSize = "cover";
      backgroundRepeat = "no-repeat";
    } else {
      backgroundImage = "url('/assets/bg.webp')";
      backgroundPosition = "left";
      backgroundSize = "cover";
      backgroundRepeat = "no-repeat";
    }

    backgroundStyles = {
      backgroundImage,
      backgroundSize,
      backgroundPosition,
      backgroundRepeat,
      transition: "background-image 0.5s ease-in-out",
    };
  } else if (pathname === "/characters") {
    backgroundStyles = {
      backgroundImage: "url('/assets/bg3.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else if (/^\/characters\/[^/]+$/.test(pathname)) {
    backgroundStyles = {
      backgroundImage: "url('/assets/bg4.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    backgroundStyles = {
      backgroundImage: "none",
    };
  }

  return (
    <div className="relative min-h-screen w-full" style={backgroundStyles}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
          mixBlendMode: "darken",
        }}
      ></div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
