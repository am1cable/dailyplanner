import React, { useRef, useEffect, useState } from "react";
import { List, ListItem, IconButton } from "@material-ui/core";
import TextInput from "../input/textInput";
import DeleteIcon from '@material-ui/icons/Delete';
import { generateId } from "../../utils/id";
import { isEqual } from "lodash";

const defaultRenderCurrentList = ({ list, onChange, onDelete }) => list.map((part, index) => <ListItem className="part" key={index}>
    <TextInput label={index + 1} text={part.name} onChange={onChange(index)} />
    <IconButton onClick={onDelete(index)} aria-label="delete">
        <DeleteIcon fontSize="small" />
    </IconButton>
</ListItem>);


export const CreateableList = ({ renderCurrentList = defaultRenderCurrentList, list = [], maxItems, onChange, createNewItem, updateItem }) => {
    const [editableList, setEditableList] = useState(list);
    const newItemInput = useRef();
    useEffect(() => { setEditableList(list) }, [list]);
    useEffect(() => {
        !isEqual(list, editableList) && onChange(editableList);
        newItemInput.current && newItemInput.current.focus();
    }, [editableList]);

    const defaultCreateNewItem = value => {
        if (createNewItem) {
            setEditableList(createNewItem({ value, list, id: generateId() }));
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