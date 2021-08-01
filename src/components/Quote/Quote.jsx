/* eslint-disable jsx-a11y/no-distracting-elements */
import { Typography } from "@material-ui/core";
import React from "react";
import "../Quote/Quote.css";

const Quote = ({ quote, author }) => {
  return (
    <div className="quote-title">
      <div class="quote">
        <Typography
          variant="subtitle1"
          component="p"
          style={{ textAlign: "center" }}
        >
          Today Quote: {quote} By: {author}
        </Typography>
      </div>
    </div>
  );
};

export default Quote;
