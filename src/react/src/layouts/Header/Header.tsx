import { useKeycloak } from "@bcgov/kc-react";
import {
  DataObject as DataObjectIcon,
  ErrorOutline as ErrorIcon,
  KeyboardArrowDown as DownIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import AlertIcon from "@mui/icons-material/AddAlert";
import KeyIcon from "@mui/icons-material/Key";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { InitialsAvatar } from "components";
import { Modal, Notify } from "components/common";
import React, { MouseEvent, useState } from "react";
import { To, useNavigate } from "react-router";

import sx from "./styles";

const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUserDropdown, setAnchorElUserDropdown] =
    useState<HTMLElement | null>(null);
  const [keycloakModalOpen, setKeycloakModalOpen] = useState<boolean>(false);
  const [testError, setTestError] = useState(false);
  const {
    state: authState,
    logout,
    getAuthorizationHeaderValue,
    hasRole,
  } = useKeycloak();
  const configuration = (window as Window).configuration;

  const user = authState.userInfo;

  const handleOpenNavMenu = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path: To) => () => {
    navigate(path);
  };

  const TestError = () => {
    throw new Error("An error was thrown to test ErrorBoundary.");
    return <></>;
  };

  const LogoAndTitle = () => {
    return (
      <>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", flexGrow: 1 }}
        >
          Keycloak Example
        </Typography>
      </>
    );
  };

  const KeycloakTestModal = () => {
    const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
    const [notifyMessage, setNotifyMessage] = useState<string>("");
    const [hasRoleInput, setHasRoleInput] = useState<string | null>(null);
    return (
      <Modal
        title="Keycloak SSO"
        open={keycloakModalOpen}
        onClose={() => setKeycloakModalOpen(false)}
        width="content-fit"
        maxHeight="800px"
      >
        <Typography sx={{ mb: 1, fontWeight: 700 }}>User:</Typography>
        <Box>
          {user &&
            Object.entries(user).map(([key, value]: [string, unknown]) => (
              <Stack direction="row" spacing={1} key={key}>
                <Typography fontSize={12}>{key}:</Typography>
                <Typography fontSize={12}>{value as string}</Typography>
              </Stack>
            ))}
        </Box>

        <Stack direction="row">
          <IconButton
            onClick={() => {
              setNotifyMessage(getAuthorizationHeaderValue());
              setNotifyOpen(true);
            }}
          >
            <AlertIcon sx={{ color: "#0ba4e6" }} />
          </IconButton>
          <Typography sx={{ alignSelf: "center" }}>
            Test getAuthorizationHeaderValue()
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconButton
            onClick={() => {
              if (hasRoleInput) {
                setNotifyMessage(
                  hasRole(hasRoleInput) ? "true (Yes)" : "false (No)"
                );
                setNotifyOpen(true);
              }
            }}
          >
            <AlertIcon sx={{ color: "#0ba4e6" }} />
          </IconButton>
          <Typography sx={{ alignSelf: "center", mr: 1 }}>
            Test hasRole(role) - role:
          </Typography>
          <Input
            value={hasRoleInput}
            onChange={(event) => setHasRoleInput(event?.target.value)}
          />
        </Stack>

        <Notify
          type="info"
          message={notifyMessage}
          open={notifyOpen}
          onClose={() => setNotifyOpen(false)}
        />
      </Modal>
    );
  };

  const AccountDropdownMenu = () => {
    return (
      <Menu
        anchorEl={anchorElUserDropdown}
        open={!!anchorElUserDropdown}
        onClose={() => {
          setAnchorElUserDropdown(null);
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        PaperProps={{
          style: {
            transformOrigin: "left",
            transform: "translateX(-70px)",
          },
        }}
      >
        <Divider />
        <MenuItem>
          <ListItemText>Roles: {user?.client_roles ?? "None"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setKeycloakModalOpen(true)}>
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText>Test Keycloak</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => alert(JSON.stringify(configuration))}>
          <ListItemIcon>
            <DataObjectIcon />
          </ListItemIcon>
          <ListItemText>Alert Config</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setTestError(true)}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText>Test Error</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Box sx={sx.headerContainer}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={sx.appBar}
      >
        <Toolbar>
          {/** SMALL SCREEN */}
          <Box sx={sx.smallScreenToolbar}>
            <LogoAndTitle />
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup={true}
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleNavigate("/profile")}>
                    <Typography textAlign="center">
                      {user.given_name}
                      &nbsp;
                      {user.family_name}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              ""
            )}
          </Box>
          {/** LARGE SCREEN */}
          <Box sx={sx.largeScreenToolbar}>
            <LogoAndTitle />
            {user ? (
              <Stack direction="row" spacing={3}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "transparent !important",
                  }}
                  onClick={(e) => setAnchorElUserDropdown(e.currentTarget)}
                  endIcon={<DownIcon />}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                >
                  <InitialsAvatar />
                  &nbsp; &nbsp;
                  {user.given_name}
                  &nbsp;
                  {user.family_name}
                </Button>
              </Stack>
            ) : (
              ""
            )}
            <AccountDropdownMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <KeycloakTestModal />
      {testError && <TestError />}
    </Box>
  );
};

export default Header;
