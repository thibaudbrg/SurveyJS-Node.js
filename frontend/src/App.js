import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { CreatorPage } from "./pages/Creator";
import { SurveyPage } from "./pages/Survey";
import { ExportToPDFPage } from "./pages/Export";
import { AnalyticsPage } from "./pages/Analytics";
import { AnalyticsTabulatorPage } from "./pages/AnalyticsTabulator";
import { AnalyticsDatatablesPage } from "./pages/AnalyticsDatatables";

import "bootstrap/dist/css/bootstrap.css";
// ... other imports

export default function SurveyJSReactApplication() {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  return (
      <Router>
        <div>
          {/* Navigation bar only rendered when on localhost */}
          {isLocalhost && (
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      SurveyJS + React
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/survey">Survey</Link>
                    </li>
                    <li>
                      <Link to="/creator">Survey Creator</Link>
                    </li>
                    <li>
                      <Link to="/export">PDF Export</Link>
                    </li>
                    <li>
                      <Link to="/analytics">Analytics</Link>
                    </li>
                    <li>
                      <Link to="/analyticstabulator">Results Table</Link>
                    </li>
                    <li>
                      <Link to="/analyticsdatatables">
                        Results Table (IE Support)
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
          )}

          <div className="app-content">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/survey">
                <SurveyPage />
              </Route>
              <Route path="/creator">
                <CreatorPage />
              </Route>
              <Route path="/export">
                <ExportToPDFPage />
              </Route>
              <Route path="/analytics">
                <AnalyticsPage />
              </Route>
              <Route path="/analyticsdatatables">
                <AnalyticsDatatablesPage />
              </Route>
              <Route path="/analyticstabulator">
                <AnalyticsTabulatorPage />
              </Route>
              {/* You may want to add a catch-all route here to handle undefined routes */}
            </Switch>
          </div>
        </div>
      </Router>
  );
}
