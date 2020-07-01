
export const priorityNames = {must_have: "Must Have", nice_to_have: "Nice to Have"}
export const priorities = [priorityNames.must_have, priorityNames.nice_to_have];

export const prioritizedActivities = (a, b) => a.priorityIndex - b.priorityIndex;
export const priorityWeightizedActivities = (a, b) => a.priority - b.priority;