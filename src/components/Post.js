import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_VISITED } from "../queries/UPDATE_VISITED";
import { UPDATE_IGNORE } from "../queries/UPDATE_IGNORE";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "80%",
    margin: "0 auto",
    border: "0.5px solid gray",
    borderRadius: "6px",
    marginTop: "50px",
    position: "relative",
  },
  sponsor: {
    position: "absolute",
    top: "-15px",
    left: "5px",
    padding: "2px 10px",
    fontWeight: "600",
    color: "black",
    borderRadius: "6px",
    background: "orange",
  },
  ignore: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    padding: "2px 10px",
    fontWeight: "600",
    color: "black",
    borderRadius: "6px",
    background: "lightblue",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  detail: {
    padding: "20px 10px",
    fontWeight: "600",
  },
  contentWrapper: {
    padding: "20px",
    display: "flex",
  },
  contentHeading: {
    fontWeight: "600",
  },
  content: {
    paddingLeft: "10px",
  },
  link: {
    padding: "20px",
    textDecoration: "none",
    color: "blue",
  },
}));

function User({ post, isAd, userId }) {
  const classes = useStyles();
  const [updateVisited] = useMutation(UPDATE_VISITED);
  const [updateIgnore] = useMutation(UPDATE_IGNORE);
  const updateHeader = {
    id: post.id,
    visited: post.visited + 1,
  };

  const ignore = () => {
    const ignoreHeader = {
      id: userId,
      ignore: post.id,
    };
    const confirm = window.confirm("Do you want to remove the AD");
    console.log(confirm, "confirm");
    if (confirm) {
      updateIgnore({
        variables: ignoreHeader,
      });
    }
    window.alert("The selected Ad will not appear again");
  };

  return (
    <div className={classes.wrapper}>
      {!isAd ? (
        <>
          {" "}
          <div className={classes.header}>
            <div
              className={classes.detail}
            >{`Posted by : ${post.author_name.toUpperCase()}`}</div>
            <div
              className={classes.detail}
            >{`Written on : ${post.created_at}`}</div>
          </div>
          <Divider />
          <div className={classes.contentWrapper}>
            <div className={classes.contentHeading}>Content :</div>
            <div className={classes.content}>{post.content}</div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className={classes.sponsor}>Sponsored</div>
          <div className={classes.header}>
            <div
              className={classes.detail}
            >{`Posted by : ${post.company_name.toUpperCase()}`}</div>
            <a
              target="_blank"
              rel="noreferrer"
              href={post.link}
              className={classes.link}
              onClick={() => updateVisited({ variables: updateHeader })}
            >{`VISIT SITE ->`}</a>
          </div>
          <Divider />
          <div className={classes.contentWrapper}>
            <div className={classes.contentHeading}>Content :</div>
            <div className={classes.content}>{post.content}</div>
          </div>
          <div className={classes.ignore} onClick={() => ignore()}>
            Not Interested ?
          </div>
        </>
      )}
    </div>
  );
}

export default User;
