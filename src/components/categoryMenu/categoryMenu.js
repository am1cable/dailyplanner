import React, { Fragment, useState } from "react";
import { ButtonGroup, IconButton, Button, Menu, MenuItem } from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export const CategoryMenu = ({ currentCategory, categories, onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSelect = value => e => {
        onChange(value);
        handleClose();
    }

    const previousCategory = () => onChange(categories[categories.indexOf(currentCategory) - 1])
    const nextCategory = () => onChange(categories[categories.indexOf(currentCategory) + 1])

    return <Fragment>
        <ButtonGroup color={"primary"} size="large">
            <Button onClick={previousCategory} disabled={currentCategory.id === categories[0].id}><NavigateBeforeIcon /></Button>
            <Button onClick={handleClick} variant="contained">{currentCategory.name}</Button>
            <Button onClick={nextCategory} disabled={currentCategory.id === categories[categories.length - 1].id}><NavigateNextIcon /></Button>
        </ButtonGroup>
        <Menu
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {categories.map((category, index) => <MenuItem key={index} onClick={handleSelect(category)}>{category.name}</MenuItem>)}
        </Menu>
    </Fragment>
}

export default CategoryMenu;