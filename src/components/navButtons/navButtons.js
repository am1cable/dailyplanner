import React from "react";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const NavButton = ({ disabled, text, link, ...props }) => <Button {...props} variant="contained" disabled={disabled} component={Link} to={link}>{text}</Button>

export const NavButtons = ({ back, forward }) => {
    return <div>
        <NavButton {...back} text={back.name ? `back to ${back.name}` : 'back'} />
        <NavButton color={"primary"} {...forward} text={forward.name ? `forward to ${forward.name}` : 'forward'} />
    </div>
}

export default NavButtons;  