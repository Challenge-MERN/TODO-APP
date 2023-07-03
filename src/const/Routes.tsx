import { lazy } from 'react';
import { RoutePropsI } from '../interfaces/Routes';
import { PATHS } from './Paths';

export const routes: RoutePropsI[] = [
    {
        path: PATHS.LOGIN,
        element: lazy(async () => await import('../components/login/Login'))
    },
    {
        path: PATHS.SIGN_UP,
        element: lazy(async () => await import('../components/sign-up/SignUp'))
    },
    {
        layout: lazy(async () => await import('../layouts/Principal')),
        guard: lazy(async () => await import('../guards/AuthToken')),
        children: [
            {
                path: PATHS.HOME,
                element: lazy(async () => await import('../pages/PendingTasks')),
            },
            {
                path: PATHS.PENDING_TASKS,
                element: lazy(async () => await import('../pages/PendingTasks')),
            },
            {
                path: PATHS.COMPLETED_TASKS,
                element: lazy(async () => await import('../pages/CompletedTasks'))
            },
            {
                path: PATHS.CREATE_TASK,
                element: lazy(async () => await import('../pages/CreateTask'))
            },
            {
                path: PATHS.SETTINGS,
                element: lazy(async () => await import('../pages/Settings'))
            },
        ]
    },
]