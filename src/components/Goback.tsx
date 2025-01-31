import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Goback() {
  return (
    <Link href={"/"} className="absolute p-4">
      <MoveLeft />
    </Link>
  );
}
