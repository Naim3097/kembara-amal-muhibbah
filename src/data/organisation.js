// Organisation facts for Kembara Amal Muhibbah (KAMI).
// Source: KAMI's public Facebook page and campaign posters (fetched 27 Oct 2026).
// Bilingual fields are { en, ms } objects; render them with pick() from useLang().
// Anything marked TODO should be confirmed by the KAMI secretariat.

const b = (en, ms) => ({ en, ms })

export const org = {
  shortName: 'KAMI',
  name: 'Kembara Amal Muhibbah',
  legalName: 'Pertubuhan Kembara Amal Muhibbah',
  tagline: b('Charity expeditions to Orang Asli communities', 'Kembara amal ke komuniti Orang Asli'),
  motto: 'Satu Tekad, Satu Matlamat',
  mottoEn: 'One resolve, one purpose',
  mission: 'Bersama KAMI, kita menabur kebaikan, mengukir harapan, membina ummah.',
  missionEn: 'Together with KAMI, we sow goodness, carve out hope and build the community.',
  email: 'kami.ngo.hq@gmail.com',
  facebook: 'https://www.facebook.com/KembaraAmalMuhibbahKAMI',
  operatingArea: b(
    'Kampung Pos Piah and surrounding villages, Sungai Siput, Perak',
    'Kampung Pos Piah dan kampung-kampung sekitar, Sungai Siput, Perak',
  ),
  registration: 'TODO: Registrar of Societies (ROS) number',
  bank: {
    name: 'Maybank',
    accountNo: '562740301315',
    accountNoSpaced: '5627 4030 1315',
    accountName: 'Pertubuhan Kembara Amal Muhibbah',
  },
  duitnowQr: '/images/duitnow-qr.png',
  committee: [
    { id: 'aziz', role: b('Chairman', 'Pengerusi'), name: 'Ustaz Abdul Aziz bin Abd Gani', phone: '017-399 0337', whatsapp: '60173990337' },
    { id: 'redha', role: b('Deputy Chairman', 'Timbalan Pengerusi'), name: 'Hj Redha Abduh', phone: '012-322 1570', whatsapp: '60123221570' },
    { id: 'azrul', role: b('Secretary', 'Setiausaha'), name: 'Azrul Faizi', phone: '019-326 3334', whatsapp: '60193263334' },
    { id: 'halim', role: b('Treasurer', 'Bendahari'), name: 'Hj Abdul Halim Said', phone: '019-391 3937', whatsapp: '60193913937' },
  ],
  values: [
    {
      ms: 'Kebajikan',
      en: 'Welfare',
      text: b(
        'Food, rice aid, festive provisions and practical help for families who live far from the nearest town.',
        'Makanan, bantuan beras, keperluan perayaan dan bantuan praktikal untuk keluarga yang tinggal jauh dari pekan terdekat.',
      ),
    },
    {
      ms: 'Kepedulian',
      en: 'Care',
      text: b(
        'We go in person. Every programme is delivered on the ground by volunteers who return season after season.',
        'Kami hadir sendiri. Setiap program dilaksanakan di lapangan oleh sukarelawan yang kembali musim demi musim.',
      ),
    },
    {
      ms: 'Persaudaraan',
      en: 'Brotherhood',
      text: b(
        'Shared meals, shared prayers and friendships that outlast a single visit.',
        'Hidangan bersama, solat berjemaah dan persahabatan yang kekal melangkaui satu kunjungan.',
      ),
    },
    {
      ms: 'Kebangsaan',
      en: 'Nationhood',
      text: b(
        'Orang Asli communities are part of the Malaysian story. Our work is a small act of national togetherness.',
        'Masyarakat Orang Asli adalah sebahagian daripada kisah Malaysia. Kerja kami ialah sumbangan kecil kepada kebersamaan negara.',
      ),
    },
  ],
  stats: [
    { value: '1,000', label: b('iftar meals served in Ramadan 1447H', 'hidangan iftar disajikan pada Ramadan 1447H') },
    { value: '340', label: b('Orang Asli families receiving rice aid', 'keluarga Orang Asli menerima bantuan beras') },
    { value: '500', label: b('guests at each expedition kenduri', 'tetamu pada setiap kenduri kembara') },
    { value: '200', label: b('children given duit raya', 'kanak-kanak menerima duit raya') },
  ],
}

export const whatsappLink = (number, text = '') =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const formatRM = (amount, opts = {}) =>
  `RM${Number(amount).toLocaleString('en-MY', { minimumFractionDigits: opts.cents ? 2 : 0, maximumFractionDigits: opts.cents ? 2 : 0 })}`
