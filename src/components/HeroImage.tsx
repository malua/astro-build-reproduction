"use client";
import React, { useEffect, useRef } from "react";

interface HeroImageProps {
  title: string;
  tags?: string[];
  category?: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  positionX?: string;
  positionY?: string;
  alt: string;
}

export default function HeroImage({
  title,
  tags,
  category,
  backgroundImage,
  mobileBackgroundImage,
  positionX = "30%",
  positionY = "50%",
  alt,
}: HeroImageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const parallaxElement = parallaxRef.current;
    if (!heroElement || !parallaxElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            parallaxElement.style.willChange = "transform";
            window.addEventListener("scroll", updateParallax);
          } else {
            parallaxElement.style.willChange = "auto";
            window.removeEventListener("scroll", updateParallax);
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(heroElement);

    function updateParallax() {
      const scrollPosition = window.pageYOffset;
      const parallaxFactor = 0.3;
      parallaxElement.style.transform = `translate3d(0, ${scrollPosition * parallaxFactor}px, 0)`;
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
    };
  }, []);

  return (
    <div className=" h-64 sm:h-[28rem] md:h-[32rem] mb-8 px-8 sm:px-24 max-sm:-mx-8 max-w-7xl mx-auto sm:w-full">
      <div
        ref={heroRef}
        className="rounded-lg relative flex flex-col justify-center items-center text-center overflow-hidden h-full"
        data-pagefind-body
      >
        <div
          ref={parallaxRef}
          className="absolute inset-0"
          style={{
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
            style={{
              backgroundImage: `url(${mobileBackgroundImage})`,
              backgroundPosition: `${positionX} ${positionY}`,
              // top: "-20%",
              // height: "120%",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-cover bg-no-repeat hidden md:block"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: `${positionX} ${positionY}`,
              // top: "-20%",
              // height: "120%",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative">
          <h1 className="prose prose-slate uppercase font-overpass-mono text-[rgb(245,245,245)] text-4xl fade-in-up delay-150">
            {title}
          </h1>
          <div className="flex gap-2 mt-2 fade-in-up delay-300 justify-center">
            <p key={category} className="font-overpass-mono text-xl">
              <a
                className="bg-slate-600 text-[rgb(245,245,245)] bg-opacity-50 px-2 py-1 rounded no-underline"
                href={`../`}
              >
                {category}
              </a>
            </p>
          </div>
        </div>
        <img src={backgroundImage} alt={alt} className="sr-only" />
      </div>
    </div>
  );
}