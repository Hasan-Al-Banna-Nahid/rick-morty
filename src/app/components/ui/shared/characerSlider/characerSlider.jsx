import CharacterCard from "@/app/components/ui/shared/CharacterCard";

<SwiperSlide key={character.id}>
  <CharacterCard
    character={character}
    className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] mx-auto"
  />
</SwiperSlide>;
