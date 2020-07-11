import React, { useState } from "react";
import { Button, Snackbar, Grid, DialogContent, DialogActions, DialogContentText, DialogTitle } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from 'file-saver';
import { saveAll, saveDay, deleteAll } from "../../actions";
import Alert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from "react-router-dom";
import { TYPE_OF_DAY } from "../../pages/pageUrls";

export const UploadButton = ({ onUpload, children, ...props }) => <React.Fragment>
    <input accept=".plannerBackup" id="upload-backup" type="file" hidden onChange={onUpload} />
    <label htmlFor="upload-backup">
        <Button component="span" {...props}>{children}</Button>
    </label>
</React.Fragment>

export const ManageData = () => {
    const history = useHistory();
    const [imported, setImported] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const pageData = useSelector(state => state.pageData);
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();

    const importData = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const content = fileReader.result;
            const deEncodedContent = JSON.parse(atob(content));
            dispatch(saveAll({ ...deEncodedContent.pageData }));
            dispatch(saveDay({ ...deEncodedContent.currentDay }));
            setImported(true);
        };
        fileReader.readAsText(file);
    }

    const exportData = () => {
        const allData = {
            pageData,
            currentDay
        };
        const blob = new Blob([btoa(JSON.stringify(allData))], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `Daily-Planner-${new Date().toJSON()}.plannerBackup`);
    }

    const cleanData = () => {
        dispatch(deleteAll());
        setDeleting(false);
        history.push(TYPE_OF_DAY);
    }

    return <React.Fragment>
        <Snackbar open={imported} autoHideDuration={6000} onClose={() => setImported(false)}>
            <Alert variant="filled" severity="success" onClose={() => setImported(false)}>
                Your daily schedule has been restored from your backup.
            </Alert>
        </Snackbar>
        <Dialog open={deleting}>
            <DialogTitle>Are you sure you want to delete all information?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                     <strong> This removes all the information you have entered and returns you to the first step of the daily planner.</strong>
                </DialogContentText>
                <DialogContentText>
                    You can restore this information if you have downloaded a copy of your data using the save option.
                </DialogContentText>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={() => setDeleting(false)}>I changed my mind.</Button>
                    <Button onClick={cleanData}>Yes, I want to delete everything.</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        <Grid spacing={3} container>
            <Grid item>
                <UploadButton onUpload={importData}>Open</UploadButton>
            </Grid>
            <Grid item>
                <Button onClick={exportData}>Save</Button>
            </Grid>
            <Grid item>
                <Button onClick={() => setDeleting(true)}>Delete All Information</Button>
            </Grid>
        </Grid>
    </React.Fragment>
}

export default ManageData;  