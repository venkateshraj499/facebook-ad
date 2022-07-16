import React from "react";
import { makeStyles, TextareaAutosize, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_POSTS } from "../queries/GET_ALL_POSTS";
import { GET_ADS_BY_USER } from "../queries/GET_ADS_BY_USER";
import Post from "./Post";
import PulseLoader from "react-spinners/ClipLoader";
import { ADD_POST } from "../queries/ADD_POST";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    padding: "10px",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "-2px 1px 9px 0px rgba(0,0,0,0.75)",
  },
  textAreaWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    width: "50%",
    marginTop: "30px",
    padding: "15px",
    margin: "15px",
  },
  logoutBtn: {
    height: "30px",
  },
  loader: {
    color: "#3f51b5",
    marginLeft: "50%",
    marginTop: "50px",
    transform: "translateX(-50%)",
  },
}));

function User() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  let message = "";
  const history = useHistory();
  const adsQueryHeader = {
    ignore: user.ignored_ad,
    country: user.country,
    gender: user.gender,
    age: user.age,
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(true);
  };

  const updateCache = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: GET_ALL_POSTS,
    });
    const updatedData = data.insert_post.returning[0];

    console.log(updatedData, currentValue, "update");
    cache.writeQuery({
      query: GET_ALL_POSTS,
      data: { post: [updatedData, ...currentValue.post] },
    });
  };

  const postTrigger = () => {
    const postHeader = {
      author_name: user.name,
      created_by: user.id,
      content: message,
    };
    addPost({ variables: postHeader });
  };

  const postResponse = useQuery(GET_ALL_POSTS);
  const adsResponse = useQuery(GET_ADS_BY_USER, { variables: adsQueryHeader });
  const [addPost] = useMutation(ADD_POST, { update: updateCache });

  const postLoading = postResponse.loading;
  const postData = postResponse.data ?? null;
  const postError = postResponse.error;

  const adsLoading = adsResponse.loading;
  const adsData = adsResponse.data ?? null;
  const adsError = adsResponse.error;

  if (postLoading || adsLoading)
    return <PulseLoader className={classes.loader} />;
  if (postError || adsError) return <>Sorry Unexpected error occured</>;
  const data = shuffle(postData.post.concat(adsData.ads));
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3 className={classes.heading}>{`Welcome ${user.name}`}</h3>
        <Button
          className={classes.logoutBtn}
          color="primary"
          variant="contained"
          onClick={() => handleLogout()}
        >
          LOGOUT
        </Button>
      </div>
      <div className={classes.textAreaWrapper}>
        <h1>Post Your Message</h1>
        <TextareaAutosize
          placeholder="Write your message here....."
          className={classes.textArea}
          minRows="5"
          onChange={(event) => (message = event.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => postTrigger()}
        >
          POST
        </Button>
      </div>
      {data.map((item, i) => {
        return (
          <Post
            key={`post${i + 1}`}
            post={item}
            isAd={item.company ? true : false}
            userId={user.id}
          />
        );
      })}
    </div>
  );
}

export default User;
