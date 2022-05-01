export enum RoutesList {
    Login = '/login',
    ChangePassword = '/change-password',
    Requests = '/requests',
    RequestTemplates = '/request-templates',
    News = '/news',
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

export const noop = () => {}