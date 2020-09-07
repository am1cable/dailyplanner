import React from "react";
import NavButtons from "../navButtons/navButtons";
import { Container, Grid, Divider } from "@material-ui/core";
import ManageData from "../manageData/manageData";

export const PageWrapper = ({ forward, back, children, className }) => {
    return <React.Fragment>
        <Container maxWidth="lg" >
            <Grid container spacing={3} direction="column">
                <Grid item>
                        <Grid container spacing={3} direction="column">
                            <Grid item className={className}>{children}</Grid>
                            <Grid item><NavButtons forward={forward} back={back} /></Grid>
                        </Grid>
                </Grid>
                            <Divider/>
                <Grid item>
                    <ManageData />
                </Grid>
            </Grid>
        </Container>

    }</React.Fragment>
}
export default PageWrapper