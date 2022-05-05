import React, {useEffect, useState} from 'react';
import {Initials, ProfileDataWrapper} from "./styles";
import DropDownProfile from "../DropDownProfile";
import {useAppSelector} from "../../../hooks/redux";

const ProfileHeader = () => {
    const { profile } = useAppSelector(state => state.authReducer)
    const [isActiveDropDown, setIsActiveDropDown] = useState(false)

    const handleOutsideClick = () => {
        setIsActiveDropDown(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsActiveDropDown(!isActiveDropDown)
        event.stopPropagation()
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
        return () => document.body.removeEventListener('click', handleOutsideClick)
    }, [])

    return (
        <>
            {profile &&
                <ProfileDataWrapper onClick={handleClick}>
                    <Initials>
                        {profile.surname}&nbsp;
                        {profile.name[0]}.
                        {profile.patronymic && profile.patronymic[0] + "."}
                    </Initials>
                    <DropDownProfile active={isActiveDropDown} />
                </ProfileDataWrapper>
            }
        </>
    );
};

export default ProfileHeader