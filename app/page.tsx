import { Map } from "@/components/google-maps/Map";
import { UserPosition } from "@/components/google-maps/UserPosition";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Map classname="w-screen h-screen">
        <UserPosition/>
      </Map>
    </main>
  );
}
