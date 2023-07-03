import { LazyExoticComponent } from 'react';

export interface RoutePropsI {
    path?: string,
    element?: LazyExoticComponent<() => JSX.Element> | null,
    layout?: LazyExoticComponent<(props: { children: React.ReactNode }) => JSX.Element> | null,
    children?: RoutePropsI[],
    guard?: LazyExoticComponent<(props: { children: React.ReactNode }) => JSX.Element> | null
}