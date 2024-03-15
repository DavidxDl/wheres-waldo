export interface character {
  name: string;
  x: number;
  y: number;
}
export interface image {
  _id: string;
  characters: character[];
  description: string;
  scores: score[];
}
export interface score {
  _id: string;
  name: string;
  score: number;
}
