// resources/js/pages/About/AboutUsPage.tsx
import Photo from '../../assets/IMG_2196 (1).png';
import React from 'react';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import { Building2, Target, Users, Handshake, ScanBarcode } from 'lucide-react';

// Komponen kecil untuk kartu nilai perusahaan
const ValueCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="mt-4 text-gray-600">
            {children}
        </p>
    </div>
);


export default function AboutUsPage() {
    return (
        <div className="p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header Halaman */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">About Us</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        REDI - Regional Economic Development Institute
                    </p>
                </div>

                {/* Section Sejarah */}
                <section className="mt-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ImageWithSkeleton
                            src={Photo}
                            alt="REDI"
                            className="rounded-xl shadow-lg"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Journey</h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed">
                                <p className='text-justify'>
                                    Regional Economic Development Institute (REDI) is a leading independent research institution established in Surabaya on May 21, 2001. REDI has more than twenty-two years of experience in conducting studies, data collection activities, training, and capacity building for governments, international agencies, and private sectors.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Nilai-nilai Perusahaan */}
                <section className='mt-10'>
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                        <p className='text-justify'>
                            For the national institutions, REDI has conducted studies with Bank Indonesia & its Branch Offices in Surabaya, Ambon, Jember, and Papua; the Coordinating Ministry of Economic Affairs (CMEA), 
                            and some local governments in Indonesia including the East Java & West Nusa Tenggara Provincial Governments. For the international agencies, REDI has worked for The World Bank, United States Agency 
                            for International Development (USAID), The Asia Foundation (TAF), Japan Bank for International Cooperation (JBIC), Department of Foreign Affairs and Trade (DFAT) – Australian Aid, Asian Development Bank (ADB), 
                            International Finance Corporation (IFC), Deutsche Gesellschaft für Technische Zusammenarbeit (GTZ) known as Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), International Labour Organization (ILO), 
                            European Union (EU) Commission, PT. Palladium International, and JBS International.
                        </p>
                        <p className='text-justify'>
                            REDI has strong experience and expertise in conducting data collection across provinces and districts in Indonesia on various study topics, i.e.: education, social, finance and banking, trade, IT, and risk mitigation. REDI has the capacity to 
                            undertake quantitative data collection techniques, including the PAPI data collection (using paper-based instruments) and CAPI (using the digital program) also, using applications such as: KOBO, SurveyCTO Collect, or its own designed digital program 
                            (web-based program). For qualitative data collection, REDI has the experience to undertake in-depth interviews and focus group discussions (FGD). In terms of managing a large number of personnel deployments and data management, in 2016, REDI conducted field work 
                            by deploying more than 200 field personnel to undertake nearly 60,000 data from more than 40,000 respondents.
                        </p>
                    </div>
                </section>
                <section className="mt-20">
                     <div className="text-center">
                        <h2 className="text-3xl font-semibold text-gray-900">Our Focus Pillars</h2>
                    </div>
                    <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <ValueCard icon={<Building2 className="text-indigo-900" />} title="Large-Scale Data Collection">
                            We adopt best practices and the latest technologies in every data collection activity to ensure accurate and relevant results.
                        </ValueCard>

                        <ValueCard icon={<Target className="text-indigo-900" />} title="Research and Studies">
                            Through our experienced team and solid data management, REDI produces excellent data and analysis tailored to client needs.
                        </ValueCard>

                        <ValueCard icon={<Users className="text-indigo-900" />} title="Training">
                            We deliver comprehensive training programs, designed to enhance capabilities and empower teams with new skills.
                        </ValueCard>

                        <ValueCard icon={<Handshake className="text-indigo-900" />} title="Capacity Development">
                            We believe that strong partnerships are key. We work collaboratively with clients to build and strengthen their institutional capacity.
                        </ValueCard>
                        <div className="md:col-span-2 flex justify-center">
                            <div className="w-full md:w-1/2 md:pr-4">
                                <ValueCard icon={<ScanBarcode className="text-indigo-900" />} title="Digital Data Collection">
                                    Leveraging modern digital tools, we streamline the data collection process, ensuring efficiency, accuracy, and real-time insights.
                                </ValueCard>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}