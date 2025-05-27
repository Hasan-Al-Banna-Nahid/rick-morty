"use client";
import React, { useEffect, useState } from "react";
import CharacterCard from "@/app/components/ui/shared/CharacterCard";
import { characters } from "@/app/API/Services";

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

interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export default function CharactersPage() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);

  useEffect(() => {
    characters().then((data: ApiResponse<Character>) => {
      setAllCharacters(data.results);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="my-4 text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center sm:text-left">
          The Cast
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 fontRickMortySub">
          {allCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              className="w-full max-w-[400px] mx-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
