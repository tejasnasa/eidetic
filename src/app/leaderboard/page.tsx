import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getRecords(table: string) {
  switch (table) {
    case "numbers":
      return await prisma.numbersRecord.findMany({
        orderBy: { created_at: "desc" },
      });
    case "simon":
      return await prisma.simonRecord.findMany({
        orderBy: { created_at: "desc" },
      });
    case "tiles":
      return await prisma.tilesRecord.findMany({
        orderBy: { created_at: "desc" },
      });
    default:
      return notFound();
  }
}

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: { table?: string };
}) {
  const table = searchParams.table || "tiles";
  const records = await getRecords(table);

  return (
    <main className="max-w-xl mx-auto p-4 h-dvh">
      <h2 className="text-xl font-bold mb-4">
        Viewing {table.toUpperCase()} Records
      </h2>

      <div className="flex gap-2 mb-4">
        <Link
          href="?table=numbers"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Numbers
        </Link>
        <Link
          href="?table=simon"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Simon
        </Link>
        <Link
          href="?table=tiles"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tiles
        </Link>
      </div>

      {/* Records List */}
      <Suspense fallback={<p>Loading...</p>}>
        <ul className="border border-gray-600 rounded-lg p-4">
          {records.map((record: any) => (
            <li key={record.id} className="py-2 border-2 border-gray-500">
              {record.name} - {record.level || record.time}s
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}
