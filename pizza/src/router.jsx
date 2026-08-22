import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Panel from "./pages/Panel";
import NotFound from "./pages/NotFound";


const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/panel",
    element: <Panel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function NotFoundFallback() {
  return (
    <main>
      <h1>Страница не найдена</h1>
      <button type="button" onClick={() => navigate("/")}>
        На главную
      </button>
    </main>
  );
}

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);

    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return pathname;
}

export default function Router() {
  const pathname = usePathname();

  const currentRoute = useMemo(
    () =>
      routes.find((route) => route.path === pathname) ??
      routes.find((route) => route.path === "*"),
    [pathname]
  );

  return <Layout>{currentRoute?.element ?? <NotFoundFallback />}</Layout>;
}
