import ListSection from "./components/list-section";

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col gap-8 max-w-screen-md mx-auto">
      <h1 className="text-6xl font-bold text-center text-blue-400 break-words">MultiMoment</h1>
      <ListSection />
    </main>
  );
}
