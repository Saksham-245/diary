import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { format } from "date-fns";
import supabase from "../utils/supabase";
import NavBar from "../components/NavBar/NavBar";
import Add from "../components/ButtonAdd/Add";
import Quote from "../components/Quote/Quote";
import Cards from "../components/Cards/Cards";

const useStyles = makeStyles((theme) => ({
  spanText: {
    marginTop: theme.spacing(25),
    textAlign: "center",
    color: "gray",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("supabase.auth.token"));
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const anchor = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchDiaries = async () => {
    let { data, error } = await supabase
      .from("diaries")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error);
    setDiaries(data);
  };

  const fetchQuote = async () => {
    try {
      axios
        .get("https://quotes.rest/qod?language=en")
        .then((res) => {
          const { author, quote } = res.data.contents.quotes[0];
          setQuote(quote);
          setAuthor(author);
        })
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  };

  if (quote === "" && author === "") {
    fetchQuote();
  }

  useEffect(() => {
    fetchDiaries();
    return;
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    history.replace("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  // eslint-disable-next-line
  const handleSave = async () => {
    if (note === "") {
      setError(true);
      setOpen(true);
    } else {
      setOpen(false);
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase.from("diaries").insert([
        {
          user_id: userData.currentSession.user.id,
          note: note,
          inserted_at: selectedDate,
        },
      ]);
      if (error) console.error(error);
      setNote("");
      fetchDiaries();
    }
  };

  return (
    <div className="dashboard">
      {userData ? (
        <div>
          <NavBar
            open={anchor}
            handleMenu={handleMenu}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogout={handleLogout}
            name={userData.currentSession.user.user_metadata.full_name}
            imageUrl={userData.currentSession.user.user_metadata.avatar_url}
          />
          <Quote quote={quote} author={author} />
          <Add
            handleClickOpen={handleClickOpen}
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
            handleDateChange={(date) => setSelectedDate(date)}
            selectedDate={selectedDate}
            handleNoteChange={(e) => setNote(e.target.value)}
            note={note}
            error={error}
            helperText={error ? "Please fill this field" : null}
          />
          <div className="cards">
            {diaries.length ? (
              diaries.map((todo) => {
                return (
                  <Cards
                    key={todo.id}
                    note={todo.note}
                    date={format(new Date(todo.inserted_at), "dd/MM/yyyy")}
                  />
                );
              })
            ) : (
              <span className={classes.spanText}>
                Hello {userData.currentSession.user.user_metadata.full_name} you
                don't have diary note for now!
              </span>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Dashboard;
