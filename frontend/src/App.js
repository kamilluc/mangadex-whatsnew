import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/mangas");
      const data = await result.json();
      setMangas(data);
    };

    fetchData();
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="App">
      <h1>Mangas:</h1>
      <ul>
        {mangas.map((m) => (
          <li key={m.id}>
            <p>
              {m.name} -{" "}
              <a href={m.url} rel="noreferrer" target="_blank">
                URL
              </a>
              {m.imgUrl ? (
                <div>
                  <Button
                    aria-describedby={id}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Open Popover
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Typography className={classes.typography}>
                      <img src={m.imgUrl} alt={m.name} width={150} />
                    </Typography>
                  </Popover>
                </div>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
