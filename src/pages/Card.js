import * as React from "react";
import Card from "@mui/material/Card";
import ReactPlayer from "react-player";
import { Typography } from "@mui/material";
import videoloss from "../images/videoloss.png";
import axios from "axios";

export default function MediaCard(props) {
  const { name, url, initUrl } = props.row;
  const { height } = props;

  const [error, setError] = React.useState(false);

  function handleError() {
    console.log("error");
    setError(true);
  }
  React.useEffect(() => {
    initStream();
  }, []);

  async function initStream() {
    try {
      await axios.get(initUrl);
    } catch (e) {
      console.error(e);
    }
  }

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        // initStream()
        setError(false)
      }, 5000)
    }
  }, [error])

  return (
    <Card
      sx={{
        width: "100%",
        height: height+100,
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
      elevation={12}
    >
      <Typography
        py={2}
        fontSize={12}
        fontWeight={"bold"}
        textOverflow={"ellipsis"}
      >
        {name}
      </Typography>

      {error ? (
        <img src={videoloss} height={height} width={"100%"} alt="error-page" />
      ) : (
        <ReactPlayer
          url={url}
          className="launch-video"
          muted
          playing={true}
          width="100%"
          height={height}
          onError={() => handleError()}
        // onEnablePIP={}
        />
      )}

    </Card>
  );
}