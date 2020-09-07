
import React, { useState, useEffect } from "react";
import StructureContext from "./structureContext";

export const ContextWrapper = ({ context, children }) => {
    const [structureContext, setStructureContext] = useState(context);

    useEffect(() => {
        setStructureContext(context);
    }, [context])

    return <StructureContext.Provider value={structureContext}>
        {children}
    </StructureContext.Provider>
}

export default ContextWrapper;