import React, { useRef, useEffect, useState } from "react";
import { List, ListItem, IconButton } from "@material-ui/core";
import TextInput from "../input/textInput";
import DeleteIcon from '@material-ui/icons/Delete';
import { generateId } from "../../utils/id";
import { isEqual } from "lodash";

const defaultRenderCurrentList = ({ list, onChange, onDelete }) => list.map(({name, placeholder}, index) => <ListItem className="part" key={index}>
    <TextInput placeholder={placeholder} label={index + 1} text={name} onChange={onChange(index)} />
    <IconButton onClick={onDelete(index)} aria-label="delete">
        <DeleteIcon fontSize="small" />
    </IconButton>
</ListItem>);


export const CreateableList = ({ renderCurrentList = defaultRenderCurrentList, list, defaultList = [], maxItems, onChange, createNewItem, updateItem }) => {
    const [editableList, setEditableList] = useState(list || defaultList.map(({name, ...props}) => ({placeholder: name, ...props})));
    const newItemInput = useRef();

    // i dont actually think i need this??? idk. obviously if the list value changes without the editable list changes. but then the component should be on a diff page
    // and re-created .... idk ....
    // useEffect(() => {
    //     debugger;
    //     !isEqual(list, editableList) && setEditableList(list)
    // }, [list]);

    useEffect(() => {
        !isEqual((list || defaultList), editableList) && onChange(editableList);
        newItemInput.current && newItemInput.current.focus();
    }, [editableList]);


    const defaultCreateNewItem = value => {
        if (createNewItem) {
            setEditableList(createNewItem({ value, list: editableList, id: generateId() }));
        } else {
            setEditableList([...editableList, { name: value, id: generateId() }]);
        }
    }
    const defaultUpdateItem = index => value => {
        if (updateItem) {
            setEditableList(updateItem(index)({ value, list }));
        } else {
            const newList = [...editableList];
            const oldItemInList = newList.splice(index, 1);
            newList.splice(index, 0, { ...oldItemInList[0], name: value });
            setEditableList([...newList]);
        }
    }
    const removeItem = index => () => {
        const newList = [...editableList];
        newList.splice(index, 1);
        setEditableList([...newList]);
    }

    return <List>{editableList && editableList.length > 0 && renderCurrentList({ list: editableList, onChange: defaultUpdateItem, onDelete: removeItem })}
        {(!maxItems || editableList.length < maxItems) && <ListItem>
            <TextInput forwardedRef={newItemInput} autoFocus text="" label={editableList.length + 1} clearInput onBlur={defaultCreateNewItem} />
        </ListItem>}
    </List>
}