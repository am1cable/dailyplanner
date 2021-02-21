import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { Link } from 'react-router-dom';
import StructureContext from "../context/structureContext";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "./navButtons.scss";

const NavButtonLinks = ({ text, link, ...props }) => <NavButton {...props} component={Link} to={link}>{text}</NavButton>

const NavButton = ({ children, ...props }) => <Button {...props}>{children}</Button>

const emptyDirection = { disabled: true, link: "/" }

export const NavButtons = ({ back = emptyDirection, forward = emptyDirection }) => {
    return <StructureContext.Consumer>
        {({ onNavigateForwards }) => <ButtonGroup class="navButtons" color={"primary"} size="large" variant="contained">
            {/* {back != emptyDirection && <NavButton {...back}>
                {back.name ? `back to ${back.name}` : 'back'}
            </NavButton>} */}
            {forward != emptyDirection && <NavButton {...forward} onClick={onNavigateForwards}>
                <ArrowForwardIcon/>
            </NavButton>}
        </ButtonGroup>
        }
    </StructureContext.Consumer>
}

export default NavButtons;  