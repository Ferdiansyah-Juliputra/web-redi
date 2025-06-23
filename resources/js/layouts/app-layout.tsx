import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, FC } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

// Lebih aman pakai deklarasi fungsi eksplisit dan FC (FunctionComponent)
const AppLayout: FC<AppLayoutProps> = ({ children, breadcrumbs, ...props }) => {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
};

export default AppLayout;
