import Tiles from "@/components/Tiles";
import Image from "next/image";
import img from "@/assets/1000.png";
import Goback from "@/components/Goback";

export default function TilesPage() {
  return (
    <main className="h-dvh">
      <Goback />
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <Tiles />
    </main>
  );
}
