import {
  ErrorBoundary,
  hydrate,
  LocationProvider,
  Route,
  Router,
} from "preact-iso";
import { Bookmarks, Home, NotFound } from "./components/pages";
import "finecss/dist/index.min.css";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/:listId" component={Bookmarks} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

hydrate(<App />);
