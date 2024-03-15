import { score } from "~/types";


interface Props {
  scores: score[];
}

export default function Scores({ scores }: Props) {
  return (
    <aside className="flex flex-col items-center  md:min-w-40 bg-red-500/50">
      <h1 className="font-extrabold text-white text-center">SCORES</h1>
      <ol className="mt-5 text-white font-bold list-decimal">
        {scores.sort((a, b) => a.score - b.score).map((s, index) => <li key={index}>{s.name}: {s.score}</li>)}
      </ol>
    </aside>
  )
}
