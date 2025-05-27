"use client";
import React, { useEffect, useState } from "react";
import { episodes, singleCharacter } from "@/app/API/Services";
import Image from "next/image";
import {
  FaAndroid,
  FaEarthAmericas,
  FaGenderless,
  FaHeart,
  FaLinkSlash,
  FaMapLocation,
  FaPlaystation,
} from "react-icons/fa6";
import DynamicCastCard from "@/app/components/ui/shared/DynamicCastCard";

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

interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

interface CharacterDetailProps {
  params: { id: string };
}

export default function CharacterDetail({ params }: CharacterDetailProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [characterResult, episodesResult] = await Promise.all([
          singleCharacter(params.id),
          episodes().then((data: ApiResponse<Episode>) => data.results),
        ]);
        setCharacter(characterResult);
        setEpisodesData(episodesResult);
      } catch (error) {
        console.error("Error fetching character data:", error);
        setError("Error loading character data");
      }
    };
    fetchData();
  }, [params.id]);

  if (error) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!character || !character.image) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Character not found or image unavailable
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 fontRickMortySub text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 sm:gap-12">
          <div className="w-full sm:w-[340px] lg:w-[480px] space-y-4 sm:space-y-6 flex items-center sm:items-start justify-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
                {character.name || "Unknown Character"}
              </h1>
              <DynamicCastCard className="p-4 sm:p-8 mt-8 sm:mt-12">
                <div className="relative w-[280px] sm:w-[340px] h-[280px] sm:h-[350px] mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={character.image}
                    alt={`Portrait of ${
                      character.name || "Unknown"
                    } from Rick and Morty`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 340px, 480px"
                  />
                </div>
              </DynamicCastCard>
            </div>
          </div>

          <div
            className="hidden lg:block w-[7px] h-[60vh] bg-gradient-to-b from-green-400 to-cyan-500 rounded-full z-10"
            aria-hidden="true"
          ></div>

          <div className="w-full max-w-3xl space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-6">
              <DynamicCastCard className="p-4 sm:p-8">
                <div className="flex flex-col items-start w-[180px] sm:w-[200px]">
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="gradient-status"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <FaHeart className="text-3xl sm:text-4xl fill-[url(#gradient-status)]" />
                  <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                    Status
                  </span>
                  <p className="text-2xl sm:text-3xl text-white">
                    {character.status || "Unknown"}
                  </p>
                </div>
              </DynamicCastCard>
              <DynamicCastCard className="p-4 sm:p-8">
                <div className="flex flex-col items-start w-[180px] sm:w-[200px]">
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="gradient-species"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <FaAndroid className="text-3xl sm:text-4xl fill-[url(#gradient-species)]" />
                  <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                    Species
                  </span>
                  <p className="text-2xl sm:text-3xl text-white">
                    {character.species || "Unknown"}
                  </p>
                </div>
              </DynamicCastCard>
              <DynamicCastCard className="p-4 sm:p-8">
                <div className="flex flex-col items-start w-[180px] sm:w-[200px]">
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="gradient-gender"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <FaGenderless className="text-3xl sm:text-4xl fill-[url(#gradient-gender)]" />
                  <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                    Gender
                  </span>
                  <p className="text-2xl sm:text-3xl text-white">
                    {character.gender || "Unknown"}
                  </p>
                </div>
              </DynamicCastCard>
            </div>
            <DynamicCastCard className="p-4 sm:p-8">
              <div className="flex flex-col items-start">
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="gradient-origin"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#FDE68A" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <FaEarthAmericas className="text-3xl sm:text-4xl fill-[url(#gradient-origin)]" />
                <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                  Origin
                </span>
                <div className="flex items-center justify-between w-full mt-2">
                  <p className="text-2xl sm:text-3xl text-white">
                    {character.origin?.name || "Unknown"}
                  </p>
                  <FaLinkSlash className="text-xl sm:text-2xl fill-[url(#gradient-origin)]" />
                </div>
              </div>
            </DynamicCastCard>
            <DynamicCastCard className="p-4 sm:p-8">
              <div className="flex flex-col items-start">
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="gradient-location"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                    >
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#FDE68A" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <FaMapLocation className="text-3xl sm:text-4xl fill-[url(#gradient-location)]" />
                <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                  Last Known Location
                </span>
                <div className="flex items-center justify-between w-full mt-2">
                  <p className="text-2xl sm:text-3xl text-white">
                    {character.location?.name || "Unknown"}
                  </p>
                  <FaLinkSlash className="text-xl sm:text-2xl fill-[url(#gradient-location)]" />
                </div>
              </div>
            </DynamicCastCard>
            <DynamicCastCard className="p-4 sm:p-8">
              <div className="flex flex-col items-start">
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="gradient-episodes"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#FDE68A" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <FaPlaystation className="text-3xl sm:text-4xl fill-[url(#gradient-episodes)]" />
                <span className="font-semibold text-lg sm:text-xl text-white mt-2">
                  Episodes
                </span>
                <div className="mt-2">
                  <ul className="text-xl sm:text-2xl text-white list-disc pl-5">
                    {episodesData?.slice(0, 5)?.map((episode) => (
                      <li key={episode.id}>{episode?.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </DynamicCastCard>
          </div>
        </div>
      </div>
    </div>
  );
}
