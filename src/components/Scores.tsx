import { score } from "~/app/testing/page";


interface Props {
  scores: score[];
}

export default function Scores({ scores }: Props) {
  return (
    <aside className="flex flex-col items-center  md:min-w-40 bg-red-500/50">
      <h1 className="font-extrabold text-white text-center">SCORES</h1>
      <ol className="mt-5 text-white font-bold">
        {scores.sort((a, b) => a.score - b.score).map(s => <li type="1">{s.name}: {s.score}</li>)}
      </ol>
    </aside>
  )
}
