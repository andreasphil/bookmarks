import {
  ErrorBoundary,
  hydrate,
  LocationProvider,
  prerender as ssr,
  Route,
  Router,
} from "preact-iso";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
