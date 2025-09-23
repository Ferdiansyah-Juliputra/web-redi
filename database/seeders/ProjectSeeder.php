<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Client;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        $projects = [
            [
                'name' => 'Hambatan Perdagangan Bebas Dan Investasi Di Jawa Timur',
                'year' => 2001,
                'field_id' => 1,
                'client_id' => 46
            ],
            [
                'name' => 'Survey on Decentralization and Bussiness',
                'year' => 2002,
                'field_id' => 1,
                'client_id' => 46
            ],
            [
                'name' => 'Survey on Decentralization and Bussiness (Phase II)',
                'year' => 2002,
                'field_id' => 1,
                'client_id' => 55
            ],
            [
                'name' => 'Policy Workshop"Survey Results on Perception of Business Owners Toward Decentralization and Its Impact on Business Climate in Surabaya, Bandar Lampung and Manado"',
                'year' => 2003,
                'field_id' => 1,
                'client_id' => 55
            ],
            [
                'name' => 'Policy Workshop"Cooperation Model Among Financial Institution In Distributing Small Scale Business Credit (KUK) In East Java"',
                'year' => 2003,
                'field_id' => 1,
                'client_id' => 46
            ],
            [
                'name' => 'The Finance for Small and Medium Enterprise Study',
                'year' => 2003,
                'field_id' => 1,
                'client_id' => 23
            ],
            [
                'name' => 'Penyusunan Perencanaan Jangka Menengah Pengembangan Industri Kecil di Tuban',
                'year' => 2003,
                'field_id' => 1,
                'client_id' => 18
            ],
            [
                'name' => 'Survey on the Effectiveness of Coordination Among Local Governments in East Java In Improving Business Climate',
                'year' => 2003,
                'field_id' => 1,
                'client_id' => 55
            ],
            [
                'name' => 'The Finance for Small and Medium Enterprise Study (Phase II - FGD)',
                'year' => 2004,
                'field_id' => 1,
                'client_id' => 23
            ],
            [
                'name' => 'Study and Advocacy: Invesment Barriers in Eastern Indonesia for The Foreign Direct Invesment from European Union Countries',
                'year' => 2004,
                'field_id' => 1,
                'client_id' => 26
            ],
            [
                'name' => 'Bupati/Mayors Forum on Domestic Trade Barriers in East Java',
                'year' => 2004,
                'field_id' => 1,
                'client_id' => 55
            ],
            [
                'name' => 'Program on Mapping Potential Export Commodities and Improvement Access to European Union Countries Market for Enterprieses in East Java',
                'year' => 2004,
                'field_id' => 1,
                'client_id' => 26
            ],
            [
                'name' => 'Surabaya Vision Plan 2005 - 2025 Project',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => 24
            ],
            [
                'name' => 'Local Governance Rapid Assessment Method (LG-RAM)',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => [48, 59]
            ],
            [
                'name' => 'Internal Assessment of Technical Assistance to OSS in Kota Kediri and Kota Yogyakarta',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => 55
            ],
            [
                'name' => 'Penyediaan Jasa Penelitian Pemetaan Peraturan Daerah dan Potensi Dampaknya Terhadap Pertumbuhan Ekonomi dan Inflasi di Jawa Timur',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Local Governance Activity Maping Protocol (LG-AMP)',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => [48, 59]
            ],
            [
                'name' => 'BPRs & LPDs Customer Satisfaction Survey',
                'year' => 2005,
                'field_id' => 1,
                'client_id' => [22, 16]
            ],
            [
                'name' => 'Penyediaan Jasa Penelitian Potensi Dampak Ekonomi dan Sosial Blok Migas Cepu Bagi Jawa Timur',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Workshop Reformasi Birokrasi',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => 56
            ],
            [
                'name' => 'Dissemination of BPR & LPDs Customer Satisfaction Survey Result',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => [22, 16]
            ],
            [
                'name' => 'Survey Kepuasan Nasabah BPR',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => 22
            ],
            [
                'name' => 'Survey Kepuasan Publik Terhadap Pelayanan Sektor Swasta',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => 22
            ],
            [
                'name' => 'Survey Analisa Ekonomi Daerah',
                'year' => 2006,
                'field_id' => 1,
                'client_id' => 19
            ],
            [
                'name' => 'Studi Hambatan Daya Saing Industri Furniture di Jawa Timur dan Jawa Tengah',
                'year' => 2007,
                'field_id' => 1,
                'client_id' => [51, 59]
            ],
            [
                'name' => 'Penyusunan Buku Pengkajian Potensi Agro Kecamatan Wonosalam',
                'year' => 2007,
                'field_id' => 1,
                'client_id' => 47
            ],
            [
                'name' => 'Survei Akses Keuangan di Indonesia',
                'year' => 2007,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Assesment of Non-Formal Education Program',
                'year' => 2007,
                'field_id' => 2,
                'client_id' => 57
            ],
            [
                'name' => 'Kajian Kemungkinan Penggunaan Dana Pemda Sebagai Penjaminan Pembiayaan UMKM di Jawa Timur',
                'year' => 2007,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Market Survey for Furniture Industry',
                'year' => 2008,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Penelitian Pemetaan Profil BPR Dalam Rangka Penyusunan Stratifikasi Industri BPR',
                'year' => 2008,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Certification for Teacher on Structural Position: A Case Study',
                'year' => 2008,
                'field_id' => 2,
                'client_id' => 5
            ],
            [
                'name' => 'The Household Survey on Access to Financial Services for Migrant Workers and Their Families in NTT & NTB',
                'year' => 2008,
                'field_id' => 1,
                'client_id' => 2
            ],
            [
                'name' => 'The Household Survey on Access to Financial Services for Migrant Workers and Their Families in NTT & NTB',
                'year' => 2008,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Vehicle Ownership Survey in Surabaya, Sidoarjo and Gresik',
                'year' => 2008,
                'field_id' => 3,
                'client_id' => 52
            ],
            [
                'name' => 'MCLE Baselines Survey',
                'year' => 2008,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Survei Properti dan Hunian Residensial (SHPR) 2009',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Trade Finance',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => [32, 57]
            ],
            [
                'name' => 'ILO - Mapping',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 32
            ],
            [
                'name' => 'Survei Dampak Krisis Keuangan Global Terhadap Usaha Besar/Menengah',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Micro Finance Institution\'s Survey in East Java',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 32
            ],
            [
                'name' => 'Micro Finance Institution\'s Survey in Yogyakarta and Central Java',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 22
            ],
            [
                'name' => 'BPRS Customer Satisfaction Survey 2009',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 22
            ],
            [
                'name' => 'Study of the Implementation of KUR at the Local Level',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Market Research for Mobile Banking in Indonesia',
                'year' => 2009,
                'field_id' => 1,
                'client_id' => 31
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2010',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Household Survey to 394 Respondents in East Java, West Java & Banten',
                'year' => 2010,
                'field_id' => 3,
                'client_id' => 29
            ],
            [
                'name' => 'Financial Literacy Training & Survey',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Growth Diagnostic Study for East Java',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Survey on Mobile Banking: Enabling Brancless Banking Capacity',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => [31, 54]
            ],
            [
                'name' => 'Penyusunan Indikator Ketenagakerjaan',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 19
            ],
            [
                'name' => 'Penelitian Daya Saing Perbankan di Pasar Kredit Mikro di Jawa Timur',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'MSME Nigeria -  Logistics Arrangement & Study Coordination in Indonesia',
                'year' => 2010,
                'field_id' => 1,
                'client_id' => 40
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Surabaya 2011',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2011',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Financial Literacy Training',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Impact of Free Trade Agreements on Business Activity',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 49
            ],
            [
                'name' => 'Survei Kinerja Zakat Dalam Pengentasan Kemiskinan Wilayah Surabaya',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 30
            ],
            [
                'name' => 'Penyusunan Identifikasi Kebutuhan Pasar Kerja di Kota Surabaya',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 19
            ],
            [
                'name' => 'Survei Pemetaan Struktur Pasar Dan Pola Distribusi Komoditas Strategis Penyumbang Inflasi Daerah',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Manajemen Risiko',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 17
            ],
            [
                'name' => 'Training of Trainer:Edukasi Perbankan & Remitansi',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 44
            ],
            [
                'name' => 'Training of Trainer: Edukasi Keuangan Kepada TKI',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 13
            ],
            [
                'name' => 'Monitoring & Evaluasi Trainers: Edukasi Keuangan Kepada TKI di Sumbawa Besar, NTB',
                'year' => 2011,
                'field_id' => 1,
                'client_id' => 13
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Surabaya 2012',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2012',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Mataram 2012',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => 13
            ],
            [
                'name' => 'Analisis Tingkat Persaingan Usaha Bank di Tingkat Provinsi',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => 9
            ],
            [
                'name' => 'The Impact of Infrastructure Expenditure on Economic Development in East Java : Analyzing Local Government Spending on Infrastructure and its Impact on Economic Growth and Poverty Alleviation in East Java Province',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => [50, 58]
            ],
            [
                'name' => 'Identifying the Contraints to Inclusive Growth in West Nusa Tenggara',
                'year' => 2012,
                'field_id' => 3,
                'client_id' => 50
            ],
            [
                'name' => 'Study of the Impact of Branchless Banking on Increasing Access to Financial Services for Households, KPW Bank Indonesia East Java Province',
                'year' => 2012,
                'field_id' => 1,
                'client_id' => 10
            ],
            [
                'name' => 'Dana Talangan Haji',
                'year' => 2012,
                'field_id' => 3,
                'client_id' => 36
            ],
            [
                'name' => 'Survei Penjualan Eceran',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Mataram 2013',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 13
            ],
            [
                'name' => 'Strengthening Local of Chamber of Commerce in Improving Investment and Trade Environtment in Eastern Indonesia through the Establisment of Centre for Investment and Trade Advisory (CITRA)',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 25
            ],
            [
                'name' => 'Data Series Regional Macroeconomic Model of Bank Indonesia',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Institutional Small FOG Application',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => [50, 45]
            ],
            [
                'name' => 'Conducting Field Level Survey in NTT and Java Island',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 41
            ],
            [
                'name' => 'Quick Survey "Analisis Kinerja Sektor Konstruksi dan Properti"',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Baseline Survey for the Evaluation of the Education Partnership - Component 1 (School Construction)',
                'year' => 2013,
                'field_id' => 2,
                'client_id' => 28
            ],
            [
                'name' => 'PNPM Mandiri RLF Capacity Building',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'USAID-Indonesia Opportunities for Vulnerable Children (OVC) Midterm Evaluation',
                'year' => 2013,
                'field_id' => 3,
                'client_id' => 28
            ],
            [
                'name' => 'Analytical and Capacity Development Partnership (ACDP) on Budgeting',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => [53, 4]
            ],
            [
                'name' => 'Conducting Qualitative Survey in East Java and West Java',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 41
            ],
            [
                'name' => 'Seminar Manajemen Resiko Tata Kelola Untuk Membangun Nilai',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 12
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Mataram 2014',
                'year' => 2013,
                'field_id' => 1,
                'client_id' => 13
            ],
            [
                'name' => 'Survei Penjualan Eceran (SPE) KPwBI Surabaya 2014',
                'year' => 2014,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Market Survei for Mobile Payment Demand Assessment in Indonesia',
                'year' => 2014,
                'field_id' => 1,
                'client_id' => 54
            ],
            [
                'name' => 'Final Inclusion Needs Assessment',
                'year' => 2014,
                'field_id' => 3,
                'client_id' => 28
            ],
            [
                'name' => 'Local Level Workshop PNPM Mandiri',
                'year' => 2014,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'ACDP 042 Principal Preparation Program (PPP) Pilot Test',
                'year' => 2014,
                'field_id' => 3,
                'client_id' => 5
            ],
            [
                'name' => '2014 AIBEP Schools Survey: Data Collection & Cleaning',
                'year' => 2014,
                'field_id' => 2,
                'client_id' => 28
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Surabaya 2014',
                'year' => 2015,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Indonesia USAID PRIORITAS Mid Term Evaluation',
                'year' => 2015,
                'field_id' => 1,
                'client_id' => 33
            ],
            [
                'name' => 'ACDP 042  Principal Preparation Program (PPP) - Survey Implementation',
                'year' => 2015,
                'field_id' => 3,
                'client_id' => 5
            ],
            [
                'name' => 'Jasa Survei Biaya Logistik dan Pola Perdagangan Antar Wilayah 2015',
                'year' => 2015,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'EOPO 1 Evaluation Study-Household Survey',
                'year' => 2015,
                'field_id' => 3,
                'client_id' => 28
            ],
            [
                'name' => 'Survey on Corruption',
                'year' => 2015,
                'field_id' => 1,
                'client_id' => 60
            ],
            [
                'name' => 'Kajian Kemungkinan Pendirian Perusahaan Penjamin Ulang',
                'year' => 2015,
                'field_id' => 1,
                'client_id' => 37
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Surabaya 2015',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Pemanfaatan Dana Desa',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2016',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'Survei Outbond',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan dan Pembelajaran Indonesia (SIPPI) Baseline Survey in West Nusa Tenggara',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Kontribusi Kawasan Industri Dalam Peningkatan Daya Saing Industri Di Jawa Timur',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Jember 2016',
                'year' => 2016,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Jember 2017',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 11
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Jember 2016',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 11
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan dan Pembelajaran Indonesia (SIPPI) Baseline Survey in East Nusa Tenggara',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2017',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'Survei Penurunan Konsumsi dan Pendalaman Aktivitas e-Commerce Masyarakat',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'USAID-Mitra Kunci: Employer Survey Data Collection',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 23
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan dan Pembelajaran Indonesia (SIPPI) Baseline Survey in North Kalimantan',
                'year' => 2017,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2017',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 14
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku 2017',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2017',
                'year' => 2017,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Nusa Tenggara Barat (WO 1)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Nusa Tenggara Timur (WO 2)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Jember 2018',
                'year' => 2018,
                'field_id' => 1,
                'client_id' => 11
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Nusa Tenggara Timur (WO 3)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Nusa Tenggara Barat (WO 4)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - SLA (SUB 015)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Jasa Konsultasi Penasehat Keuangan Penerbitan Saham Seri B Bank Bengkulu',
                'year' => 2018,
                'field_id' => 1,
                'client_id' => 15
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - NTB Endline (WO 1)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - East Java (WO 2)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Grantee (WO 3)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - East Java 2 (WO 4)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Additional Schools (WO 5)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - Additional Schools (WO 6)',
                'year' => 2018,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Jember 2018',
                'year' => 2018,
                'field_id' => 1,
                'client_id' => 11
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku 2018',
                'year' => 2018,
                'field_id' => 1,
                'client_id' => 8
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - East Java (WO 7)',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Jember 2019',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 11
            ],
            [
                'name' => 'Rural Poverty Assessment Field Survey Round 1',
                'year' => 2019,
                'field_id' => 3,
                'client_id' => 57
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2019',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - North Kalimantan (WO 008)',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - East Java (WO 7A)',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia (SIPPI) - East Java (WO 009)',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2019',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Rural Poverty Assessment Field Survey Round 2',
                'year' => 2019,
                'field_id' => 3,
                'client_id' => 57
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia - SUB 018',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia - SUB 021',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia - SUB 022',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'INOVASI: Survei Inovasi Pendidikan Dan Pembelajaran Indonesia - SUB 023',
                'year' => 2019,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Impact Evaluation of Subnational Infrastructure Investment in Indonesia',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Survei Konsumen (SK) di Jember & Banyuwangi KPwBI Jember 2019',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku 2019',
                'year' => 2019,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'INOVASI: Provision of Endline Survey in NTB, NTT, Kaltara, and East Java.',
                'year' => 2020,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2020',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Impact Evaluation of KUR Program - Data Collection for follow-up Survey - Coordinating Ministry of Economy',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2020',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'USAID-MADANI: Baseline Data Collection 2020',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 27
            ],
            [
                'name' => 'McCormick Rapid Impact Women’s Empowerment Framework (RI-MWEF) Baseline Study: Indonesia',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 61
            ],
            [
                'name' => 'Pelaksanaan Preferensi Wisatawan Domestik Pasca Covid-19 KPwBI Surabaya',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Jember 2021',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku 2021',
                'year' => 2020,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Preferensi Wisatawan (Pariwisata) KPwBI Surabaya 2021',
                'year' => 2021,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Study Gender Responsive Value Chain And Entrepreneurship Development Programme - PO-2101-0028',
                'year' => 2021,
                'field_id' => 3,
                'client_id' => 61
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2021',
                'year' => 2021,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2021',
                'year' => 2021,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Gender Equality and Social Inclusion (GESI) in Mass Transit in Bandung',
                'year' => 2021,
                'field_id' => 3,
                'client_id' => 57
            ],
            [
                'name' => 'Status of Women Owned MSMEs in North Sulawesi, South Sumatra & Riau',
                'year' => 2021,
                'field_id' => 3,
                'client_id' => 1
            ],
            [
                'name' => 'INOVASI: Data Collection for the Situational Analysis of Learning Gaps and Effect of COVID-19 on Participation in Schooling in Indonesia during 2020/2021 Academic Year',
                'year' => 2021,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Organisation and school-level baseline (for Muhammadiyah and Ma\'arif NU) in scaling out INOVASI literacy and numeracy approach in East Java (IDINO2-SUB-015-0621)',
                'year' => 2021,
                'field_id' => 3,
                'client_id' => 43
            ],
            [
                'name' => 'USAID-MADANI: Social Network Analysis (SNA) Survey',
                'year' => 2021,
                'field_id' => 4,
                'client_id' => [27, 39]
            ],
            [
                'name' => 'INOVASI: Organisation and school-level baseline (for UNAIR, UMSIDA and SAKB) implement Character Education Pilot in East Java ( Lamongan and Sidoarjo) and NTT (West Sumba) and Gender Responsive Learning Pilot in East Java (Sidoarjo)',
                'year' => 2021,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Survei Preferensi Wisatawan Nusantara Pada Masa Adaptasi Kebiasaan Baru di Surabaya KPwBI Surabaya',
                'year' => 2021,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Harga Properti Residensial (SHPR) KPwBI Surabaya 2022',
                'year' => 2021,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'USAID-MADANI: Midline Survey 2022',
                'year' => 2022,
                'field_id' => 1,
                'client_id' => 27
            ],
            [
                'name' => 'Study on Assesment and Scalability of the 21st Century Skills Programme',
                'year' => 2022,
                'field_id' => 2,
                'client_id' => 5
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Papua Barat 2022',
                'year' => 2022,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2022 - 2023',
                'year' => 2022,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Djarum Foundation: Social Emotional Skills and Inquiry-based Learning Programs',
                'year' => 2022,
                'field_id' => 2,
                'client_id' => 5
            ],
            [
                'name' => 'Angkot Operator/Crew Qualitative Study',
                'year' => 2022,
                'field_id' => 3,
                'client_id' => 57
            ],
            [
                'name' => 'Study of Childcare Service in Indonesia',
                'year' => 2022,
                'field_id' => 2,
                'client_id' => 57
            ],
            [
                'name' => 'INOVASI: Initial Assessment Study on Book Provision for School In INOVASI Four (4) Partner Provinces',
                'year' => 2022,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Chidcare Study in Indonesia - Indonesa Gender PASA',
                'year' => 2022,
                'field_id' => 2,
                'client_id' => 57
            ],
            [
                'name' => 'Rajawali: Expanding Financial Access Points in Flores, East Indonesia using Agent-Network Managers (ANM)',
                'year' => 2023,
                'field_id' => 4,
                'client_id' => [20, 57]
            ],
            [
                'name' => 'Survei Harga Properti Residensial Primer (SHPR) KPwBI Surabaya 2023',
                'year' => 2023,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku 2023',
                'year' => 2023,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Pilot-test Plan: Mitra Bukalapak Expansion in Tier 3 Cities',
                'year' => 2023,
                'field_id' => 4,
                'client_id' => [41, 57]
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha KPwBI Papua Barat 2023',
                'year' => 2023,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'INOVASI: Final Assesment on Book Provision for School in Four INOVASI Partner Provinces',
                'year' => 2023,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'USAID-MADANI: Data Collection for Social Network Analysis (SNA) Survey in 31 Districts',
                'year' => 2023,
                'field_id' => 1,
                'client_id' => 27
            ],
            [
                'name' => 'USAID-MADANI: Endline Data Collection 2023',
                'year' => 2023,
                'field_id' => 1,
                'client_id' => 27
            ],
            [
                'name' => 'Adendum Survei Konsumen (SK) KPwBI Maluku 2023',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Listen to Indonesia: Phone Survey Data Collection',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku Maret 2025 - Februari 2026',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2025',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Konsumen (SK) KPwBI Maluku Maret 2024 - Februari 2025',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Harga Properti Residensial Primer (SHPR) KPwBI Surabaya 2024',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Survei Kegiatan Dunia Usaha (SKDU) KPwBI Maluku 2024',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Follow-Up Qualitative Study on The Implementation of the High-Tech High-Touch Teaching Approach in Public Junior High Schools, Indonesia',
                'year' => 2024,
                'field_id' => 2,
                'client_id' => [34, 38]
            ],
            [
                'name' => 'INOVASI: Educational Situational Analysis in Penajam Paser Utara district, Ibu Kota Nusantara (IKN) - 8 Schools',
                'year' => 2024,
                'field_id' => 2,
                'client_id' => 43
            ],
            [
                'name' => 'Djarum Foundation: Study on Output and Outcome of Teaching based Social Emotional Skills (SES) Program in Kudus',
                'year' => 2024,
                'field_id' => 2,
                'client_id' => 5
            ],
            [
                'name' => 'Phone Survey of Pekka Cadres',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 57
            ],
            [
                'name' => 'Market Research Developing Sanitation Solution For The Communities Of Komida Members Along The Riverbanks In Banjarmasin Area',
                'year' => 2024,
                'field_id' => 3,
                'client_id' => [3, 42, 35]
            ],
            [
                'name' => 'Digital Merchant Payment (DMP)',
                'year' => 2024,
                'field_id' => 4,
                'client_id' => 7
            ],
            [
                'name' => 'Business Case Research for Family-Friendly Workplaces',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => [31, 57]
            ],
            [
                'name' => 'PROSPERA: Trade Facilitation Agreement (TFA) Implementation Survey',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => [6, 21]
            ],
            [
                'name' => 'Survei Harga Properti Residensial Primer (SHPR) KPwBI Surabaya 2025',
                'year' => 2024,
                'field_id' => 1,
                'client_id' => 16
            ],
            [
                'name' => 'Listen to Indonesia: Household Data Collection  - Phase 2',
                'year' => 2025,
                'field_id' => 5,
                'client_id' => [57, 4]
            ],
        ];

        
        foreach ($projects as $projectData) {
            $project = Project::create([
                'name' => $projectData['name'],
                'year' => $projectData['year'],
                'field_id' => $projectData['field_id']
            ]);

            if (isset($projectData['client_id'])) {
                $project->clients()->attach($projectData['client_id']);
            } elseif (isset($projectData['client_ids']) && is_array($projectData['client_ids'])) {
                $project->clients()->attach($projectData['client_ids']);
            }
        }
    }
}
