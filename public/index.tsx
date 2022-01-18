import {
  ErrorBoundary,
  hydrate,
  LocationProvider,
  prerender as ssr,
  Route,
  Router,
} from "preact-iso";
import { Bookmarks, Home, NotFound } from "./components";

export function App() {
  return (
    <div>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/:listId" component={Bookmarks} />
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
