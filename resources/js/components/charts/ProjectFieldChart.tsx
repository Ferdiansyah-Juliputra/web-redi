// resources/js/components/charts/ProjectFieldChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Definisikan tipe data
interface ChartData {
    field: string;
    value: number;
}

// Daftar warna
const COLORS = ['#4338ca', '#6366f1', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#c4b5fd'];

export default function ProjectFieldChart({ data }: { data: ChartData[] }) {
    // =======================================================
    // LANGKAH DEBUGGING: Lihat data apa yang sebenarnya diterima
    // Buka Console di browser Anda (F12) untuk melihat hasilnya.
    // =======================================================
    console.log('Data yang diterima oleh Pie Chart:', data);

    // "Penjaga" yang kuat untuk mencegah error
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-center text-sm text-gray-500">
                No project data available.
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            {/* Area untuk Pie Chart */}
            <div className="w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            formatter={(value, field) => [`${value} projects`, field]}
                            cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
                        />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="field"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            {/* ======================================================= */}
            {/* AREA LEGENDA DENGAN STRUKTUR BARU YANG DIJAMIN BENAR */}
            {/* ======================================================= */}
            <div className="w-full pt-2">
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center space-x-2 text-sm">
                            {/* Kotak Warna */}
                            <span 
                                className="block w-3 h-3 rounded-sm flex-shrink-0" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                            />
                            {/* Teks Nama Field */}
                            <span className="text-gray-600 dark:text-gray-300">
                                {entry.field || 'No Name'}
                            </span>
                            {/* Teks Jumlah */}
                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                                ({entry.value})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}