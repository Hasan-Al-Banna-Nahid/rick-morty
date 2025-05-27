"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import CharacterCard from "@/app/components/ui/shared/CharacterCard";
import EpisodeCard from "@/app/components/ui/shared/EpisodeCard";
import LocationCard from "@/app/components/ui/shared/LocationCard";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa6";
import Image from "next/image";
import { characters, episodes, locations } from "@/app/API/Services";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [locationList, setLocationList] = useState<Location[]>([]);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperReady, setSwiperReady] = useState<boolean>(false);

  useEffect(() => {
    characters().then((data: ApiResponse<Character>) => {
      setCharacterList(data.results.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    episodes().then((data: ApiResponse<Episode>) => {
      setEpisodeList(data.results.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    locations().then((data: ApiResponse<Location>) => {
      setLocationList(data.results.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="pt-[15vh] sm:pt-[20vh] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 space-y-4 sm:space-y-6">
        <div className="fontRickMortyHeader space-y-4 sm:space-y-6 font-bold text-center">
          <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-4">
            <Image
              src="/assets/bubble.png"
              alt="Bubble"
              width={60}
              height={60}
              className="w-[100px] h-[60px] sm:w-[150px] sm:h-[90px]"
            />
            <span className="text-white text-4xl sm:text-6xl">THE </span>
            <Image
              src="/assets/portal.png"
              alt="Portal"
              width={60}
              height={60}
              className="object-contain w-[60px] h-[40px] sm:w-[90px] sm:h-[60px] mx-2 sm:mx-6"
            />
            <span className="text-4xl sm:text-6xl bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
              RICK &
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider fontRickMortySub">
            <span className="text-4xl sm:text-6xl bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
              MORTY
            </span>{" "}
            <span className="text-white text-4xl sm:text-6xl">WIKI</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 my-6 sm:my-8">
          <button className="flex items-center bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:opacity-90 transition-opacity">
            <FaPlay className="mr-2" />
            Watch Now
          </button>

          <p className="font-bold fontRickMortySub text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-xs sm:text-sm text-center sm:text-justify max-w-xs sm:max-w-md">
            Brilliant but boozy scientist Rick hijacks his fretful <br />
            teenage grandson, Morty, for wild escapades <br /> in other worlds
            and alternate dimensions.
          </p>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex justify-end my-2">
          <Link href="/characters">
            <button className="fontRickMortySub bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold py-2 px-6 rounded-full text-sm hover:opacity-90 transition-opacity flex items-center">
              View All
            </button>
          </Link>
        </div>

        {swiperReady && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3.5, spaceBetween: 25 },
              1280: { slidesPerView: 4.5, spaceBetween: 30 },
            }}
            navigation={
              {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              } as import("swiper/types").NavigationOptions
            }
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            className="relative pb-10"
          >
            {characterList.map((character) => (
              <SwiperSlide key={character.id}>
                <CharacterCard
                  character={character}
                  className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto"
                />
              </SwiperSlide>
            ))}

            <div
              ref={prevRef}
              className="swiper-button-prev left-0 sm:left-2 after:hidden z-10"
            >
              <div className="bg-white p-2 rounded-lg hover:bg-opacity-100 transition-all shadow-xl">
                <span className="text-4xl sm:text-5xl">
                  <FaArrowLeft />
                </span>
              </div>
            </div>
            <div
              ref={nextRef}
              className="swiper-button-next right-0 sm:right-2 after:hidden z-10"
            >
              <div className="bg-white p-2 rounded-lg hover:bg-opacity-100 transition-all shadow-xl">
                <span className="text-4xl sm:text-5xl">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </Swiper>
        )}
      </div>

      <div className="w-full hover:cursor-auto overflow-hidden p-4 sm:p-6 mt-8 sm:mt-12 relative">
        <h2 className="my-4 sm:my-6 font-bold text-2xl sm:text-3xl">
          Episodes
        </h2>

        <Swiper
          modules={[Mousewheel, Navigation]}
          spaceBetween={15}
          slidesPerView="auto"
          mousewheel={{ forceToAxis: true }}
          direction="horizontal"
          freeMode={true}
          navigation={{
            prevEl: "#episodes-prev",
            nextEl: "#episodes-next",
          }}
          breakpoints={{
            480: { spaceBetween: 15 },
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 20 },
          }}
        >
          {episodeList.map((episode) => (
            <SwiperSlide
              key={episode.id}
              style={{ width: "260px" }}
              className="shrink-0"
            >
              <EpisodeCard episode={episode} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full hover:cursor-auto overflow-hidden p-4 sm:p-6 mt-12 sm:mt-20 relative">
        <h2 className="my-4 sm:my-6 font-bold text-2xl sm:text-3xl">
          Locations
        </h2>

        <Swiper
          modules={[Mousewheel, Navigation]}
          spaceBetween={15}
          slidesPerView="auto"
          mousewheel={{ forceToAxis: true }}
          direction="horizontal"
          freeMode={true}
          navigation={{
            prevEl: "#locations-prev",
            nextEl: "#locations-next",
          }}
          breakpoints={{
            480: { spaceBetween: 15 },
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 20 },
          }}
        >
          {locationList.map((location, index) => (
            <SwiperSlide
              key={location.id}
              style={{ width: "260px" }}
              className="shrink-0"
            >
              <LocationCard location={location} idx={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
