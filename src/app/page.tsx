import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import tiles from "@/assets/tiles.png";
import simon from "@/assets/simon.png";
import numbers from "@/assets/numbers.png";
import tlogo from "@/assets/1000.png";
import nlogo from "@/assets/remmeber.png";
import slogo from "@/assets/follow.png";

export default function Home() {
  return (
    <main className="p-10 h-dvh w-dvw">
      <header className="flex justify-between">
        <Image src={logo} height={90} alt="eidetic" />
        <Link
          href={"/leaderboard"}
          className="mt-8 mr-8 text-xl font-bold font-mono"
        >
          LEADERBOARD
        </Link>
      </header>

      <section className="mt-36 w-[80%] flex justify-between mx-auto">
        <Link href={"/tiles"} className="border-[1px] border-gray-700 w-[30%] p-4 hover:bg-black transition">
          <Image src={tiles} alt="" />
          <Image src={tlogo} alt="" className="mt-8" />
        </Link>
        <Link href={"/simon"} className="border-[1px] border-gray-700 w-[30%] p-4 hover:bg-black transition">
          <Image src={simon} alt="" />
          <Image src={slogo} alt="" className="mt-8" />
        </Link>
        <Link
          href={"/numbers"}
          className="border-[1px] border-gray-700 w-[30%] p-4 hover:bg-black transition"
        >
          <Image src={numbers} alt="" />
          <Image src={nlogo} alt="" className="mt-8"/>
        </Link>
      </section>
    </main>
  );
}
