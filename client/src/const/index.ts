import {blue, green, yellow} from "./styles";

export enum RoutesList {
    Login = '/login',
    ChangePassword = '/change-password',
    Requests = '/requests',
    DetailRequest = '/requests/:id',
    RequestTemplates = '/request-templates',
    News = '/news',
    DetailNews = '/news/:id',
    Queue = '/queue',
    Users = '/users',
    Profile = '/profile',
    Schedule = '/schedule',
    FAQ = '/faq',
    Staff = '/staff',
    Contacts = '/contacts'
}

export enum UserTypes {
    Admin = 1,
    Worker = 2,
    Student = 3
}

export enum ModalMode {
    Create = 'create',
    Update = 'update'
}

export enum RequestStatuses {
    Waiting = 1,
    InProgress = 2,
    Closed = 3
}

export enum RequestStatusesColors {
    Waiting = '#FACA1F',
    InProgress = '#005BAB',
    Closed = '#10DC86'
}

export const userTypesForFilter = [
    {value: UserTypes.Worker, label: 'Сотрудники'},
    {value: UserTypes.Student, label: 'Студенты'}
]

export const requestStatusesForFilter = [
    {value: 0, label: 'Все'},
    {value: RequestStatuses.Waiting, label: 'В ожидании'},
    {value: RequestStatuses.InProgress, label: 'В обработке'},
    {value: RequestStatuses.Closed, label: 'Завершен'}
]

export const defaultRequestTemplateForFilter = {
    value: 0, label: 'Все'
}

export const defaultGroupForFilter = {
    value: 0, label: 'Все'
}

export const noop = () => {}