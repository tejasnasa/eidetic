import Simon from "@/components/Simonsays";
import Image from "next/image";
import img from "@/assets/follow.png";
import Goback from "@/components/Goback";

export default function SimonPage() {
  return (
    <main className="h-dvh">
      <Goback />
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <Simon />
    </main>
  );
}
