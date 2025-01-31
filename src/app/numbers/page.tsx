import NumberMemory from "@/components/Numbers";
import Image from "next/image";
import img from "@/assets/remmeber.png";
import Goback from "@/components/Goback";

export default function NumberPage() {
  return (
    <main className="h-dvh">
      <Goback />
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <NumberMemory />
    </main>
  );
}
