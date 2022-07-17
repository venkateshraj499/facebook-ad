import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  TableContainer,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_AD } from "../queries/UPDATE_AD";
import { DELETE_AD } from "../queries/DELETE_AD";
import { GET_ALL_ADS } from "../queries/GET_ALL_ADS";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "80%",
    margin: "0 auto",
  },
  id: {
    color: "#3f51b5",
    cursor: "pointer",
  },
  formWrapper: {
    padding: "15px",
  },
  option: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "15px",
  },
  title: {
    fontWeight: "600",
    fontSize: "18px",
    minWidth: "150px",
  },
  textArea: {
    padding: "10px",
    marginLeft: "10px",
  },
  text: {
    width: "200px",
    color: "#3f51b5",
  },
  age: {
    width: "30px",
  },
  btn: {
    margin: "15px",
  },
}));
function Adstable({ data, isComp = false }) {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(false);
  const country = ["india", "usa", "australia"];
  const keys = isComp
    ? ["ID", "Company"]
    : ["ID", "Company", "Content", "Link", "Status", "Visited"];

  const updateCache = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: GET_ALL_ADS,
    });
    const updatedData = data.update_ads_by_pk;
    const temp = [...currentValue.ads];
    currentValue.ads.forEach((item, i) => {
      if (item.id === updatedData.id) {
        temp[i] = updatedData;
      }
    });
    console.log(temp, updatedData);
    cache.writeQuery({
      query: GET_ALL_ADS,
      data: {
        ads: temp,
      },
    });
  };
  const deleteCache = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: GET_ALL_ADS,
    });
    const deletedId = data.delete_ads_by_pk.id;
    console.log(currentValue.ads.filter((item) => item.id !== deletedId));
    cache.writeQuery({
      query: GET_ALL_ADS,
      data: {
        ads: currentValue.ads.filter((item) => item.id !== deletedId),
      },
    });
  };
  const [updateAd] = useMutation(UPDATE_AD, { update: updateCache });
  const [deleteAd] = useMutation(DELETE_AD, { update: deleteCache });

  const updateAdTrigger = () => {
    const header = {
      id: dialog.id,
      content: dialog.content,
      link: dialog.link,
      status: dialog.status,
      target_country: dialog.target_country,
      target_gender: dialog.target_gender,
      target_age_from: dialog.target_age_from,
      target_age_to: dialog.target_age_to,
    };
    updateAd({ variables: header });
    setDialog(false);
  };

  const handleChange = (event, key) => {
    console.log(key, event.target.value);
    if (key === "target_gender" || key === "target_country") {
      const value = event.target.value;
      const array = [...dialog[key]];
      if (array.includes(value)) {
        array.splice(array.indexOf(value), 1);
        setDialog((prev) => ({
          ...prev,
          [key]: array,
        }));
      } else {
        array.push(value);
        setDialog((prev) => ({
          ...prev,
          [key]: array,
        }));
      }
    } else if (key === "status") {
      setDialog((prev) => ({
        ...prev,
        [key]: event.target.value === "true",
      }));
    } else
      setDialog((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    console.log(dialog);
  };
  return (
    <div className={classes.wrapper}>
      <TableContainer>
        <Table>
          <TableHead>
            {keys.map((item, i) => (
              <TableCell key={i + 1} align="left">
                {item}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow>
                <TableCell
                  className={isComp ? classes.comp : classes.id}
                  onClick={() => {
                    !isComp && setDialog(item);
                  }}
                >
                  {item.id}
                </TableCell>
                <TableCell>{item.company_name}</TableCell>
                {!isComp && (
                  <>
                    <TableCell>{item.content}</TableCell>
                    <TableCell>{item.link}</TableCell>
                    <TableCell>{item.status ? "Active" : "Inactive"}</TableCell>
                    <TableCell>{item.visited}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialog}>
        <DialogTitle>Update the Advertisement</DialogTitle>
        <div className={classes.formWrapper}>
          <div className={classes.option}>
            <div className={classes.title}>Content : </div>
            <TextareaAutosize
              className={classes.textArea}
              minRows="5"
              value={dialog?.content}
              onChange={(event) => handleChange(event, "content")}
            />
          </div>
          <div className={classes.option}>
            <div className={classes.title}>Link : </div>
            <input
              className={classes.text}
              onChange={(event) => handleChange(event, "link")}
              value={dialog?.link}
            />
          </div>
          <div className={classes.option}>
            <div className={classes.title}>Status : </div>
            <input
              checked={dialog?.status}
              name="status"
              type="radio"
              value={true}
              onChange={(event) => handleChange(event, "status")}
            />
            <label>Active</label>
            <input
              checked={!dialog?.status}
              name="status"
              type="radio"
              value={false}
              onChange={(event) => handleChange(event, "status")}
            />
            <label>In Active</label>
          </div>
          <div className={classes.option}>
            <div className={classes.title}>Target Age : </div>
            <label>From</label>
            <input
              className={classes.age}
              value={dialog?.target_age_from}
              type="number"
              onChange={(event) => handleChange(event, "target_age_from")}
            />
            <label>To</label>
            <input
              className={classes.age}
              value={dialog?.target_age_to}
              name="status"
              type="number"
              onChange={(event) => handleChange(event, "target_age_to")}
            />
          </div>
          <div className={classes.option}>
            <div className={classes.title}>Target Gender : </div>
            <input
              checked={dialog?.target_gender?.includes("male")}
              name="gender"
              type="checkbox"
              value="male"
              onChange={(event) => handleChange(event, "target_gender")}
            />
            <label>Male</label>
            <input
              checked={dialog?.target_gender?.includes("female")}
              name="gender"
              type="checkbox"
              value="female"
              onChange={(event) => handleChange(event, "target_gender")}
            />
            <label>Female</label>
          </div>
          <div className={classes.option}>
            <div className={classes.title}>Target country : </div>
            {country.map((item, i) => (
              <>
                <input
                  checked={dialog?.target_country?.includes(item)}
                  name="country"
                  type="checkbox"
                  value={item}
                  onChange={(event) => handleChange(event, "target_country")}
                />
                <label>{item.toUpperCase()}</label>
              </>
            ))}
          </div>
          <div className={classes.option}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={() => updateAdTrigger()}
            >
              Update
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              onClick={() => {
                deleteAd({ variables: { id: dialog.id } });
                setDialog(false);
              }}
            >
              Delete
            </Button>
            <Button
              className={classes.btn}
              variant="outlined"
              onClick={() => setDialog(false)}
              color="primary"
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Adstable;
