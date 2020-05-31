import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { Link } from 'react-router-dom';

const NavButton = ({ text, link, ...props }) => <Button {...props} component={Link} to={link}>{text}</Button>

export const NavButtons = ({ back, forward }) => {
    return <ButtonGroup color={"primary"} size="large" variant="contained">
        <NavButton {...back} text={back.name ? `back to ${back.name}` : 'back'} />
        <NavButton {...forward} text={forward.name ? `forward to ${forward.name}` : 'forward'} />
        </ButtonGroup>
}

export default NavButtons;  