import NumberMemory from "@/components/Numbers";
import Image from "next/image";
import img from "@/assets/remmeber.png"

export default function NumberPage() {
  return (
    <main className="p-3 h-dvh">
      <Image src={img} height={1200} alt="" className="absolute top-[100px]" />
      <NumberMemory />
    </main>
  );
}
