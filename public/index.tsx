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
    <div className="p-4 pb-16 normal:pb-4 normal:h-screen antialiased bg-gray-50">
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route default component={NotFound} />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
    </div>
  );
}

hydrate(<App />);

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
