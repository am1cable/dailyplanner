import { obstacleChoices } from "../pages/3_partOfDayIndividual/partOfDayObstacles/partOfDayObstacles";

export const getCurrentObstacle = (currentPartOfDay) => {
    const obstacleChoicesWithoutOther = [...obstacleChoices];
    obstacleChoicesWithoutOther.splice(obstacleChoices.indexOf("other"), 1);
    const firstNotCompletedObstacle = obstacleChoicesWithoutOther.find(name => !currentPartOfDay.obstacles[name].completed && currentPartOfDay.obstacles[name].checked);
    if (firstNotCompletedObstacle) {
        return { ...currentPartOfDay.obstacles[firstNotCompletedObstacle], name: firstNotCompletedObstacle, id: obstacleChoices.indexOf(firstNotCompletedObstacle), isGeneric: true };
    }
    else if (currentPartOfDay.obstacles.other.checked) {
        return currentPartOfDay.obstacles.otherChoices.find(({ completed }) => !completed);
    }
    return undefined;
};