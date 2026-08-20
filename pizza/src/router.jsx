import React, { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

function NotFound() {
  return (
    <main>
      <h1>Страница не найдена</h1>
      <button type="button" onClick={() => navigate("/")}>
        На главную
      </button>
    </main>
  );
}

export function navigate(path) {
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
    () => routes.find((route) => route.path === pathname),
    [pathname]
  );

  return <Layout>{currentRoute?.element ?? <NotFound />}</Layout>;
}
