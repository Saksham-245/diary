import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Fab, makeStyles, TextField,} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    fab: {
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(3),
        display: "flex",
        justifyContent: "flex-end",
        "@media(max-width:480px)": {
            marginRight: theme.spacing(2),
        },
    },
    textarea: {},
}));
const Add = (props) => {
    const {
        handleClickOpen,
        open,
        handleClose,
        handleSave,
        handleNoteChange,
        note,
        error,
        helperText,
    } = props;
    const classes = useStyles();
    return (
        <div>
            <div onClick={handleClickOpen} className={classes.fab}>
                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogContent className={classes.form}>
                    {/* <FormDate
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          /> */}
                    <TextField
                        className={classes.textarea}
                        id="standard-basic"
                        label="Note"
                        fullWidth={true}
                        value={note}
                        multiline
                        rows={5}
                        rowsMax={Infinity}
                        onChange={handleNoteChange}
                        error={error}
                        helperText={helperText}
                    />
                </DialogContent>
                <DialogActions className={classes.form}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Add;
