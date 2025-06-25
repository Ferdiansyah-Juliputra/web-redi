// resources/js/components/sidebar/CollapsibleSidebar.tsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Home, Image, Briefcase, Book, Megaphone, Rss, ChevronDown, ChevronLeft, X, MessageCircleWarning } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile'; // 1. Impor hook kita
import Logo from '../../assets/logo transparan 1.png';

// Tipe dan daftar menu tidak berubah
type SubItem = { title: string; href: string };
type MenuItemType = { title: string; href?: string; icon: React.ReactNode; isDropdown?: boolean; subItems?: SubItem[] };
const menuItems: MenuItemType[] = [
    { title: 'Home', href: '/', icon: <Home /> }, { title: 'About Us', href: '/about', icon: <Briefcase /> },
    { title: 'Gallery', href: '/gallery', icon: <Image /> }, { title: 'Projects', href: '/projects', icon: <Book /> },
    { title: 'Clients', href: '/clients', icon: <Briefcase /> }, { title: 'Experiences', href: '/experiences', icon: <Rss /> },
    { title: 'Publications', href: '/publications', icon: <Megaphone /> },
    { title: 'News', isDropdown: true, icon: <MessageCircleWarning />, subItems: [ { title: 'Internship', href: '/news/internship' }, { title: 'Recruitment', href: '/news/recruitment' } ]},
];

interface SidebarProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (isOpen: boolean) => void;
}

export default function CollapsibleSidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
    const isMobile = useIsMobile(); // 2. Deteksi ukuran layar

    // State untuk desktop
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);    
    const [isNewsOpen, setIsNewsOpen] = useState(false);

    // 3. Logika baru untuk menentukan apakah sidebar harus lebar
    // Di mobile, ia selalu lebar. Di desktop, tergantung hover atau pin.
    const isExpanded = isMobile || !isCollapsed || isHovered;

    return (
        <>
            {/* Overlay hanya untuk mobile */}
            <div 
                className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileOpen(false)}
            />

            <aside
                className={`flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-50
                    fixed lg:relative h-full
                    ${isExpanded ? 'w-64' : 'w-20'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                // 4. Nonaktifkan hover di mobile
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
                <div className="flex items-center h-20 px-3">
                    <div className={`flex items-center space-x-2 overflow-hidden ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                        <img src={Logo} alt="Logo" className="h-8 w-auto flex-shrink-0" />
                    </div>
                    {/* Tombol Pin (hanya untuk Desktop) */}
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-3 rounded-lg hover:bg-gray-100 ml-auto hidden lg:block">
                        <Menu size={20} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Tombol Tutup (hanya untuk Mobile) */}
                    <button onClick={() => setIsMobileOpen(false)} className="p-3 rounded-lg hover:bg-gray-100 ml-auto lg:hidden">
                        <X size={20} />
                    </button>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <nav className="flex-1 flex flex-col p-3 space-y-2 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <div key={item.title}>
                             <NavLink
                                to={item.href || '#'}
                                onClick={(e) => {
                                    if(item.isDropdown) {
                                        e.preventDefault();
                                        setIsNewsOpen(!isNewsOpen);
                                    }
                                }}
                                className={({isActive}) => `flex items-center p-3 h-14 rounded-md transition-colors ${isActive && !item.isDropdown ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="w-8 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                <span className={`flex-1 text-left ml-2 whitespace-nowrap transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.title}</span>
                                {item.isDropdown && <ChevronDown size={16} className={`transition-transform ${isNewsOpen ? 'rotate-180' : ''} ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />}
                            </NavLink>
                             {item.isDropdown && isNewsOpen && isExpanded && (
                                 <ul className="pl-14 py-1 space-y-1">
                                     {item.subItems?.map(sub => (<li key={sub.title}><NavLink to={sub.href} className={({isActive}) => `block text-sm p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}>{sub.title}</NavLink></li>))}
                                 </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}