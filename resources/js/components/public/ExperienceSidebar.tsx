// resources/js/components/ExperienceSidebar.tsx

import React from 'react';

// Komponen ini menerima props 'experiences'
interface ExperienceSidebarProps {
    experiences: { id: number; title: string; short_description: string; image_url: string }[];
}

export default function ExperienceSidebar({ experiences }: ExperienceSidebarProps) {
    return (
        <aside className="hidden lg:block w-1/3 xl:w-1/4 border-l border-gray-200 p-8 overflow-y-auto no-scrollbar">
          <div className="space-y-6">{experiences.map(exp => (<div key={exp.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-shadow duration-300"><img className="h-40 w-full object-cover" src={exp.image_url} alt={exp.title} /><div className="p-4"><h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3><p className="mt-1 text-sm text-gray-600">{exp.short_description}</p></div></div>))}</div>
          <div className="mt-6 text-center">
            {/* Nanti kita akan ganti href ini dengan link yang benar */}
            <a href='/experiences' className="text-indigo-600 hover:text-indigo-800 font-semibold">See All →</a>
          </div>
        </aside>
    );
}