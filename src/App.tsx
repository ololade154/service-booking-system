import { Nav } from "./components/nav";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <div>
      <Nav />
      <AppRoutes />
    </div>
  );
};
