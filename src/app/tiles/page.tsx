import Tiles from "@/components/Tiles";
import Image from "next/image";
import img from "@/assets/1000.png";

export default function TilesPage() {
  return (
    <main className="h-dvh">
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <Tiles />
    </main>
  );
}
