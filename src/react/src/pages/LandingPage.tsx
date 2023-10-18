import { useKeycloak } from "@bcgov/kc-react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Button } from "components/common";
import { PageLayout } from "layouts";
import React from "react";

const sx = {
  landingPage: { marginTop: "6.5vh" },
  section: {
    height: "85vh",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const LandingPage = () => {
  const {
    state: authState,
    login,
    getAuthorizationHeaderValue,
  } = useKeycloak();
  const user = authState.userInfo;

  const getTest = async () => {
    const response = await fetch("/api/test", {
      method: "GET",
      headers: {
        Authorization: getAuthorizationHeaderValue(),
      },
    });
    alert(JSON.stringify(await response.json()));
  };

  return (
    <Stack sx={sx.landingPage}>
      <Box sx={sx.section}>
        <PageLayout>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Grid item xs={12} sm={10}>
              <Stack gap={2}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "3rem",
                    color: "#ff4742",
                    fontWeight: 600,
                  }}
                >
                  Keycloak Example
                </Typography>
                <Typography variant="h5">Demo Application</Typography>
                {!user && (
                  <>
                    <Button onClick={() => login({ idpHint: "idir" })}>
                      LOGIN WITH IDIR
                    </Button>
                  </>
                )}
                <Button onClick={() => getTest()}>
                  Test Protected Route Response
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
