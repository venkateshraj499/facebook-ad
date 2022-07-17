import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/ClipLoader";
import Adstable from "./Table";
import { GET_ALL_ADS } from "../queries/GET_ALL_ADS";
import { GET_ALL_COMPANIES } from "../queries/GET_ALL_COMPANIES";
import { INSERT_ADS } from "../queries/INSERT_AD";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    padding: "10px",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "-2px 1px 9px 0px rgba(0,0,0,0.75)",
  },
  logoutBtn: {
    height: "30px",
  },
  userSelectorWrapper: {
    display: "flex",
    width: "fit-content",
    justifyContent: "center",
    borderBottom: "2px solid #3f51b5",
    margin: "20px auto 30px auto",
  },
  option: {
    cursor: "pointer",
    background: "#3f51b5",
    padding: "10px",
    color: "white",
    fontWeight: "600",
  },
  optionAdmin: {
    cursor: "pointer",
    padding: "10px",
    fontWeight: "600",
  },
  loader: {
    color: "#3f51b5",
    marginLeft: "50%",
    marginTop: "50px",
    transform: "translateX(-50%)",
  },
  text: {
    margin: "10px",
  },
  insertWrapper: {
    display: "flex",
    width: "80%",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  formoption: {
    display: "flex",
    justifyContent: "space-between",
  },
  formoption2: {
    display: "flex",
    margin: "15px",
  },
  number: {
    width: "40px",
    margin: "0px 10px",
  },
}));

function Admin() {
  const classes = useStyles();
  const history = useHistory();
  const [isAds, setIsAds] = React.useState(true);
  const country = ["india", "usa", "australia"];
  const [info, setInfo] = React.useState({
    company: null,
    content: null,
    link: null,
    status: null,
    target_country: [],
    target_gender: [],
    company_name: null,
    target_age_from: null,
    target_age_to: null,
  });

  const updateCache = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: GET_ALL_ADS,
    });
    const updatedData = data.insert_ads.returning[0];
    console.log(currentValue);
    cache.writeQuery({
      query: GET_ALL_ADS,
      data: { ads: [updatedData, ...currentValue.ads] },
    });
  };

  const handleChange = (event, key) => {
    if (key === "target_gender" || key === "target_country") {
      const value = event.target.value;
      const array = [...info[key]];
      if (array.includes(value)) {
        array.splice(array.indexOf(value), 1);
        setInfo((prev) => ({
          ...prev,
          [key]: array,
        }));
      } else {
        array.push(value);
        setInfo((prev) => ({
          ...prev,
          [key]: array,
        }));
      }
    } else if (key === "status") {
      setInfo((prev) => ({
        ...prev,
        [key]: event.target.value === "true",
      }));
    } else
      setInfo((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(true);
  };
  const { data, loading, error } = useQuery(GET_ALL_ADS);
  const response = useQuery(GET_ALL_COMPANIES);

  const [insertAd] = useMutation(INSERT_ADS, { update: updateCache });

  const compLoading = response?.loading ?? null;
  const compError = response?.error ?? null;
  const compData = response?.data ?? null;

  if (loading || compLoading) return <PulseLoader className={classes.loader} />;
  if (error || compError) return <>Sorry Unexpected error occured</>;
  if (data && compData) console.log(compData);
  return (
    <div className={classes.wrapper}>
      {" "}
      <div className={classes.header}>
        <h3 className={classes.heading}>{`Welcome Admin`}</h3>
        <Button
          className={classes.logoutBtn}
          color="primary"
          variant="contained"
          onClick={() => handleLogout()}
        >
          LOGOUT
        </Button>
      </div>
      <div className={classes.userSelectorWrapper}>
        <div
          className={isAds ? classes.option : classes.optionAdmin}
          onClick={() => setIsAds(!isAds)}
        >
          Advertisement
        </div>
        <div
          className={isAds ? classes.optionAdmin : classes.option}
          onClick={() => setIsAds(!isAds)}
        >
          Company
        </div>
      </div>
      {isAds ? (
        <>
          <Adstable data={data.ads} />
          <form>
            <h1 align="center">Insert New Advertisement </h1>
            <div className={classes.insertWrapper}>
              <div>
                {" "}
                <div className={classes.formoption}>
                  <label>Company Id :</label>
                  <input
                    onChange={(event) => handleChange(event, "company")}
                    className={classes.text}
                    type="text"
                  />
                </div>
                <div className={classes.formoption}>
                  <label>Company Name :</label>
                  <input
                    onChange={(event) => handleChange(event, "company_name")}
                    className={classes.text}
                    type="text"
                  />
                </div>
                <div className={classes.formoption}>
                  <label>Content :</label>
                  <input
                    onChange={(event) => handleChange(event, "content")}
                    className={classes.text}
                    type="text"
                  />
                </div>
                <div className={classes.formoption}>
                  <label>Link :</label>
                  <input
                    onChange={(event) => handleChange(event, "link")}
                    className={classes.text}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>
                  {" "}
                  <div className={classes.formoption2}>
                    {" "}
                    <label>Status :</label>
                    <div>
                      <input
                        onChange={(event) => handleChange(event, "status")}
                        type="radio"
                        value={true}
                        name="status"
                      />
                      <label>Active</label>
                      <input
                        onChange={(event) => handleChange(event, "status")}
                        type="radio"
                        value={false}
                        name="status"
                      />
                      <label>In Active</label>
                    </div>
                  </div>
                  <div className={classes.formoption2}>
                    <label>Target Gender :</label>
                    <div>
                      <input
                        onChange={(event) =>
                          handleChange(event, "target_gender")
                        }
                        type="checkbox"
                        value="male"
                        name="gender"
                      />
                      <label>Male</label>
                      <input
                        onChange={(event) =>
                          handleChange(event, "target_gender")
                        }
                        type="checkbox"
                        value="female"
                        name="gender"
                      />
                      <label>Female</label>
                    </div>
                  </div>
                  <div className={classes.formoption2}>
                    <label>Target Age :</label>
                    <div>
                      {" "}
                      <label>From</label>
                      <input
                        onChange={(event) =>
                          handleChange(event, "target_age_from")
                        }
                        className={classes.number}
                        type="number"
                      />
                      <label>To</label>
                      <input
                        onChange={(event) =>
                          handleChange(event, "target_age_to")
                        }
                        className={classes.number}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className={classes.formoption2}>
                    <label>Target Country :</label>
                    <div>
                      {country.map((item, i) => (
                        <>
                          <input
                            onChange={(event) =>
                              handleChange(event, "target_country")
                            }
                            name="country"
                            type="checkbox"
                            value={item}
                          />
                          <label>{item.toUpperCase()}</label>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => insertAd({ variables: info })}
                color="primary"
                variant="contained"
              >
                Insert
              </Button>
            </div>
          </form>
        </>
      ) : (
        <Adstable data={compData.client_company} isComp={true} />
      )}
    </div>
  );
}

export default Admin;
