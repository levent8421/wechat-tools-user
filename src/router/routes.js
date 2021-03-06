import Error from '../component/Error';
import Index from '../component/Index';
import RootContent from '../component/RootContent';

import Home from '../component/content/Home';
import InviteFollowAppDetails from '../component/content/InviteFollowAppDetails';

const rootRoutes = [
    {
        path: '/',
        exact: true,
        component: Index
    },
    {
        path: '/error',
        exact: true,
        component: Error
    },
    {
        path: '/c/**',
        exact: true,
        component: RootContent
    },
];


const contentRoutes = [
    {
        path: '/c/',
        exact: true,
        component: Home,
    },
    {
        path: '/c/invite-follow-app',
        exact: true,
        component: InviteFollowAppDetails,
    },
];

export {
    rootRoutes,
    contentRoutes,
};
