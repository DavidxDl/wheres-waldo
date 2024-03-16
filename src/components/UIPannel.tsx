import { character } from "~/types";
import CharacterListItem from "./CharacterListItem";

interface Props {
  characters: character[];
  discoveredCharacters: Set<string>;
  children: React.ReactNode;

}

export default function UIPannel({ children, characters, discoveredCharacters }: Props) {
  return (
    <div className="bg-black/90 backdrop-blur-md text-white">
      <div className="flex items-center px-5  text-3xl font-extrabold text-white">
        <div className=" flex items-end gap-4 mx-auto">
          <ul className="align-center gap-4 justify-center flex text-white font-extrabold text-2xl w-full">
            {characters.map((char: character) => (
              <CharacterListItem
                character={char.name}
                key={char.name}
                isFound={discoveredCharacters.has(char.name)}
              />
            ))}
          </ul>
        </div>
        {children}
      </div>
    </div>
  )
}
