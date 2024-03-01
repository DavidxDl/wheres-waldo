import Link from "next/link";
import { image } from "./testing/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export default async function HomePage() {
  const images: image[] = await getImages();

  return (
    <main className=" gap-2 flex min-h-screen  flex-col items-center justify-center text-white text-shadow-lg">
      <div className="min-w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#bb0000] to-[#670000] py-14">
        <h1 className="font-extrabold text-2xl md:text-4xl mb-2">
          Pick a photo to start the game!
        </h1>
        <Carousel className="w-full max-w-xs md:max-w-lg">
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img._id}>
                <Link href={`/images/${img._id}`}>
                  <img src={`images/${img._id}.jpg`} />
                  <h2 className="text-2xl font-extrabold capitalize text-center">
                    {img.description}
                  </h2>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant={"secondary"} />
          <CarouselNext variant={"secondary"} />
        </Carousel>
      </div>
    </main>
  );
}

async function getImages(): Promise<image[]> {
  const res = await fetch("http://localhost:3000/api/images", {
    cache: "no-cache",
  });
  const data: image[] = await res.json();
  console.log(`this is the data `);
  console.log(...data);

  return data;
}
