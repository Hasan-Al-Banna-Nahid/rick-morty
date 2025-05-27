interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string, url: string };
  location: { name: string, url: string };
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
    count: number,
    pages: number,
    next: string | null,
    prev: string | null,
  };
  results: T[];
}

const characters = async (): Promise<ApiResponse<Character>> => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) {
      throw new Error("Failed to fetch characters");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
};

const singleCharacter = async (
  id: number | string
): Promise<Character | null> => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch character with id ${id}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single character:", error);
    return null;
  }
};

const episodes = async (): Promise<ApiResponse<Episode>> => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/episode");
    if (!res.ok) {
      throw new Error("Failed to fetch episodes");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
};

const locations = async (): Promise<ApiResponse<Location>> => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/location");
    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
};

export { characters, episodes, locations, singleCharacter };
