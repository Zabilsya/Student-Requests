import { Router } from "react-router-dom";
import React, {FC, ReactNode, useLayoutEffect, useState} from "react";
import { History } from 'history';

interface Props {
    history: History,
    children?: ReactNode
}

const CustomRouter: FC<Props> = ({ history, children,  ...props }) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })

    useLayoutEffect(() => history.listen(setState), [history])

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    );
};

export default CustomRouter