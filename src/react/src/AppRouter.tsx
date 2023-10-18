import { ErrorBoundary, Loading } from "components/common";
import { Footer, Header } from "layouts";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy loaded components.
const LandingPage = lazy(() => import("pages/LandingPage"));

const AppRouter = () => {
  useEffect(() => {
    (async () => {
      const configRes = await fetch(`/api/config`);
      const configuration = await configRes.json();
      (window as Window).configuration = configuration;
    })();
  }, [window.location.origin]);

  return (
    <Router>
      <ErrorBoundary context="Wrapper of AppRouter.tsx">
        <Header />
        <ErrorBoundary context="Routes of AppRouter.tsx">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading pageLayout />}>
                  <LandingPage />
                </Suspense>
              }
            />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
