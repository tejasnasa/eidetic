import Simon from "@/components/Simonsays";
import Image from "next/image";
import img from "@/assets/follow.png";

export default function SimonPage() {
  return (
    <main className="h-dvh">
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <Simon />
    </main>
  );
}
