import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center">
      <h1 className="text-2xl text-center mt-12 mb-6">routes</h1>
      <div className="flex gap-5">
        <h1 className="text-blue-500 underline">
          <Link href="/dashboard">dashboard</Link>
        </h1>
        <h1 className="text-blue-500 underline">
          <Link href="/inventory">inventory</Link>
        </h1>
        <h1 className="text-blue-500 underline">
          <Link href="/tools">tools</Link>
        </h1>
        <h1 className="text-blue-500 underline">
          <Link href="/calculators">calculators</Link>
        </h1>
        <h1 className="text-blue-500 underline">
          <Link href="/monitors">monitors</Link>
        </h1>
      </div>
    </main>
  );
}
