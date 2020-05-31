import React, { useState } from "react";
import { Button, Snackbar, Grid, DialogContent, DialogActions, DialogContentText, DialogTitle } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from 'file-saver';
import { saveAll, saveDay, deleteAll } from "../../actions";
import Alert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';

export const UploadButton = ({ onUpload, children, ...props }) => <React.Fragment>
    <input accept=".plannerBackup" id="upload-backup" type="file" hidden onChange={onUpload} />
    <label htmlFor="upload-backup">
        <Button component="span" {...props}>{children}</Button>
    </label>
</React.Fragment>

export const ManageData = () => {
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
    }

    return <React.Fragment>
        <Snackbar open={imported} autoHideDuration={6000} onClose={() => setImported(false)}>
            <Alert variant="filled" severity="success" onClose={() => setImported(false)}>
                Your daily schedule has been restored from your backup.
            </Alert>
        </Snackbar>
        <Dialog open={deleting}>
            <DialogTitle>Delete all your information?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div>
                        Are you sure you want to delete all information? <strong> This removes all your custom day types and all the information you have entered.</strong>
                    </div>
                    <div>
                        You can restore this information if you have saved a copy to your local machine using the backup option. If you are not on the first step of creating your daily planner, you will be sent back to the start.
                    </div>
                </DialogContentText>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={() => setDeleting(false)}>I changed my mind.</Button>
                    <Button onClick={cleanData}>Yes, I want to delete everything.</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        <Grid spacing={3} container>
            <Grid item>
                <UploadButton onUpload={importData}>Restore</UploadButton>
            </Grid>
            <Grid item>
                <Button onClick={exportData}>Backup</Button>
            </Grid>
            <Grid item>
                <Button onClick={() => setDeleting(true)}>Delete All Information</Button>
            </Grid>
        </Grid>
    </React.Fragment>
}

export default ManageData;  