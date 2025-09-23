<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run()
    {
        $clients = [
            'A2F Consulting',
            'ANTARA',
            'Aqua',
            'Asian Development Bank (ADB)',
            'Australian Council for Educational Research (ACER)',
            'AustralianAid',
            'BFA Global',
            'BI Ambon',
            'BI Jakarta',
            'BI Jawa Timur',
            'BI Jember',
            'BI Kediri',
            'BI Mataram',
            'BI Surabaya',
            'Bank Bengkulu',
            'Bank Indonesia (BI)',
            'Bank Prima Master',
            'Bappeda Tuban',
            'Bappeko Surabaya',
            'CGAP',
            'DFAT',
            'Deutsche Gesellschaft für Technische Zusammenarbeit  (GTZ)',
            'Development Alternative Inc (DAI)',
            'EDAW',
            'European Commission',
            'European Community',
            'FHI 360',
            'GRM International',
            'Harvard Business School',
            'Indonesia Magnificence of Zakat (IMZ)',
            'International Finance Corporation (IFC)',
            'International Labour Organization (ILO)',
            'JBS International',
            'JPAL',
            'KOMIDA',
            'Kementerian Agama',
            'Kementerian Perekonomian',
            'LPEM FEB UI',
            'MADANI',
            'MSME Nigeria',
            'Micro Save Global Consulting',
            'OIKO Credit',
            'PT Palladium Internasional Indonesia',
            'PT. BRI (Persero) Tbk',
            'PWA',
            'Partnership For Economic Growth (PEG)',
            'Pemerintah Kab. Jombang',
            'RTI International',
            'Regionomika',
            'SEADI',
            'SENADA',
            'SHELL',
            'TIA',
            'TRPC',
            'The Asia Foundation (TAF)',
            'The Habibie Centre',
            'The World Bank',
            'UNAIR',
            'USAID',
            'University Birmingham',
            'Yayasan Care Peduli'
        ];

        foreach ($clients as $name) {
            Client::create(['name' => $name]);
        }
    }
}