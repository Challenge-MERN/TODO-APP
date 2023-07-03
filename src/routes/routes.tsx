import { Route, Outlet } from 'react-router-dom';
import { Fragment, Suspense } from 'react';
import { RoutePropsI } from '../interfaces/Routes';

export const RenderRoutes = (routes: RoutePropsI[]) => {
    return routes.map((route, index) => {
        const Component = route.element || Fragment;
        const Layout = route.layout || Fragment;
        const Guard = route.guard || Fragment;
        return <Route
            key={index}
            path={route.path}
            element={
                <Suspense>
                    <Guard>
                        <Layout>
                            {route.children ? <Outlet /> : <Component />}
                        </Layout>
                    </Guard>
                </Suspense>
            }
        >
            {route.children && RenderRoutes(route.children)}
        </Route>
    });
}

