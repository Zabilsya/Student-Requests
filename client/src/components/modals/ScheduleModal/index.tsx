import React, {FC, useState} from 'react';
import {ModalMode} from "../../../const";
import InputFiles from "../../UI/InputFiles";

interface Props {
    mode: ModalMode
}

const ScheduleModal: FC<Props> = ({mode}) => {
    const [form, setForm] = useState({
        title: '',

    })

    return (
        <>
            {/*<InputFiles*/}
            {/*    */}
            {/*/>*/}
        </>
    );
};

export default ScheduleModal