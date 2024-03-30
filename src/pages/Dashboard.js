import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
// import MediaCard from './Card';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Menu,
  Paper,
  Popper,
} from "@mui/material";
import entry from "../images/entry.png";
import exit from "../images/exit.png";
import reentry from "../images/recycle.png";
// import
import logo from "../images/navajna_logo.svg";
// eslint-disable-next-line
import axios from "axios";
import MediaCard from "./Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import html2pdf from 'html2pdf.js';
import generatePDF from "react-to-pdf";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
// import { BarChart } from '@mui/x-charts';
import PersonIcon from "@mui/icons-material/Person";
import GraphicalAnalytics from "./GraphicalAnalytics";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://mui.com/"
        sx={{ fontSize: 12, fontWeight: "bold" }}
      >
        Navajna Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const width = window.innerWidth / 1.6;
  const [singleScreen, setSingleScreen] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const componentRef = React.useRef();
  const [display, setDisplay] = React.useState("none");

  const [currentTime, setCurrentTime] = React.useState(new Date().getHours());
  // const [timeRemaining, setTimeRemaining] = React.useState(
  //   new Date().getSeconds()
  // );
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosee = () => {
    setAnchorEl(null);
  };
  const [activeButton, setActiveButton] = React.useState("Home");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const handleLogout = () => {
    // Handle logout logic here
    navigate("/");
    console.log("Logout clicked");
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getHours());
      // setTimeRemaining(new Date().getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setDisplay("");
    console.log(currentTime);
  }, [currentTime]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleChangePage = (right) => {
    console.log(right);
    right ? setPage(page + 1) : setPage(page - 1);
  };

  // eslint-disable-next-line
  const [data, setData] = React.useState({
    entry: 0,
    exit: 0,
    // reentry: 0,
  });
  React.useEffect(() => {
    setInterval(async () => {
      try {
        const file_path = await axios.get("http://127.0.0.1:5000/jsondata");
        const res = await axios.get(
          `http://127.0.0.1:5000/${file_path.data["file_path"]}`
        );
        console.log(res.data[0]["Entry_Data"]);
        setData((prev) => {
          if (res.data[0]["Entry_Data"] !== 0 || res.data[0]["Exit_Data"] !== 0)
            return {
              entry:
                res.data[0]["Entry_Data"] === 0
                  ? prev.entry
                  : res.data[0]["Entry_Data"],
              exit:
                res.data[0]["Exit_Data"] === 0
                  ? prev.entry
                  : res.data[0]["Exit_Data"],
            };
          else
            return {
              entry: prev.entry,
              exit: prev.entry,
            };
        });
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }, []);

  // const cameras = [
  //   {
  //     name: "Gate A-E1",
  //     url: " http://127.0.0.1:5000/static/output/gatea/E1/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gatea/0",
  //     shortName: "E1",
  //   },
  //   {
  //     name: "Gate A-E2",
  //     url: "http://127.0.0.1:5000/static/output/gatea/E2/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gatea/1",
  //     shortName: "E2",
  //   },
  //   {
  //     name: "Gate B-E1",
  //     url: "http://127.0.0.1:5000/static/output/gateb/E1/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gateb/0",
  //     shortName: "E1",
  //   },
  //   {
  //     name: "Gate B-E2",
  //     url: "http://127.0.0.1:5000/static/output/gateb/E2/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gateb/1",
  //     shortName: "E2",
  //   },
  //   {
  //     name: "Gate B-E3",
  //     url: "http://127.0.0.1:5000/static/output/gateb/E3/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gateb/2",
  //     shortName: "E3",
  //   },
  //   {
  //     name: "Gate B-E4",
  //     url: "http://127.0.0.1:5000/static/output/gateb/E4/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_gateb/3",
  //     shortName: "E4",
  //   },
  //   {
  //     name: "Gallery Falcon-E1",
  //     url: "http://127.0.0.1:5000/static/output/falcon/E1/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_falcon/0",
  //     shortName: "E1",
  //   },
  //   {
  //     name: "Gallery Freezone-E1",
  //     url: "http://127.0.0.1:5000/static/output/freezone/E1/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_freezone/0",
  //     shortName: "E1",
  //   },
  //   {
  //     name: "Gallery Royal-E1",
  //     url: "http://127.0.0.1:5000/static/output/royal/E1/stream.m3u8",
  //     initUrl: "127.0.0.1:5000/video_feed_royal/0",
  //     shortName: "E1",
  //   },
  // ];
  const cameras = [
    {
      name: "Gate A - E2",
      initUrl: "http://127.0.0.1:5000/video_gatea_e1",
      url: "http://127.0.0.1:5000/static/output/gatea/E1/stream.m3u8",
    },
    {
      name: "Gate B - E2",
      initUrl: "http://127.0.0.1:5000/video_gateb_e1",
      url: "http://127.0.0.1:5000/static/output/gateb/E1/stream.m3u8",
    },
    {
      name: "Gate B - E3",
      initUrl: "http://127.0.0.1:5000/video_gatec_e3",
      url: "http://127.0.0.1:5000/static/output/gatec/E3/stream.m3u8",
    },
    {
      name: "Gate B - E4",
      initUrl: "http://127.0.0.1:5000/video_gated_e2",
      url: "http://127.0.0.1:5000/static/output/gated/E2/stream.m3u8",
    },
    {
      name: "Gate C - E1",
      initUrl: "http://127.0.0.1:5000/video_imax_e1",
      url: "http://127.0.0.1:5000/static/output/imax/E1/stream.m3u8",
    },
    {
      name: "Gate C - E2",
      initUrl: "http://127.0.0.1:5000/video_gate_royal",
      url: "http://127.0.0.1:5000/static/output/royal/E1/stream.m3u8",
    },
    {
      name: "Gate C - E4",
      initUrl: "http://127.0.0.1:5000/video_gate_freezone",
      url: "http://127.0.0.1:5000/static/output/freezone/E1/stream.m3u8",
    },
    {
      name: "Gate D - E1",
      initUrl: "http://127.0.0.1:5000/video_gate_falcon",
      url: "http://127.0.0.1:5000/static/output/falcon/E1/stream.m3u8",
    },
    {
      name: "IMAX - E2",
      initUrl: "http://127.0.0.1:5000/video_gate_falcon_new",
      url: "http://127.0.0.1:5000/static/output/falcon_new/E1/stream.m3u8",
    },
  ];
  React.useEffect(() => {
    // setInterval(() => setDisplay(''), 5000)
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line
    // display === "" && downloadPdf();
    if (display == "") {
      downloadPdf();
    }
  }, [display]);

  const downloadPdf = () => {
    const date = new Date();
    const options = {
      directory: "Document",
      filename: `Occupancy_${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}-${date.getHours() + "AM"}_Report.pdf`,
      page: {
        margin: 20,
      },
    };
    generatePDF(componentRef, options);
    setDisplay("none");
  };

  //

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box>
          {/* <CssBaseline /> */}
          <AppBar
            position="absolute"
            sx={{ backgroundColor: "white" }}
            elevation={1}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <img src={logo} alt="navajna technology" width={90} height={30} />

              {/* <Typography color={"black"} fontSize={12} fontWeight={"bold"}>
                {60 - timeRemaining}-seconds
              </Typography> */}
              <div onMouseEnter={handleMouseEnter}>
                <IconButton>
                  <AccountCircle sx={{ fontSize: "40px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClosee}
                >
                  <MenuItem onClick={handleLogout}>
                    <Logout />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Toolbar />
          {/* <Paper elevation={5} sx={{ mt: 2, mx: 3.5, p: 2 }}>
            <Button
              sx={{
                fontWeight: "700",
                textDecoration: activeButton === "Home" ? "underline" : "none",
                textUnderlineOffset: activeButton === "Home" ? "5px" : "none",
                color: activeButton === "Home" ? "" : "rgb(90, 90, 90)",
              }}
              onClick={() => handleButtonClick("Home")}
            >
              Home
            </Button>
            <Button
              sx={{
                fontWeight: "700",
                textDecoration:
                  activeButton === "Graphical Analytics" ? "underline" : "none",
                textUnderlineOffset:
                  activeButton === "Graphical Analytics" ? "5px" : "none",
                color:
                  activeButton === "Graphical Analytics"
                    ? ""
                    : "rgb(90, 90, 90)",
              }}
              onClick={() => handleButtonClick("Graphical Analytics")}
            >
              Graphical Analytics
            </Button>
          </Paper> */}
          <Paper
            elevation={5}
            sx={{ mt: 2, mx: activeButton === "Home" ? 3.5 : 0.5, p: 2 }}
          >
            <Button
              sx={{
                fontWeight: "700",
                textDecoration: activeButton === "Home" ? "underline" : "none",
                textUnderlineOffset: activeButton === "Home" ? "5px" : "none",
                color: activeButton === "Home" ? "" : "rgb(90, 90, 90)",
              }}
              onClick={() => handleButtonClick("Home")}
            >
              Home
            </Button>
            <Button
              sx={{
                fontWeight: "700",
                textDecoration:
                  activeButton === "Graphical Analytics" ? "underline" : "none",
                textUnderlineOffset:
                  activeButton === "Graphical Analytics" ? "5px" : "none",
                color:
                  activeButton === "Graphical Analytics"
                    ? ""
                    : "rgb(90, 90, 90)",
              }}
              onClick={() => handleButtonClick("Graphical Analytics")}
            >
              Graphical Analytics
            </Button>
          </Paper>
          {/* Render different pages/sections based on the activeButton state */}
          {activeButton === "Home" && (
            <>
              <Grid container rowSpacing={2} p={4} pt={8}>
                <Card
                  elevation={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize={20} fontWeight={"bold"}>
                      Count Analytics
                    </Typography>

                    {/* <Button
                  onClick={() => setDisplay("")}
                  startIcon={<PictureAsPdfIcon />}
                /> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    pt={3}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Card
                      elevation={8}
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                        justifyContent: "center",
                        width: `${width / 3}px`,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={entry}
                        sx={{ width: 56, height: 56 }}
                      />
                      &emsp;
                      {/* <Typography>{data.entry}</Typography> */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        Entry Count: <span>{data.entry}</span>
                      </Typography>
                    </Card>
                    &emsp;
                    <Card
                      elevation={8}
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                        justifyContent: "center",
                        width: `${width / 3}px`,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={exit}
                        sx={{ width: 56, height: 56 }}
                      />
                      &emsp;
                      {/* <Typography>{data.entry}</Typography> */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        Exit Count: <span>{data.exit}</span>
                      </Typography>
                    </Card>
                    &emsp;
                    {/* <Card
                  elevation={8}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    width: `${width / 3}px`,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={reentry}
                    sx={{ width: 56, height: 56 }}
                  />
                  &emsp;
                  <Typography>{data.entry}</Typography>
                </Card> */}
                    &emsp;
                  </Grid>
                </Card>

                <Grid
                  container
                  ref={componentRef}
                  padding={5}
                  display={display}
                >
                  <Toolbar sx={{ p: 0 }}>
                    <img src={logo} alt="navajna technology" height={30} />
                  </Toolbar>
                  <Toolbar />
                  <Grid
                    item
                    xs={12}
                    py={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderTop: "1px solid grey",
                    }}
                  >
                    <Typography fontSize={20} fontWeight={"bold"}>
                      Count Analytics
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"flex-start"}
                  >
                    <Card
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                        justifyContent: "center",
                        width: `${width / 3}px`,
                        border: "1px solid grey",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={entry}
                        sx={{ width: 56, height: 56 }}
                      />
                      &emsp;
                      {/* <Typography>{data.entry}</Typography> */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        Entry Count: <span>{data.entry}</span>
                      </Typography>
                    </Card>
                    &emsp;
                    <Card
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                        justifyContent: "center",
                        width: `${width / 3}px`,
                        border: "1px solid grey",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={exit}
                        sx={{ width: 56, height: 56 }}
                      />
                      &emsp;
                      {/* <Typography>{data.entry}</Typography> */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        Exit Count: <span>{data.exit}</span>
                      </Typography>
                    </Card>
                    &emsp;
                    {/* <Card
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    width: `${width / 3}px`,
                    border: "1px solid grey",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={reentry}
                    sx={{ width: 56, height: 56 }}
                  />
                  &emsp;
                  <Typography>{data.entry}</Typography>
                </Card> */}
                    &emsp;
                  </Grid>
                  <Box
                    sx={{
                      borderTop: "1px solid grey",
                      marginTop: "calc(10% + 60px)",
                      width: "100%",
                      bottom: 0,
                      backgroundColor: "#fff",
                      fontSize: 12,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <Copyright sx={{ pt: 4 }} />
                  </Box>
                </Grid>

                <Grid
                  component={Paper}
                  elevation={5}
                  mt={2}
                  pb={2}
                  item
                  xs={12}
                  px={3}
                  sx={{ display: "flex", alignItems: "space-between" }}
                >
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography fontSize={20} fontWeight={"bold"}>
                        Cameras
                      </Typography>
                      <Card
                        elevation={0}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        {!singleScreen && (
                          <ButtonGroup
                            variant="contained"
                            ref={anchorRef}
                            aria-label="Button group with a nested menu"
                            disabled={singleScreen}
                          >
                            <Button disabled>
                              <Typography fontSize={12}>
                                {cameras[selectedIndex].name}
                              </Typography>
                            </Button>
                            <Button
                              ref={anchorRef}
                              size="small"
                              aria-controls={
                                open ? "split-button-menu" : undefined
                              }
                              aria-expanded={open ? "true" : undefined}
                              aria-label="select merge strategy"
                              aria-haspopup="menu"
                              onClick={handleToggle}
                            >
                              <ArrowDropDownIcon />
                            </Button>
                          </ButtonGroup>
                        )}
                        <Button onClick={() => setSingleScreen(!singleScreen)}>
                          <ViewColumnIcon
                            sx={{ color: !singleScreen ? "grey" : "primary" }}
                          />
                        </Button>
                        <Popper
                          sx={{
                            zIndex: 1,
                          }}
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    id="split-button-menu"
                                    autoFocusItem
                                  >
                                    {cameras.map((option, index) => (
                                      <MenuItem
                                        key={option}
                                        // disabled={index === 2}
                                        selected={index === selectedIndex}
                                        onClick={(event) =>
                                          handleMenuItemClick(event, index)
                                        }
                                      >
                                        {option.name}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </Card>
                    </Grid>
                    {singleScreen ? (
                      cameras.slice(page * 3, page * 3 + 3).map((row, idx) => (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <MediaCard id={idx} row={row} height={300} />
                        </Grid>
                      ))
                    ) : (
                      <Grid
                        px={2}
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <MediaCard row={cameras[selectedIndex]} height={500} />
                      </Grid>
                    )}
                    <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                      {singleScreen && (
                        <Grid
                          item
                          xs={12}
                          px={3}
                          display={"flex"}
                          justifyContent={"end"}
                        >
                          <Card
                            elevation={0}
                            sx={{
                              p: 1,
                              display: "flex",
                              justifyContent: "end",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              onClick={() => handleChangePage(false)}
                              disabled={page === 0 && true}
                            >
                              <ArrowBackIosIcon sx={{ fontSize: 15 }} />
                            </Button>
                            <Button
                              onClick={() => handleChangePage(false)}
                              disabled
                            >
                              <Typography
                                fontSize={12}
                                fontWeight={"bold"}
                                color={"grey"}
                              >
                                {page * 3 + 1}-
                                {page * 3 +
                                  cameras.slice(page * 3, page * 3 + 3).length}
                              </Typography>
                            </Button>
                            <Button
                              onClick={() => handleChangePage(true)}
                              disabled={
                                (page + 1) * 3 >= cameras.length && true
                              }
                            >
                              <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
                            </Button>
                          </Card>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {activeButton === "Graphical Analytics" && (
            <Box sx={{ pt: 3 }}>
              <GraphicalAnalytics />
            </Box>
          )}
          <Box
            sx={{
              marginTop: "calc(10% + 60px)",
              width: "100%",
              bottom: 0,
              backgroundColor: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Copyright sx={{ pt: 4 }} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
// {
//   name: "Gate C-E1",
//   url: "http://127.0.0.1:5000/static/output/stream7.m3u8",
// },
// {
//   name: "Gate C-E2",
//   url: "http://127.0.0.1:5000/static/output/stream8.m3u8",
// },
// {
//   name: "Gate C-E3",
//   url: "http://127.0.0.1:5000/static/output/stream9.m3u8",
// },
// {
//   name: "Gate C-E4",
//   url: "http://127.0.0.1:5000/static/output/stream10.m3u8",
// },
// {
//   name: "Gate D-E1",
//   url: "http://127.0.0.1:5000/static/output/stream11.m3u8",
// },
// {
//   name: "Gate D-E2",
//   url: "http://127.0.0.1:5000/static/output/stream12.m3u8",
// },
// {
//   name: "Gallery IMAX-E1",
//   url: "http://127.0.0.1:5000/static/output/stream13.m3u8",
// },
// {
//   name: "Gallery IMAX-E2",
//   url: "http://127.0.0.1:5000/static/output/stream14.m3u8",
// },
