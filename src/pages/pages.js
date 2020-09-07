import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as pages from "./pageUrls";
import StructureManager from "./1_structure/structureManager";

export const Pages = () => <Switch>
    <Route path={pages.STRUCTURE} component={StructureManager} />    
    <Route path="/">
        <Redirect to={pages.STRUCTURE} />
    </Route>
</Switch>

export default Pages;