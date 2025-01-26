import Header from "@/components/header/Header";
import EventList from "./eventList/EventList";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="p-10">

<EventList/>
      </div>
    </div>
  );
}
