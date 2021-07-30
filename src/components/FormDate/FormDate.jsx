import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";

const FormDate = ({ handleDateChange, selectedDate }) => {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Choose Date"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default FormDate;
