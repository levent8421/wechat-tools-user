import Error from '../component/Error';
import Index from '../component/Index';
import RootContent from '../component/RootContent';

const rootRoutes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/error',
        component: Error
    },
    {
        path: '/c/**',
        component: RootContent
    },
];

const contentRoutes = [];

export {
    rootRoutes,
    contentRoutes,
};
