// resources/js/components/charts/ProjectGrowthChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    year: number;
    count: number;
}

export default function ProjectGrowthChart({ data }: { data: ChartData[] }) {
    if (!data || data.length === 0) {
        return <div className="text-center text-sm text-gray-500 flex items-center justify-center h-full">No project data available.</div>;
    }
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                
                {/* ======================================================= */}
                {/* PERBAIKAN FINAL ADA DI DALAM XAXIS INI */}
                {/* ======================================================= */}
                <XAxis 
                    dataKey="year" 
                    fontSize={12}
                    // 1. Hapus 'interval="auto"'
                    // Biarkan Recharts menggunakan interval default-nya yang sudah pintar.
                    
                    // 2. Pertahankan minTickGap untuk memberi jarak minimum.
                    // Ini akan membantu Recharts dalam menentukan label mana yang perlu ditampilkan.
                    minTickGap={15}
                    
                    // 3. (Opsional) Jika label masih terlalu padat, kita bisa beri sedikit
                    // offset pada tick agar tidak menabrak sumbu.
                    // dy={5} 
                />

                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip formatter={(value, name, props) => [`${props.payload.count} projects`, `Year: ${props.payload.year}`]} />
                <Line type="monotone" dataKey="count" name="Projects" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}