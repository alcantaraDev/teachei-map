import { Map } from "@/components/google-maps/Map";
import { MyPosition } from "@/components/google-maps/MyPosition";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Map classname="w-screen h-screen">
        <MyPosition/>
      </Map>
    </main>
  );
}
