import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-10">
      <Link href={"/leaderboard"}>Leaderboard</Link>
      <Link href={"/tiles"}>Match The Tiles</Link>
      <Link href={"/simon"}>Follow The Order</Link>
      <Link href={"/numbers"}>Remember The Number</Link>
    </main>
  );
}
