// resources/js/components/sidebar/CollapsibleSidebar.tsx

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Home, Image, Briefcase, Book, Megaphone, Rss,
    ChevronDown, Menu as HamburgerIcon, ChevronLeft,
    MessageCircleWarning, Gauge, X
} from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import Logo from '../../assets/logo transparan 1.png';

type SubItem = { title: string; href: string };
type MenuItemType = {
    title: string;
    href?: string;
    icon: React.ReactNode;
    isDropdown?: boolean;
    subItems?: SubItem[];
};

const menuItems: MenuItemType[] = [
    { title: 'Home', href: '/', icon: <Home size={20} /> },
    { title: 'About Us', href: '/about', icon: <Briefcase size={20} /> },
    { title: 'Gallery', href: '/gallery', icon: <Image size={20} /> },
    { title: 'Projects', href: '/projects', icon: <Book size={20} /> },
    { title: 'Clients', href: '/clients', icon: <Briefcase size={20} /> },
    { title: 'Experiences', href: '/experiences', icon: <Gauge size={20} /> },
    { title: 'Publications', href: '/publications', icon: <Megaphone size={20} /> },
    {
        title: 'News',
        isDropdown: true,
        icon: <MessageCircleWarning size={20} />,
        subItems: [
            { title: 'Internship', href: '/news?category=Internship' },
            { title: 'Recruitment', href: '/news?category=Recruitment' },
        ],
    },
];

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
}

export default function CollapsibleSidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
    const isMobile = useIsMobile();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const location = useLocation();

    const isExpanded = isMobile || !isCollapsed || isHovered;

    // Buka News dropdown jika berada di path /news
    useEffect(() => {
        if (location.pathname.startsWith('/news')) {
            setIsNewsOpen(true);
        }
    }, [location.pathname]);

    // Tutup sidebar mobile saat navigasi
    useEffect(() => {
        if (isMobileOpen) {
            setIsMobileOpen(false);
        }
    }, [location.pathname, location.search]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileOpen(false)}
            />

            <aside
                className={`flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-50 fixed lg:relative h-full ${isExpanded ? 'w-64' : 'w-20'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
                onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
            >
                <div className="flex items-center h-20 px-4">
                    <div className={`flex items-center space-x-2 overflow-hidden ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                        <img src={Logo} alt="Logo" className="h-8 w-auto flex-shrink-0" />
                    </div>
                    <button
                        onClick={() => {
                            isMobile ? setIsMobileOpen(false) : setIsCollapsed(!isCollapsed);
                        }}
                        className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isExpanded ? 'ml-auto' : 'mx-auto'}`}
                    >
                        {isMobile ? <X size={20} /> : (isCollapsed ? <HamburgerIcon size={20} /> : <ChevronLeft size={20} />)}
                    </button>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <nav className="flex-1 flex flex-col p-3 space-y-1 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <div key={item.title}>
                            {item.isDropdown ? (
                                <>
                                    <button
                                        onClick={() => setIsNewsOpen(!isNewsOpen)}
                                        className={`w-full flex items-center p-3 h-14 rounded-md transition-colors ${
                                            location.pathname.startsWith('/news')
                                                ? 'text-indigo-600 font-semibold'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <div className="w-8 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                        <span className={`flex-1 text-left ml-2 whitespace-nowrap transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.title}</span>
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isNewsOpen ? 'rotate-180' : ''} ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                    {isNewsOpen && isExpanded && (
                                        <ul className="pl-8 pt-1 space-y-1">
                                            {item.subItems?.map(sub => {
                                                const currentParams = new URLSearchParams(location.search);
                                                const currentCategory = currentParams.get('category');

                                                const subParams = new URLSearchParams(sub.href.split('?')[1]);
                                                const subCategory = subParams.get('category');

                                                const isSubActive = location.pathname === '/news' && currentCategory === subCategory;

                                                return (
                                                    <li key={sub.title}>
                                                        <NavLink
                                                            to={sub.href}
                                                            className={`flex items-center text-sm py-2 px-4 rounded-md transition-colors ${
                                                                isSubActive
                                                                    ? 'bg-indigo-100 text-indigo-700 font-bold'
                                                                    : 'text-gray-500 hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            {sub.title}
                                                        </NavLink>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <NavLink
                                    to={item.href!}
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center p-3 h-14 rounded-md transition-colors ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-900 font-semibold'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    <div className="w-8 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                    <span className={`ml-2 whitespace-nowrap transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.title}</span>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
