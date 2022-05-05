import {IOption} from "../types/select";
import {IUser} from "../store/reducers/Users/Models";

export const getDataForSelect = <T extends Array<any>>(array: T, keyValue: string, keyLabel: string | string[]): IOption[] => {
    if (array.length === 0) {
        return []
    }
    return array.map(item => {
        let label = ''
        if (typeof keyLabel === 'string') {
            label = item[keyLabel]
        } else {
            label = keyLabel.map(key => item[key]).join(' ').trim()
        }
        return {label, value: item[keyValue]}
    })
}

export const getSurnameWithInitials = (user: IUser | null): string => {
    if (!user) {
        return ''
    }
    return `${user.surname} ${user.name[0]}.${user.patronymic ? " " + user.patronymic + "." : ""}`
}