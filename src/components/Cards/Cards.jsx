import {makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cardSpacer: {
        marginTop: theme.spacing(2),
    },
    card: {
        paddingTop: 15,
        paddingBottom: 25,
        marginTop: 10,
        [theme.breakpoints.down("sm")]: {
            paddingBottom: 5,
            paddingTop: 5,
            marginTop: 2,
        },
    },
    title: {
        fontSize: "1rem",
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.1rem",
        },
    },
}));

const Cards = ({note, date}) => {
    const classes = useStyles();
    return (
        <div className={classes.cardSpacer}>
            <Paper elevation={3} className={classes.card}>
                <Typography variant="body1" component="p" className={classes.title}>
                    {note}
                </Typography>
                <Typography variant="h5" component="h5" className={classes.title}>
                    Noted on {date}
                </Typography>
            </Paper>
        </div>
    );
};

export default Cards;
