import {ChangeEvent, MouseEvent} from "react";

export interface ReactChange<T> {
    onChange: (event: ChangeEvent<T>) => void
}

export interface ReactClick<T> {
    onClick?: (e: MouseEvent<T>) => void;
}