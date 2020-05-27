import React from "react";
import NavButtons from "../navButtons/navButtons";

export const PageWrapper = ({ forward = { disabled: true, link: "/"}, back = { disabled: true, link: "/" }, children }) => {
    return <div>
        <div>{children}</div>
        <NavButtons forward={forward} back={back} />
    </div>
}
export default PageWrapper