import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  Provider as RTProvider,
  teamsTheme,
  Loader,
} from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";

import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "../AppInsights";

import { useTeamsFx } from "./sample/lib/useTeamsFx";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./App.css";
import TabConfig from "./TabConfig";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme, loading } = useTeamsFx();
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <RTProvider
        theme={theme || teamsTheme}
        styles={{ backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Route exact path="/">
            <Redirect to="/applications" />
          </Route>
          {loading ? (
            <Loader style={{ margin: 100 }} />
          ) : (
            <>
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/termsofuse" component={TermsOfUse} />
              <Route exact path="/applications" component={Tab} />
              <Route exact path="/config" component={TabConfig} />
            </>
          )}
        </Router>
      </RTProvider>
    </AppInsightsContext.Provider>
  );
}
