import { Map } from "@/components/google-maps/Map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-semibold">Te achei</h1>
      <Map
      center={{lat: -10.926477432250977, lng: -37.07320022583008}}
      zoom={10}
      />
    </main>
  );
}
