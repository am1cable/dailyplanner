import React, { useState } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { PRIORITIZE_ACTIVITIES_TOP, OVERVIEW } from "../pageUrls";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CategoryMenu from "../../components/categoryMenu/categoryMenu";
import { priorities } from "../prioritizeActivities/prioritizeActivities";
import { prioritizedActivities, priorityWeightizedActivities } from "../../utils/activities";

const localStorageId = 'listPriorities-category';

const useStyles = makeStyles((theme) => ({
    top3Icon: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const AllActivites = () => {
    const classes = useStyles();
    const currentDay = useSelector(state => state.currentDayData);
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay);
    const [currentCategory, setCurrentCategory] = useState(currentDay.majorParts.find(({ id }) => localStorage.getItem(localStorageId) === id) || currentDay.majorParts[0]);

    const handleCategoryChange = (newCategory) => {
        localStorage.setItem(localStorageId, newCategory.id);
        setCurrentCategory(newCategory);
    }

    const sortedActivtiesInCurrentCategory = () => activitesInDay.filter(({ categoryId }) => categoryId === currentCategory.id).sort(prioritizedActivities).sort(priorityWeightizedActivities);
    
    const renderCategoryMenu = () => <CategoryMenu categories={currentDay.majorParts} currentCategory={currentCategory} onChange={handleCategoryChange} />
    const renderActivityList = ({ name, priority }, index) => <ListItem key={index} className={`part ${index}`}>
            <ListItemAvatar><Avatar className={index < 3 ? classes.top3Icon : ''}>{index + 1}</Avatar></ListItemAvatar>
            <ListItemText primary={name} secondary={priorities[priority]} />
        </ListItem>

    return <PageWrapper className="prioritize-activities-top" back={{ link: PRIORITIZE_ACTIVITIES_TOP }} forward={{ link: OVERVIEW }}>
        <div>Verifiy your activities in the day</div>
        <List>
            {sortedActivtiesInCurrentCategory().map(renderActivityList)}
        </List>
        {renderCategoryMenu()}
    </PageWrapper >
}
export default AllActivites