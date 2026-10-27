// Programmes, campaigns and expedition itineraries for KAMI.
//
// Facts (dates, targets, unit prices, breakdowns, contacts, bank reference codes)
// come from KAMI's Facebook posts and posters. Items flagged `draft: true`
// are reconstructed outlines that the Secretariat should confirm before
// they are relied on. Bilingual text is written as b(english, malay) and
// rendered with pick() from useLang(). Edit this file to add or update campaigns.

const b = (en, ms) => ({ en, ms })

export const pillars = [
  {
    slug: 'dakwah-belantara',
    title: 'Dakwah Belantara',
    subtitle: b('Outreach expeditions', 'Kembara dakwah dan kebajikan'),
    summary: b(
      'Two-day expeditions to Pos Piah that combine a kenduri for 500, village competitions and house-to-house visits.',
      'Kembara dua hari ke Pos Piah yang menggabungkan kenduri untuk 500 orang, pertandingan kampung dan ziarah dari rumah ke rumah.',
    ),
    description: b(
      'The flagship programme. Each December a convoy of volunteers drives into the Orang Asli settlement of Pos Piah, Sungai Siput, to host a kenduri for the whole village, run competitions for the children and visit the households that need help most.',
      'Program teras KAMI. Setiap Disember, konvoi sukarelawan memandu masuk ke perkampungan Orang Asli Pos Piah, Sungai Siput, untuk mengadakan kenduri buat seisi kampung, mengendalikan pertandingan untuk anak-anak dan menziarahi keluarga yang paling memerlukan.',
    ),
    image: '/images/volunteers-group.jpg',
  },
  {
    slug: 'iftar-di-belantara',
    title: 'Iftar Di Belantara',
    subtitle: b('Ramadan iftar in the village', 'Iftar Ramadan di kampung'),
    summary: b(
      'A Ramadan iftar for 1,000 Orang Asli villagers, with duit raya and festive provisions for children and OKU families.',
      'Iftar Ramadan untuk 1,000 penduduk Orang Asli, berserta duit raya dan keperluan perayaan untuk kanak-kanak dan keluarga OKU.',
    ),
    description: b(
      'Every Ramadan, KAMI cooks and serves iftar for Pos Piah and the surrounding villages. The same weekend brings duit raya for the children and their fardhu ain teachers, and wheelchairs, diapers and baju raya for families with disabled members.',
      'Setiap Ramadan, KAMI memasak dan menghidang iftar untuk Pos Piah dan kampung-kampung sekitar. Pada hujung minggu yang sama, duit raya diberikan kepada kanak-kanak dan guru fardhu ain mereka, serta kerusi roda, lampin dan baju raya untuk keluarga yang mempunyai ahli OKU.',
    ),
    image: '/images/kenduri-serving-02.jpg',
  },
  {
    slug: 'qurban-di-belantara',
    title: 'Qurban Di Belantara',
    subtitle: b('Qurban and aqiqah in Pos Piah', 'Qurban dan aqiqah di Pos Piah'),
    summary: b(
      'Qurban and aqiqah performed in the village at Aidiladha, with the meat shared on the spot.',
      'Qurban dan aqiqah dilaksanakan di kampung pada Aidiladha, dengan daging diagihkan di tempat.',
    ),
    description: b(
      'Donors sponsor a share of a cow and KAMI performs the qurban in Pos Piah itself, so the meat goes straight to Orang Asli families who rarely see it. A snack fund (Sumbangan Jajan) runs alongside for the children.',
      'Penderma menaja satu bahagian lembu dan KAMI melaksanakan qurban di Pos Piah sendiri, supaya daging sampai terus kepada keluarga Orang Asli yang jarang menikmatinya. Tabung jajan (Sumbangan Jajan) berjalan serentak untuk kanak-kanak.',
    ),
    image: '/images/kenduri-serving-04.jpg',
  },
  {
    slug: 'program-amal-islami',
    title: 'Program Amal Islami',
    subtitle: b('Faith education and competitions', 'Pendidikan agama dan pertandingan'),
    summary: b(
      'Hafazan, tilawah, azan, Islamic quiz and colouring competitions for children, with fardhu ain classes for adults.',
      'Pertandingan hafazan, tilawah, azan, kuiz Islami dan mewarna untuk kanak-kanak, berserta kelas fardhu ain untuk dewasa.',
    ),
    description: b(
      'Competitions give children a reason to practise what they learn in the village surau, and prizes they would not otherwise see. Adult circles cover fardhu ain for new and returning Muslims.',
      'Pertandingan memberi anak-anak sebab untuk mengamalkan apa yang dipelajari di surau kampung, dan hadiah yang jarang mereka lihat. Halaqah dewasa merangkumi fardhu ain untuk Mualaf baharu dan yang kembali.',
    ),
    image: '/images/azan-competition.jpg',
  },
  {
    slug: 'ziarah-mahabbah',
    title: 'Ziarah Mahabbah',
    subtitle: b('Household visits and rice aid', 'Ziarah rumah dan bantuan beras'),
    summary: b(
      'Rice and provisions delivered door to door to 340 families, with support for Mualaf households and the Surau Diri Jumaat.',
      'Beras dan bekalan dihantar dari pintu ke pintu kepada 340 keluarga, dengan sokongan untuk keluarga Mualaf dan Surau Diri Jumaat.',
    ),
    description: b(
      'Ziarah Mahabbah is the quiet part of every expedition: volunteers walk the village with sacks of rice, sit with elderly and OKU households, and keep the surau supplied.',
      'Ziarah Mahabbah ialah bahagian senyap setiap kembara: sukarelawan berjalan di kampung dengan guni beras, duduk bersama warga emas dan keluarga OKU, dan memastikan surau sentiasa berbekalan.',
    ),
    image: '/images/volunteers-loading.jpg',
  },
  {
    slug: 'sedekah-jumaat',
    title: 'Sedekah Jumaat',
    subtitle: b('Weekly Friday giving', 'Sedekah mingguan setiap Jumaat'),
    summary: b(
      'RM5, RM10 or RM50 every Friday keeps supplies moving between expeditions.',
      'RM5, RM10 atau RM50 setiap Jumaat memastikan bekalan terus mengalir antara kembara.',
    ),
    description: b(
      'A small, regular gift that funds rice, programme materials and emergency help for Pos Piah in the months between expeditions.',
      'Sumbangan kecil tetap yang membiayai beras, bahan program dan bantuan kecemasan untuk Pos Piah sepanjang bulan-bulan antara kembara.',
    ),
    image: '/images/kelas-fardhu-ain.jpg',
  },
]

const POS_PIAH = 'Kampung Pos Piah, Sungai Siput, Perak'
const POS_PIAH_AREA = b(
  'Kampung Pos Piah and surrounding villages, Sungai Siput, Perak',
  'Kampung Pos Piah dan kampung-kampung sekitar, Sungai Siput, Perak',
)
const MEETING = b(
  'Assembly point in the Klang Valley, confirmed to registered volunteers',
  'Tempat berkumpul di Lembah Klang, disahkan kepada sukarelawan berdaftar',
)
const CONVOY = b(
  'Volunteer convoy of cars and 4x4s; provisions follow on a lorry',
  'Konvoi kereta dan 4x4 sukarelawan; bekalan menyusul dengan lori',
)

const UNIT_PLATE = { label: b('plate', 'pinggan'), labelPlural: b('plates', 'pinggan'), price: 5, tiersQty: [10, 20, 50, 100], max: 1000 }
const UNIT_SHARE = { label: b('share', 'bahagian'), labelPlural: b('shares', 'bahagian'), price: 1000, tiersQty: [1, 2, 3, 7], max: 70 }
const UNIT_LOT = { label: b('lot', 'lot'), labelPlural: b('lots', 'lot'), price: 25, tiersQty: [1, 2, 4, 10], max: 500 }

const bring = [
  b('Modest, comfortable clothing suitable for prayer and outdoor work', 'Pakaian sopan dan selesa yang sesuai untuk solat dan kerja luar'),
  b('Sleeping mat or sleeping bag, pillow and a light blanket', 'Tikar atau beg tidur, bantal dan selimut nipis'),
  b('Torch or headlamp, power bank and a refillable water bottle', 'Lampu suluh atau lampu kepala, bank kuasa dan botol air boleh isi semula'),
  b('Personal medication, insect repellent and sunblock', 'Ubat peribadi, penghalau serangga dan pelindung matahari'),
  b('Covered shoes for loading work and slippers for the surau', 'Kasut bertutup untuk kerja memunggah dan selipar untuk surau'),
  b('Telekung or sarong for prayers', 'Telekung atau kain sarung untuk solat'),
]

const feeFull = (amount) => ({
  amount,
  label: b('Volunteer contribution (indicative)', 'Sumbangan sukarelawan (anggaran)'),
  covers: [
    b('Shared fuel and tolls', 'Perkongsian minyak dan tol'),
    b('All meals on site', 'Semua makanan di lokasi'),
    b('Lodging at the surau and community hall', 'Penginapan di surau dan dewan komuniti'),
    b('Programme T-shirt', 'T-shirt program'),
  ],
  note: b(
    'Indicative figure based on previous editions. The Secretariat confirms the contribution when registration opens.',
    'Angka anggaran berdasarkan edisi terdahulu. Urus Setia mengesahkan sumbangan apabila pendaftaran dibuka.',
  ),
})

// Shared day-1 / day-2 items for a December-style expedition.
const expeditionDay1 = (afternoon) => [
  { time: '06:00', title: b('Assembly and convoy briefing', 'Berkumpul dan taklimat konvoi'), note: b('Vehicles loaded the night before with rice, prizes and kenduri provisions.', 'Kenderaan dimuat malam sebelumnya dengan beras, hadiah dan bekalan kenduri.') },
  { time: '06:45', title: b('Convoy departs for Perak', 'Konvoi bertolak ke Perak'), note: b('Rest stop at Tapah R&R.', 'Hentian rehat di R&R Tapah.') },
  { time: '09:45', title: b('Arrive Sungai Siput', 'Tiba di Sungai Siput'), note: b('Fresh provisions and ice collected in town.', 'Bekalan segar dan ais diambil di pekan.') },
  { time: '11:00', title: b('Arrive Pos Piah', 'Tiba di Pos Piah'), note: b('Welcome by Tok Batin and the village committee. Set up canopy, sound system and registration desk.', 'Disambut oleh Tok Batin dan jawatankuasa kampung. Pasang kanopi, sistem bunyi dan meja pendaftaran.') },
  { time: '11:30', title: b('Ziarah Mahabbah', 'Ziarah Mahabbah'), note: b('House visits with rice and provisions. Priority to elderly, OKU and Mualaf households.', 'Ziarah rumah dengan beras dan bekalan. Keutamaan kepada warga emas, OKU dan keluarga Mualaf.') },
  { time: '13:15', title: b('Zohor prayer and lunch', 'Solat Zohor dan makan tengah hari') },
  ...afternoon,
  { time: '19:15', title: b('Maghrib prayer, tazkirah and dinner', 'Solat Maghrib, tazkirah dan makan malam') },
]

export const campaigns = [
  // ---------------------------------------------------------------- open
  {
    slug: 'sedekah-jumaat',
    pillar: 'sedekah-jumaat',
    title: 'Sedekah Jumaat',
    subtitle: b('Weekly Friday giving for Pos Piah', 'Sedekah mingguan setiap Jumaat untuk Pos Piah'),
    status: 'open',
    kind: 'recurring',
    dateLabel: b('Every Friday', 'Setiap Jumaat'),
    start: null,
    end: null,
    location: POS_PIAH,
    ref: 'SedekahJumaat',
    summary: b(
      'A small gift every Friday that keeps rice, programme supplies and emergency help flowing to Orang Asli families between expeditions.',
      'Sumbangan kecil setiap Jumaat yang memastikan beras, bekalan program dan bantuan kecemasan terus mengalir kepada keluarga Orang Asli antara kembara.',
    ),
    description: [
      b(
        'Expeditions happen a few times a year, but needs in Pos Piah do not wait. Sedekah Jumaat pools small weekly gifts into a standing fund that the committee can draw on for rice runs, surau supplies, medical transport and the next programme.',
        'Kembara berlangsung beberapa kali setahun, tetapi keperluan di Pos Piah tidak menunggu. Sedekah Jumaat mengumpulkan sumbangan mingguan yang kecil ke dalam satu tabung tetap yang boleh digunakan jawatankuasa untuk penghantaran beras, bekalan surau, pengangkutan perubatan dan program seterusnya.',
      ),
      b(
        'Give once, or set a weekly or monthly amount. Every ringgit is receipted and reported back on this page and on the KAMI Facebook page.',
        'Sumbang sekali, atau tetapkan jumlah mingguan atau bulanan. Setiap ringgit diresitkan dan dilaporkan semula di halaman ini dan di halaman Facebook KAMI.',
      ),
    ],
    quote: {
      text: b(
        '...and whatever you spend in charity, He will replace it; and He is the best of providers.',
        '...dan apa sahaja yang kamu dermakan maka Allah akan menggantikannya; dan Dialah jua sebaik-baik Pemberi rezeki.',
      ),
      source: b('Surah Saba, 34:39', 'Surah Saba’, 34:39'),
    },
    target: null,
    tiers: [5, 10, 50, 100],
    unit: null,
    frequencies: ['once', 'weekly', 'monthly'],
    breakdown: [
      { item: b('Rice and dry provisions', 'Beras dan bekalan kering'), detail: b('Ziarah Mahabbah visits between expeditions', 'Ziarah Mahabbah antara kembara') },
      { item: b('Programme materials and prizes', 'Bahan program dan hadiah'), detail: b('Program Amal Islami competitions', 'Pertandingan Program Amal Islami') },
      { item: b('Festive and emergency provisions', 'Bekalan perayaan dan kecemasan'), detail: b('OKU, elderly and Mualaf households', 'Keluarga OKU, warga emas dan Mualaf') },
    ],
    image: '/images/kenduri-serving-02.jpg',
    poster: '/images/posters/dakwah-belantara-2025.jpg',
    contacts: ['aziz'],
    itinerary: null,
  },
  {
    slug: 'dakwah-belantara-2026',
    pillar: 'dakwah-belantara',
    title: 'Dakwah Belantara 2026',
    subtitle: b('December expedition to Pos Piah', 'Kembara Disember ke Pos Piah'),
    status: 'open',
    kind: 'expedition',
    dateLabel: b('December 2026, dates to be announced', 'Disember 2026, tarikh akan diumumkan'),
    start: '2026-12-01',
    end: null,
    tba: true,
    location: POS_PIAH,
    ref: 'DakwahBelantara',
    summary: b(
      'The year-end expedition: a kenduri for 500 villagers, sports competitions for the youth and Ziarah Mahabbah support for Mualaf families.',
      'Kembara hujung tahun: kenduri untuk 500 penduduk, pertandingan sukan untuk belia dan sokongan Ziarah Mahabbah untuk keluarga Mualaf.',
    ),
    description: [
      b(
        'Dakwah Belantara is the programme KAMI was founded around. A convoy of volunteers spends a weekend in Pos Piah, cooks for the whole village, runs sports and games for the young people and visits the families who need help most.',
        'Dakwah Belantara ialah program yang menjadi asas penubuhan KAMI. Konvoi sukarelawan menghabiskan satu hujung minggu di Pos Piah, memasak untuk seisi kampung, mengendalikan sukan dan permainan untuk anak muda dan menziarahi keluarga yang paling memerlukan.',
      ),
      b(
        'The December 2026 edition follows the shape of last year’s programme. Dates and the final budget will be confirmed by the Secretariat; contributions received now go straight into the expedition fund.',
        'Edisi Disember 2026 mengikut bentuk program tahun lalu. Tarikh dan bajet akhir akan disahkan oleh Urus Setia; sumbangan yang diterima sekarang terus masuk ke tabung kembara.',
      ),
    ],
    target: 6000,
    targetNote: b(
      'Estimated from the December 2025 edition. The Secretariat will confirm the final budget.',
      'Anggaran berdasarkan edisi Disember 2025. Urus Setia akan mengesahkan bajet akhir.',
    ),
    tiers: [25, 50, 100, 250],
    unit: null,
    frequencies: ['once'],
    breakdown: [
      { item: b('Sports competition prizes', 'Hadiah pertandingan sukan'), detail: b('Village sports and games for youth', 'Sukan dan permainan kampung untuk belia') },
      { item: b('Kenduri for 500 Orang Asli', 'Kenduri untuk 500 Orang Asli'), detail: b('Cooked and served by volunteers', 'Dimasak dan dihidang oleh sukarelawan') },
      { item: b('Ziarah Mahabbah', 'Ziarah Mahabbah'), detail: b('One-off support for Mualaf families', 'Sokongan sekali untuk keluarga Mualaf') },
    ],
    image: '/images/kenduri-crowd.jpg',
    poster: '/images/posters/dakwah-belantara-2025.jpg',
    contacts: ['aziz', 'redha', 'azrul', 'halim'],
    itinerary: {
      draft: true,
      title: b('Two-day expedition outline', 'Rangka kembara dua hari'),
      meetingPoint: MEETING,
      transport: CONVOY,
      fee: feeFull(120),
      days: [
        {
          label: b('Day 1', 'Hari 1'),
          date: b('Saturday', 'Sabtu'),
          items: [
            ...expeditionDay1([
              { time: '14:30', title: b('Youth sports', 'Sukan belia'), note: b('Football, netball and traditional games by age group.', 'Bola sepak, bola jaring dan permainan tradisional mengikut kumpulan umur.') },
              { time: '16:30', title: b('Asar prayer and tea', 'Solat Asar dan minum petang') },
              { time: '17:00', title: b('Sports finals and children’s games', 'Akhir sukan dan permainan kanak-kanak') },
            ]),
            { time: '20:30', title: b('Evening programme', 'Program malam'), note: b('Nasyid, storytelling and a short talk for families at the surau.', 'Nasyid, bercerita dan ceramah ringkas untuk keluarga di surau.') },
            { time: '22:30', title: b('Lights out', 'Lampu padam'), note: b('Volunteers lodge at the surau and community hall.', 'Sukarelawan bermalam di surau dan dewan komuniti.') },
          ],
        },
        {
          label: b('Day 2', 'Hari 2'),
          date: b('Sunday', 'Ahad'),
          items: [
            { time: '05:45', title: b('Subuh prayer and morning tazkirah', 'Solat Subuh dan tazkirah pagi') },
            { time: '07:00', title: b('Breakfast; kenduri preparation begins', 'Sarapan; persiapan kenduri bermula'), note: b('Cooking teams start on rice and gulai for 500 guests.', 'Pasukan memasak mula menyediakan nasi dan gulai untuk 500 tetamu.') },
            { time: '09:00', title: b('Fardhu ain circles', 'Halaqah fardhu ain'), note: b('Separate sessions for men and women led by the volunteer ustaz.', 'Sesi berasingan untuk lelaki dan wanita dipimpin oleh ustaz sukarelawan.') },
            { time: '12:30', title: b('Kenduri for 500', 'Kenduri untuk 500'), note: b('Shared meal with the whole village.', 'Hidangan bersama seisi kampung.') },
            { time: '14:00', title: b('Prize-giving and closing', 'Penyampaian hadiah dan penutup'), note: b('Prizes for all sports categories; group photograph.', 'Hadiah untuk semua kategori sukan; gambar berkumpulan.') },
            { time: '15:00', title: b('Pack down and convoy departs', 'Kemas dan konvoi bertolak') },
            { time: '19:30', title: b('Arrive Klang Valley', 'Tiba di Lembah Klang') },
          ],
        },
      ],
      bring,
    },
  },
  {
    slug: 'iftar-di-belantara-2027',
    pillar: 'iftar-di-belantara',
    title: 'Iftar Di Belantara 1448H',
    subtitle: b('Ramadan iftar for 1,000 villagers', 'Iftar Ramadan untuk 1,000 penduduk'),
    status: 'upcoming',
    kind: 'expedition',
    dateLabel: b(
      'Ramadan 1448H (February to March 2027), dates to be announced',
      'Ramadan 1448H (Februari hingga Mac 2027), tarikh akan diumumkan',
    ),
    start: '2027-02-20',
    end: null,
    tba: true,
    location: POS_PIAH_AREA,
    ref: 'Ramadan',
    summary: b(
      'Sponsor iftar at RM5 a plate for the Orang Asli community of Pos Piah and the villages around it.',
      'Taja iftar pada RM5 sepinggan untuk masyarakat Orang Asli Pos Piah dan kampung-kampung di sekitarnya.',
    ),
    description: [
      b(
        'In Ramadan 1447H, KAMI served iftar to 1,000 people in Pos Piah and gave duit raya to 200 children and their fardhu ain teachers. The 1448H edition will repeat that programme, with wheelchairs, diapers and baju raya for OKU families.',
        'Pada Ramadan 1447H, KAMI menghidang iftar kepada 1,000 orang di Pos Piah dan memberi duit raya kepada 200 kanak-kanak dan guru fardhu ain mereka. Edisi 1448H akan mengulangi program itu, dengan kerusi roda, lampin dan baju raya untuk keluarga OKU.',
      ),
      b(
        'Each plate costs RM5. Sponsor as many as you like; the committee publishes the final count after the expedition.',
        'Setiap pinggan berharga RM5. Taja seberapa banyak yang anda mahu; jawatankuasa menerbitkan jumlah akhir selepas kembara.',
      ),
    ],
    target: 8000,
    targetNote: b(
      'Based on the Ramadan 1447H budget. The Secretariat will confirm the final budget.',
      'Berdasarkan bajet Ramadan 1447H. Urus Setia akan mengesahkan bajet akhir.',
    ),
    tiers: null,
    unit: UNIT_PLATE,
    frequencies: ['once'],
    breakdown: [
      { item: b('Iftar for 1,000 villagers', 'Iftar untuk 1,000 penduduk'), detail: b('Cooked and served on site over two evenings', 'Dimasak dan dihidang di lokasi selama dua petang') },
      { item: b('Duit raya for 200 children', 'Duit raya untuk 200 kanak-kanak'), detail: b('Given at the iftar', 'Diberikan semasa iftar') },
      { item: b('Duit raya for fardhu ain teachers', 'Duit raya untuk guru fardhu ain'), detail: b('Orang Asli religious teachers in the village', 'Guru agama Orang Asli di kampung') },
      { item: b('Wheelchairs, diapers and baju raya', 'Kerusi roda, lampin dan baju raya'), detail: b('For OKU households', 'Untuk keluarga OKU') },
    ],
    image: '/images/kenduri-serving-01.jpg',
    poster: '/images/posters/iftar-2026.jpg',
    contacts: ['aziz', 'redha', 'azrul', 'halim'],
    itinerary: {
      draft: true,
      title: b('Ramadan weekend outline', 'Rangka hujung minggu Ramadan'),
      meetingPoint: MEETING,
      transport: b('Volunteer convoy; cooking equipment and provisions on a lorry', 'Konvoi sukarelawan; peralatan memasak dan bekalan dengan lori'),
      fee: {
        amount: 100,
        label: b('Volunteer contribution (indicative)', 'Sumbangan sukarelawan (anggaran)'),
        covers: [
          b('Shared fuel and tolls', 'Perkongsian minyak dan tol'),
          b('Sahur and iftar on site', 'Sahur dan iftar di lokasi'),
          b('Lodging at the surau', 'Penginapan di surau'),
        ],
        note: b(
          'Indicative figure. Confirmed by the Secretariat when registration opens.',
          'Angka anggaran. Disahkan oleh Urus Setia apabila pendaftaran dibuka.',
        ),
      },
      days: [
        {
          label: b('Day 1', 'Hari 1'),
          date: b('Saturday', 'Sabtu'),
          items: [
            { time: '07:00', title: b('Assembly and convoy briefing', 'Berkumpul dan taklimat konvoi') },
            { time: '07:45', title: b('Convoy departs for Perak', 'Konvoi bertolak ke Perak') },
            { time: '11:00', title: b('Arrive Pos Piah', 'Tiba di Pos Piah'), note: b('Set up kitchen, canopy and prayer area.', 'Pasang dapur, kanopi dan ruang solat.') },
            { time: '13:00', title: b('Zohor prayer', 'Solat Zohor') },
            { time: '14:00', title: b('Ziarah and distributions', 'Ziarah dan agihan'), note: b('Duit raya for children and teachers; wheelchairs, diapers and baju raya to OKU households.', 'Duit raya untuk kanak-kanak dan guru; kerusi roda, lampin dan baju raya untuk keluarga OKU.') },
            { time: '15:30', title: b('Cooking for 1,000', 'Memasak untuk 1,000'), note: b('Volunteer kitchen teams begin preparing iftar.', 'Pasukan dapur sukarelawan mula menyediakan iftar.') },
            { time: '17:00', title: b('Asar prayer', 'Solat Asar') },
            { time: '19:20', title: b('Iftar with the village', 'Iftar bersama kampung') },
            { time: '20:15', title: b('Maghrib, Isyak and Tarawih at the surau', 'Maghrib, Isyak dan Tarawih di surau') },
            { time: '22:00', title: b('Moreh and rest', 'Moreh dan rehat') },
          ],
        },
        {
          label: b('Day 2', 'Hari 2'),
          date: b('Sunday', 'Ahad'),
          items: [
            { time: '05:00', title: b('Sahur', 'Sahur') },
            { time: '06:00', title: b('Subuh prayer and tazkirah', 'Solat Subuh dan tazkirah') },
            { time: '08:00', title: b('Visits to surrounding villages', 'Ziarah ke kampung sekitar'), note: b('Provisions for families outside the main settlement.', 'Bekalan untuk keluarga di luar penempatan utama.') },
            { time: '11:00', title: b('Pack down', 'Kemas') },
            { time: '12:00', title: b('Convoy departs', 'Konvoi bertolak') },
            { time: '16:00', title: b('Arrive Klang Valley', 'Tiba di Lembah Klang') },
          ],
        },
      ],
      bring,
    },
  },
  {
    slug: 'qurban-di-belantara-2027',
    pillar: 'qurban-di-belantara',
    title: 'Qurban Di Belantara 1448H',
    subtitle: b('Qurban and aqiqah in Pos Piah', 'Qurban dan aqiqah di Pos Piah'),
    status: 'upcoming',
    kind: 'qurban',
    dateLabel: b('Aidiladha 1448H (around May 2027), dates to be announced', 'Aidiladha 1448H (sekitar Mei 2027), tarikh akan diumumkan'),
    start: '2027-05-16',
    end: null,
    tba: true,
    location: POS_PIAH,
    ref: 'qurban',
    summary: b(
      'Sponsor a share of a cow at RM1,000. The qurban is performed in the village and the meat distributed the same day.',
      'Taja satu bahagian lembu pada RM1,000. Qurban dilaksanakan di kampung dan daging diagihkan pada hari yang sama.',
    ),
    description: [
      b(
        'KAMI performs qurban and aqiqah in Pos Piah so that the meat reaches Orang Asli families directly. One cow is divided into seven shares; you can sponsor one share or several, and name the person each share is performed for at checkout.',
        'KAMI melaksanakan qurban dan aqiqah di Pos Piah supaya daging sampai terus kepada keluarga Orang Asli. Seekor lembu dibahagikan kepada tujuh bahagian; anda boleh menaja satu bahagian atau lebih, dan menamakan orang yang setiap bahagian dilaksanakan untuknya semasa pembayaran.',
      ),
      b(
        'Registration for 1448H opens after Ramadan. Shares taken now are held for the next Aidiladha.',
        'Pendaftaran untuk 1448H dibuka selepas Ramadan. Bahagian yang diambil sekarang disimpan untuk Aidiladha seterusnya.',
      ),
    ],
    target: null,
    tiers: null,
    unit: UNIT_SHARE,
    frequencies: ['once'],
    breakdown: [
      { item: b('One share of a cow', 'Satu bahagian lembu'), detail: b('RM1,000 per share, seven shares per cow', 'RM1,000 setiap bahagian, tujuh bahagian seekor lembu') },
      { item: b('Slaughter and distribution', 'Sembelihan dan agihan'), detail: b('Performed in Pos Piah by the volunteer team with the village committee', 'Dilaksanakan di Pos Piah oleh pasukan sukarelawan bersama jawatankuasa kampung') },
    ],
    image: '/images/kenduri-serving-04.jpg',
    poster: '/images/posters/qurban-2026.jpg',
    contacts: ['aziz', 'azrul', 'halim'],
    itinerary: null,
  },
  {
    slug: 'sumbangan-jajan-2027',
    pillar: 'qurban-di-belantara',
    title: 'Sumbangan Jajan 1448H',
    subtitle: b('Snack fund for the children at Aidiladha', 'Tabung jajan untuk kanak-kanak pada Aidiladha'),
    status: 'upcoming',
    kind: 'campaign',
    dateLabel: b('Aidiladha 1448H, alongside the qurban', 'Aidiladha 1448H, serentak dengan qurban'),
    start: '2027-05-16',
    end: null,
    tba: true,
    location: POS_PIAH,
    ref: 'jajan',
    summary: b(
      'RM1,500 buys snacks and treats for every Orang Asli child at the qurban gathering.',
      'RM1,500 membeli jajan dan makanan ringan untuk setiap kanak-kanak Orang Asli di majlis qurban.',
    ),
    description: [
      b(
        'A small fund that makes Aidiladha a festival for the children of Pos Piah. It runs alongside the qurban every year.',
        'Tabung kecil yang menjadikan Aidiladha satu perayaan untuk anak-anak Pos Piah. Ia berjalan serentak dengan qurban setiap tahun.',
      ),
    ],
    target: 1500,
    tiers: [20, 50, 100, 250],
    unit: null,
    frequencies: ['once'],
    breakdown: [{ item: b('Snacks and treats', 'Jajan dan makanan ringan'), detail: b('For the children attending the qurban gathering', 'Untuk kanak-kanak yang menghadiri majlis qurban') }],
    image: '/images/kenduri-crowd.jpg',
    poster: '/images/posters/qurban-2026.jpg',
    contacts: ['aziz', 'azrul', 'halim'],
    itinerary: null,
  },

  // ----------------------------------------------------------- completed
  {
    slug: 'program-amal-islami-2026',
    pillar: 'program-amal-islami',
    title: 'Program Amal Islami 2.0',
    subtitle: b('Dakwah Belantara, August 2026', 'Dakwah Belantara, Ogos 2026'),
    status: 'completed',
    kind: 'expedition',
    dateLabel: b('29 to 30 August 2026', '29 hingga 30 Ogos 2026'),
    start: '2026-08-29',
    end: '2026-08-30',
    location: POS_PIAH,
    ref: 'DakwahBelantara',
    summary: b(
      'Hafazan, tilawah, azan, Islamic quiz and colouring competitions, a kenduri for 500 and rice for 340 families.',
      'Pertandingan hafazan, tilawah, azan, kuiz Islami dan mewarna, kenduri untuk 500 dan beras untuk 340 keluarga.',
    ),
    description: [
      b(
        'The second Program Amal Islami brought competitions in hafazan, tilawah, azan, Islamic quiz and colouring to the children of Pos Piah, alongside a kenduri for 500 villagers.',
        'Program Amal Islami kedua membawa pertandingan hafazan, tilawah, azan, kuiz Islami dan mewarna kepada anak-anak Pos Piah, berserta kenduri untuk 500 penduduk kampung.',
      ),
      b(
        'The same weekend, Ziarah Mahabbah delivered rice to 340 Orang Asli families and supplies to the Surau Diri Jumaat. The appeal was structured in lots of RM25, with a target of RM12,500.',
        'Pada hujung minggu yang sama, Ziarah Mahabbah menghantar beras kepada 340 keluarga Orang Asli dan bekalan kepada Surau Diri Jumaat. Tabung disusun dalam lot RM25, dengan sasaran RM12,500.',
      ),
    ],
    target: 12500,
    tiers: null,
    unit: UNIT_LOT,
    frequencies: ['once'],
    breakdown: [
      { item: b('Competition prizes', 'Hadiah pertandingan'), detail: b('Hafazan, tilawah, azan, Islamic quiz and colouring', 'Hafazan, tilawah, azan, kuiz Islami dan mewarna') },
      { item: b('Kenduri for 500 Orang Asli', 'Kenduri untuk 500 Orang Asli'), detail: b('Cooked and served by volunteers', 'Dimasak dan dihidang oleh sukarelawan') },
      { item: b('Ziarah Mahabbah', 'Ziarah Mahabbah'), detail: b('Rice for 340 families and supplies for the Surau Diri Jumaat', 'Beras untuk 340 keluarga dan bekalan untuk Surau Diri Jumaat') },
    ],
    image: '/images/azan-competition.jpg',
    poster: '/images/posters/amal-islami-2026.jpg',
    contacts: ['aziz', 'redha', 'azrul', 'halim'],
    itinerary: {
      draft: true,
      title: b('Two-day expedition itinerary', 'Jadual kembara dua hari'),
      meetingPoint: MEETING,
      transport: CONVOY,
      fee: feeFull(120),
      days: [
        {
          label: b('Day 1', 'Hari 1'),
          date: b('Saturday 29 August 2026', 'Sabtu 29 Ogos 2026'),
          items: [
            ...expeditionDay1([
              { time: '14:30', title: b('Colouring and Islamic quiz', 'Mewarna dan kuiz Islami'), note: b('Children’s competitions by age group.', 'Pertandingan kanak-kanak mengikut kumpulan umur.') },
              { time: '16:30', title: b('Asar prayer and tea', 'Solat Asar dan minum petang') },
              { time: '17:00', title: b('Games and hafazan heats', 'Permainan dan saringan hafazan') },
            ]),
            { time: '20:30', title: b('Azan and tilawah competition', 'Pertandingan azan dan tilawah'), note: b('Open-air stage; judged by the volunteer ustaz and local teachers.', 'Pentas terbuka; dihakimi oleh ustaz sukarelawan dan guru tempatan.') },
            { time: '22:30', title: b('Lights out', 'Lampu padam') },
          ],
        },
        {
          label: b('Day 2', 'Hari 2'),
          date: b('Sunday 30 August 2026', 'Ahad 30 Ogos 2026'),
          items: [
            { time: '05:45', title: b('Subuh prayer and morning tazkirah', 'Solat Subuh dan tazkirah pagi') },
            { time: '07:00', title: b('Breakfast; kenduri preparation begins', 'Sarapan; persiapan kenduri bermula') },
            { time: '08:30', title: b('Hafazan finals', 'Akhir hafazan'), note: b('Memorisation finals for children and teenagers.', 'Peringkat akhir hafazan untuk kanak-kanak dan remaja.') },
            { time: '10:30', title: b('Fardhu ain circles for adults', 'Halaqah fardhu ain untuk dewasa') },
            { time: '12:30', title: b('Kenduri for 500', 'Kenduri untuk 500') },
            { time: '14:00', title: b('Prize-giving and closing', 'Penyampaian hadiah dan penutup'), note: b('Prizes for every competition category; group photograph.', 'Hadiah untuk setiap kategori pertandingan; gambar berkumpulan.') },
            { time: '15:00', title: b('Pack down and convoy departs', 'Kemas dan konvoi bertolak') },
            { time: '19:30', title: b('Arrive Klang Valley', 'Tiba di Lembah Klang') },
          ],
        },
      ],
      bring,
    },
  },
  {
    slug: 'qurban-di-belantara-2026',
    pillar: 'qurban-di-belantara',
    title: 'Qurban Di Belantara 1447H',
    subtitle: b('Qurban and aqiqah in Pos Piah', 'Qurban dan aqiqah di Pos Piah'),
    status: 'completed',
    kind: 'qurban',
    dateLabel: b('Aidiladha 1447H, late May 2026', 'Aidiladha 1447H, akhir Mei 2026'),
    start: '2026-05-27',
    end: '2026-05-27',
    location: POS_PIAH,
    ref: 'qurban',
    summary: b(
      'Shares of RM1,000 each, performed in the village. A RM1,500 snack fund ran alongside for the children.',
      'Bahagian RM1,000 setiap satu, dilaksanakan di kampung. Tabung jajan RM1,500 berjalan serentak untuk kanak-kanak.',
    ),
    description: [
      b(
        'KAMI opened qurban and aqiqah participation for 1447H to anyone able to take a share. Slaughter and distribution took place in Pos Piah with the village committee.',
        'KAMI membuka penyertaan qurban dan aqiqah 1447H kepada sesiapa yang mampu mengambil satu bahagian. Sembelihan dan agihan dilaksanakan di Pos Piah bersama jawatankuasa kampung.',
      ),
    ],
    target: null,
    tiers: null,
    unit: UNIT_SHARE,
    frequencies: ['once'],
    breakdown: [
      { item: b('One share of a cow', 'Satu bahagian lembu'), detail: b('RM1,000 per share', 'RM1,000 setiap bahagian') },
      { item: b('Sumbangan Jajan', 'Sumbangan Jajan'), detail: b('RM1,500 snack fund for the children', 'Tabung jajan RM1,500 untuk kanak-kanak') },
    ],
    image: '/images/kenduri-serving-03.jpg',
    poster: '/images/posters/qurban-2026.jpg',
    contacts: ['aziz', 'azrul', 'halim'],
    itinerary: null,
  },
  {
    slug: 'iftar-di-belantara-2026',
    pillar: 'iftar-di-belantara',
    title: 'Iftar Di Belantara 1447H',
    subtitle: b('Ramadan iftar for 1,000 villagers', 'Iftar Ramadan untuk 1,000 penduduk'),
    status: 'completed',
    kind: 'expedition',
    dateLabel: b('28 February to 1 March 2026', '28 Februari hingga 1 Mac 2026'),
    start: '2026-02-28',
    end: '2026-03-01',
    location: POS_PIAH_AREA,
    ref: 'IftarDiBelantara',
    summary: b(
      'Iftar for 1,000, duit raya for 200 children and their teachers, and wheelchairs, diapers and baju raya for OKU families.',
      'Iftar untuk 1,000, duit raya untuk 200 kanak-kanak dan guru mereka, serta kerusi roda, lampin dan baju raya untuk keluarga OKU.',
    ),
    description: [
      b(
        'The Ramadan 1447H expedition served iftar to 1,000 people across Pos Piah and the surrounding villages at RM5 a plate, against a budget of RM8,000.',
        'Kembara Ramadan 1447H menghidang iftar kepada 1,000 orang di seluruh Pos Piah dan kampung-kampung sekitar pada RM5 sepinggan, dengan bajet RM8,000.',
      ),
    ],
    target: 8000,
    tiers: null,
    unit: UNIT_PLATE,
    frequencies: ['once'],
    breakdown: [
      { item: b('Iftar for 1,000 villagers', 'Iftar untuk 1,000 penduduk') },
      { item: b('Duit raya for 200 children', 'Duit raya untuk 200 kanak-kanak') },
      { item: b('Duit raya for fardhu ain teachers', 'Duit raya untuk guru fardhu ain') },
      { item: b('Wheelchairs, diapers and baju raya for OKU families', 'Kerusi roda, lampin dan baju raya untuk keluarga OKU') },
    ],
    image: '/images/kenduri-serving-01.jpg',
    poster: '/images/posters/iftar-2026.jpg',
    contacts: ['aziz', 'redha', 'azrul', 'halim'],
    itinerary: null,
  },
  {
    slug: 'dakwah-belantara-2025',
    pillar: 'dakwah-belantara',
    title: 'Dakwah Belantara 2025',
    subtitle: b('December expedition to Pos Piah', 'Kembara Disember ke Pos Piah'),
    status: 'completed',
    kind: 'expedition',
    dateLabel: b('20 to 21 December 2025', '20 hingga 21 Disember 2025'),
    start: '2025-12-20',
    end: '2025-12-21',
    location: POS_PIAH,
    ref: 'DakwahBelantara',
    summary: b(
      'Sports competitions, a kenduri for 500 and one-off Ziarah Mahabbah support for Mualaf families.',
      'Pertandingan sukan, kenduri untuk 500 dan sokongan Ziarah Mahabbah sekali untuk keluarga Mualaf.',
    ),
    description: [
      b(
        'The December 2025 expedition raised RM6,000 for sports prizes, a kenduri for 500 Orang Asli villagers and one-off support for Mualaf families through Ziarah Mahabbah.',
        'Kembara Disember 2025 mengumpul RM6,000 untuk hadiah sukan, kenduri untuk 500 penduduk Orang Asli dan sokongan sekali untuk keluarga Mualaf melalui Ziarah Mahabbah.',
      ),
    ],
    target: 6000,
    tiers: [25, 50, 100, 250],
    unit: null,
    frequencies: ['once'],
    breakdown: [
      { item: b('Sports competition prizes', 'Hadiah pertandingan sukan') },
      { item: b('Kenduri for 500 Orang Asli', 'Kenduri untuk 500 Orang Asli') },
      { item: b('Ziarah Mahabbah', 'Ziarah Mahabbah'), detail: b('One-off support for Mualaf families, 2025', 'Sokongan sekali untuk keluarga Mualaf, 2025') },
    ],
    image: '/images/volunteers-loading.jpg',
    poster: '/images/posters/dakwah-belantara-2025.jpg',
    contacts: ['aziz', 'azrul', 'halim'],
    itinerary: null,
  },
]

export const getCampaign = (slug) => campaigns.find((c) => c.slug === slug)
export const getPillar = (slug) => pillars.find((p) => p.slug === slug)
export const campaignsForPillar = (slug) => campaigns.filter((c) => c.pillar === slug)
export const activeCampaigns = () => campaigns.filter((c) => c.status !== 'completed')
export const itineraries = () => campaigns.filter((c) => c.itinerary)
