import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Goback from "@/components/Goback";
import Image from "next/image";
import logo from "@/assets/leaderboards.png";

type RecordType = {
  id: string;
  name: string;
  level?: number;
  time?: number;
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function getRecords(table: string) {
  switch (table) {
    case "numbers":
      return await prisma.numbersRecord.findMany({
        orderBy: { level: "desc" },
      });
    case "simon":
      return await prisma.simonRecord.findMany({
        orderBy: { level: "desc" },
      });
    case "tiles":
      return await prisma.tilesRecord.findMany({
        orderBy: { time: "asc" },
      });
    default:
      return notFound();
  }
}

export default async function RecordsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const table = searchParams.table || "numbers";
  const records = await getRecords(table);
  let i = 1;

  return (
    <main className="w-dvw p-4 min-h-dvh">
      <Goback />
      <Image src={logo} alt="Leaderboards" className="mx-auto mt-8 mb-24" />

      <div className="flex mb-4 mx-auto w-[900px]">
        <Link
          href="?table=numbers"
          className={`px-4 py-2  border-l-[1px] border-gray-400 ${
            table === "numbers"
              ? "text-[#181452] bg-white"
              : "text-white bg-transparent"
          }`}
        >
          Remember The Number
        </Link>
        <Link
          href="?table=simon"
          className={`px-4 py-2 border-l-[1px] border-gray-400 ${
            table === "simon"
              ? "text-[#181452] bg-white"
              : "text-white bg-transparent"
          }`}
        >
          Follow The Pattern
        </Link>
        <Link
          href="?table=tiles"
          className={`px-4 py-2 border-x-[1px] border-gray-400 ${
            table === "tiles"
              ? "text-[#181452] bg-white"
              : "text-white bg-transparent"
          }`}
        >
          Match The Tiles
        </Link>
      </div>

      <table className="mx-auto w-[900px] text-xl border-[1px] border-gray-400 p-2">
        <thead>
          <tr className="border-[1px] border-gray-400 p-2">
            <th className="border-[1px] border-gray-400 p-4 w-20 text-center">
              Rank
            </th>
            <th className="border-[1px] border-gray-400 p-4">Name</th>
            <th className="border-[1px] border-gray-400 p-4">Record</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record: RecordType) => (
            <tr key={record.id} className="border-[1px] border-gray-400 p-2">
              <td className="border-[1px] border-gray-400 p-2 pl-4 w-20 text-center">
                {i++}
              </td>
              <td className="border-[1px] border-gray-400 p-2 pl-4">
                {record.name}
              </td>
              <td className="border-[1px] border-gray-400 p-2 pl-4">
                {record.level || record.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <ul className="border border-gray-600 rounded-lg p-4 mx-auto w-[600px]">
        {records.map((record: RecordType) => (
          <li key={record.id} className="py-2 border-2 border-gray-400">
            {i++} {record.name} - {record.level || record.time}s
          </li>
        ))}
      </ul> */}
    </main>
  );
}
