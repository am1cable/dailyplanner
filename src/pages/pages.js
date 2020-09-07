import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as pages from "./pageUrls";
import StructureManager from "./1_structure/1_Manager";
import StructureDebriefManager from "./1_5_debrief/1_5_Manager";

export const Pages = () => <Switch>
    <Route path={pages.STRUCTURE} component={StructureManager} />    
    <Route path={pages.STRUCTURE_DEBRIEF} component={StructureDebriefManager} />
    <Route path="/">
        <Redirect to={pages.STRUCTURE} />
    </Route>
</Switch>

export default Pages;