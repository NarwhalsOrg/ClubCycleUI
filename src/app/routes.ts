import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Clubs } from "./pages/Clubs";
import { Members } from "./pages/Members";
import { Events } from "./pages/Events";
import { EventRegistration } from "./pages/EventRegistration";
import { Attendance } from "./pages/Attendance";
import { Announcements } from "./pages/Announcements";
import { Payments } from "./pages/Payments";
import { Rooms } from "./pages/Rooms";
import { Certificates } from "./pages/Certificates";
import { Reports } from "./pages/Reports";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Login, Register } from "./pages/Auth";
import { PlaceholderPage } from "./pages/Placeholder";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "clubs", Component: Clubs },
          { path: "members", Component: Members },
          { path: "events", Component: Events },
          { path: "event-registration", Component: EventRegistration },
          { path: "attendance", Component: Attendance },
          { path: "announcements", Component: Announcements },
          { path: "payments", Component: Payments },
          { path: "rooms", Component: Rooms },
          { path: "certificates", Component: Certificates },
          { path: "reports", Component: Reports },
          { path: "profile", Component: Profile },
          { path: "settings", Component: Settings },
          { path: "*", Component: PlaceholderPage },
        ],
      },
    ],
  },
]);
