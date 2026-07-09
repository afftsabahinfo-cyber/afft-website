import { makeWhatsappLink } from "@/lib/rent-it-data";

export type CampsiteRegionId =
  | "kota-kinabalu"
  | "tuaran"
  | "kota-belud"
  | "ranau"
  | "papar";

export type CampsiteSourceStatus = "web" | "community" | "csv";

export type CampsiteSpot = {
  slug: string;
  name: string;
  region: CampsiteRegionId;
  location: string;
  href: string;
  zhHref: string;
  driveFromKK: string;
  feeNote: string;
  entranceNote: string;
  bestFor: string;
  highlight: string;
  watchOut: string;
  gearSuggestion: string;
  photoNote: string;
  sourceStatus: CampsiteSourceStatus;
  sourceLabel: string;
  sourceUrl?: string;
  facebookUrl?: string;
  facebookSummary?: string;
  photoUrl?: string;
};

export const campsiteRegionTabs: Array<{
  id: "all" | CampsiteRegionId;
  label: string;
  zhLabel: string;
}> = [
  { id: "all", label: "All", zhLabel: "全部" },
  { id: "kota-kinabalu", label: "Kota Kinabalu", zhLabel: "Kota Kinabalu" },
  { id: "tuaran", label: "Tuaran", zhLabel: "Tuaran" },
  { id: "kota-belud", label: "Kota Belud", zhLabel: "Kota Belud" },
  { id: "ranau", label: "Ranau", zhLabel: "兰瑙" },
  { id: "papar", label: "Papar", zhLabel: "吧巴" },
];

export const campsiteRegionProfiles: Record<
  CampsiteRegionId,
  {
    label: string;
    zhLabel: string;
    eyebrow: string;
    summary: string;
    zhSummary: string;
    driveFromKK: string;
    bestFor: string;
    highlight: string;
    watchOut: string;
    gearSuggestion: string;
    photoNote: string;
    zhBestFor: string;
    zhHighlight: string;
    zhWatchOut: string;
    zhGearSuggestion: string;
    zhPhotoNote: string;
  }
> = {
  "kota-kinabalu": {
    label: "Kota Kinabalu",
    zhLabel: "Kota Kinabalu",
    eyebrow: "City-edge hill camps in West Coast Division",
    summary:
      "Shorter drives from central Kota Kinabalu, including Kokol and nearby hill or city-edge camps for quick overnights.",
    zhSummary:
      "以 Kota Kinabalu 周边为主，包括 Kokol 和近郊山上营地，适合短途过夜和第一次露营。",
    driveFromKK: "About 35-70 min from central KK",
    bestFor: "First-time campers, couples, small groups and quick overnight plans.",
    highlight: "Hill air, easier access, shorter setup window and city backup nearby.",
    watchOut: "Road gradient, parking, rain cloud movement and exact lot condition.",
    gearSuggestion:
      "Compact tent setup, camp chairs, warm lighting, coffee kit and creator gear.",
    photoNote:
      "Use AFFT or campsite-authorised photos. Public web photo permission should be checked first.",
    zhBestFor: "适合第一次露营、情侣、小团队和短途过夜。",
    zhHighlight: "车程比较短，有山上空气，也比较容易安排轻露营。",
    zhWatchOut: "注意斜路、停车、雨云和实际营位状况。",
    zhGearSuggestion: "适合轻帐篷、营椅、暖灯、咖啡组和 Creator Gear。",
    zhPhotoNote: "建议使用 AFFT 自己照片或营地方授权照片，外部照片先确认授权。",
  },
  "kota-belud": {
    label: "Kota Belud",
    zhLabel: "Kota Belud",
    eyebrow: "Rivers, mountain views and family camping",
    summary:
      "The strongest campsite cluster in the list. Best for river settings, Mount Kinabalu views, families and bigger friend groups.",
    zhSummary:
      "这份名单里最大的营地区。适合河边、神山景、家庭和朋友大队露营。",
    driveFromKK: "About 1.5-2.5 hr from central KK",
    bestFor: "Families, friends, river camps, photo trips and longer weekend camps.",
    highlight: "Clear rivers, mountain views, wider village settings and stronger outdoor mood.",
    watchOut: "River level, slippery rocks, rain, road access and weekend crowding.",
    gearSuggestion:
      "Tarp, camp chairs, river-safe lights, power station, dry bags and DJI creator gear.",
    photoNote:
      "Prioritise riverside and Mount Kinabalu view photos. Confirm permission before using external photos.",
    zhBestFor: "适合家庭、朋友、河边露营、拍照和周末过夜。",
    zhHighlight: "有河流、神山景、村落感和更强的户外体验。",
    zhWatchOut: "注意水位、石头湿滑、下雨、路况和周末人潮。",
    zhGearSuggestion: "适合天幕、营椅、防水灯、电源、干袋和 DJI 创作者设备。",
    zhPhotoNote: "优先使用河边和神山景照片；外部照片要先确认授权。",
  },
  ranau: {
    label: "Ranau",
    zhLabel: "Ranau",
    eyebrow: "Kundasang, Mesilau and deeper highland camps",
    summary:
      "Covers Kundasang, Mesilau and Ranau highland camps for cooler weather, Mount Kinabalu views, glamping stays and quieter nature routes.",
    zhSummary:
      "包括 Kundasang、Mesilau 和 Ranau 高地营地，适合凉爽天气、神山景、Glamping 和更安静的自然路线。",
    driveFromKK: "About 2-3.5 hr from central KK",
    bestFor: "Couples, families, glamping guests, sunrise views, repeat campers and cool-weather stays.",
    highlight: "Cooler air, mountain backdrop, sunrise mood, highland farms and slower nature routes.",
    watchOut: "Cold nights, wind, rain, fog, steep access, road fatigue and earlier booking needs.",
    gearSuggestion:
      "Warm sleep setup, stronger shelter, Helinox or Snow Peak furniture, lighting, power station and backup rain protection.",
    photoNote:
      "Use real mountain-view, glamping or campsite lot photos. Do not use generic mountain stock.",
    zhBestFor: "适合情侣、家庭、Glamping、高地日出、冷天气和有露营经验的小团队。",
    zhHighlight: "天气凉、神山背景强、日出氛围好，也能连接高地农场和更安静的自然路线。",
    zhWatchOut: "注意夜晚冷、风、雨、雾、斜路、热门日期预订和驾驶疲劳。",
    zhGearSuggestion: "适合保暖睡眠、更稳的遮蔽、Helinox / Snow Peak 家具、营灯、电源和备用防雨。",
    zhPhotoNote: "使用真实营位、Glamping 或神山景照片，不用普通山景图库图。",
  },
  tuaran: {
    label: "Tuaran",
    zhLabel: "Tuaran",
    eyebrow: "Kiulu valley, rivers and Tuaran countryside",
    summary:
      "Covers Kiulu and Tuaran-side countryside camps for guests who want a valley, river or easy outdoor reset without going as far as Ranau.",
    zhSummary:
      "包括 Kiulu 和 Tuaran 一带的山谷、河边与乡村营地，适合不想跑到 Ranau 那么远的客人。",
    driveFromKK: "About 1-1.5 hr from central KK",
    bestFor: "Friends, families, valley views, river activities and beginner outdoor stays.",
    highlight: "Green valley, river mood, fresh air and easier day-to-overnight planning.",
    watchOut: "River level, rain, quiet hours, drone rules and exact platform availability.",
    gearSuggestion:
      "Tarp, camp chairs, simple kitchen kit, warm lights, power station and dry storage.",
    photoNote:
      "Use authorised campsite photos from Kiulu and Tuaran operators, or AFFT field photos when available.",
    zhBestFor: "适合朋友、家庭、山谷景、河边活动和新手户外体验。",
    zhHighlight: "有山谷、河边、空气好，比较容易做一日到过夜安排。",
    zhWatchOut: "注意水位、下雨、安静时段、无人机规则和平台可用性。",
    zhGearSuggestion: "适合天幕、营椅、简单厨房组、暖灯、电源和干燥收纳。",
    zhPhotoNote: "优先使用 Kiulu / Tuaran 营地授权照片，或 AFFT 自己拍摄的现场照片。",
  },
  papar: {
    label: "Papar",
    zhLabel: "Papar",
    eyebrow: "Beach, river and lower-land camps",
    summary:
      "Useful for beach sunsets, river-side family time and shorter south-bound road trips from KK.",
    zhSummary:
      "适合海边日落、河边家庭活动，以及从 KK 往南比较短的路线。",
    driveFromKK: "About 45-90 min from central KK",
    bestFor: "Families, beach sunsets, lower-land camps and easy weekend escapes.",
    highlight: "Beach, river and rural lowland atmosphere with easier access from KK.",
    watchOut: "Heat, shade, tide or river condition, insects and wet-weather comfort.",
    gearSuggestion:
      "Shade tarp, chairs, fan or ventilation plan, lighting, cooler box and mosquito control.",
    photoNote:
      "Use beach or riverside campsite photos only after permission from the campsite or owner.",
    zhBestFor: "适合家庭、海边日落、低地露营和轻松周末出走。",
    zhHighlight: "有海边、河边和乡村低地感觉，从 KK 过去比较容易。",
    zhWatchOut: "注意热、遮荫、潮汐或水位、蚊虫和雨天舒适度。",
    zhGearSuggestion: "适合遮阳天幕、营椅、通风/风扇、灯光、冰箱和防蚊。",
    zhPhotoNote: "海边或河边营地照片必须先获得营地方或照片拥有者允许。",
  },
};

const csvSource = {
  sourceStatus: "csv" as const,
  sourceLabel: "AFFT campsite CSV list, March 2025",
};

const sourceUrls = {
  tegudon: "https://www.mysabah.com/wordpress/tegudon-tourism-village/",
  polumpung:
    "https://says.com/my/lifestyle/sabah-campsite-polumpung-melangkap-mount-kinabalu",
  komfyOfficial: "https://komfykundasang.my.canva.site/",
  hawun: "https://www.sabahtravel.com/accommodation/hawun-valley-kiulu-camping",
  pasakon: "https://vn.trip.com/moments/detail/papar-14900-119138061",
  pokdi:
    "https://www.lemon8-app.com/%40vglyjaaaaa/7527886551570039304?region=my",
  kiuluFarmstay: "https://www.kiulufarmstay.com/",
  mandalipau: "https://sites.google.com/view/mandalipau/about-us",
  mandalipauGuide:
    "https://mypapar.com/2022/09/08/eko-pelancongan-mandalipau-white-water-view-fishpond/",
  hooga:
    "https://www.melancong.com.my/tempat-menarik-di-kundasang-sabah/#Hooga_Glamping_Area",
  awanAwan: "https://booktapak.com/property/awan-awan-kundasang",
  kundasangFarmhouse: "https://booktapak.com/property/kundasangfarmhouse",
  minurod: "https://booktapak.com/property/minurod-campsite",
  taralamas: "https://booktapak.com/property/taralamas-campsite",
  umea: "https://booktapak.com/property/umea-glam-kundasang-by-leafy-t",
};

const facebookSources = {
  kokolHill: "https://www.facebook.com/kokolhillcampsite",
  kokolMamaHill: "https://www.facebook.com/KokolMamaHill",
  yunHai: "https://www.facebook.com/yunhaicampandstay",
  tegudon: "https://www.facebook.com/tegudontourismvillage",
  polumpung: "https://www.facebook.com/pmvcs",
  sondot: "https://www.facebook.com/CampingsitekgstylekotabeludSabah",
  nulinau: "https://www.facebook.com/profile.php?id=100075881679921",
  kisakot: "https://www.facebook.com/kisakotcampsite",
  ecoBayayat: "https://www.facebook.com/ecocampbayayatkadamaian",
  paramat: "https://www.facebook.com/profile.php?id=100057138234613",
  nohutu: "https://www.facebook.com/nohutuecotourism",
  daradaat: "https://www.facebook.com/daradaatcampsite",
  doubleView: "https://www.facebook.com/profile.php?id=61556553215663",
  komfy: "https://www.facebook.com/KomfyKundasang",
  nuluhon: "https://www.facebook.com/nuluhongroupstories",
  mentoki: "https://www.facebook.com/search/pages/?q=Mentoki%20Hideout%20Campsite%20Sabah%20campsite",
  himbaan: "https://www.facebook.com/himbaan",
  tambiau: "https://www.facebook.com/TambiauForestHouseRanauSabah",
  olumaag: "https://www.facebook.com/profile.php?id=61550438752478",
  hawun: "https://www.facebook.com/hawunvalley.kiulu",
  pasakon: "https://www.facebook.com/profile.php?id=100063505363715",
  pokdi: "https://www.facebook.com/profile.php?id=61566503069171",
  kiuluFarmstay: "https://www.facebook.com/kiulufarmstay/",
  mandalipau: "https://www.facebook.com/picnic.camping.fishingpond/",
};

const photoUrls = {
  awanAwan:
    "https://production-hotel-media.s3.us-west-2.amazonaws.com/7284/minified/50090efefad37695562b260c3ca6b6b9.png",
  kundasangFarmhouse:
    "https://production-hotel-media.s3.us-west-2.amazonaws.com/6518/minified/7f4e5d154d4e6083935d0e54ecebe42f.png",
  minurod:
    "https://production-hotel-media.s3.us-west-2.amazonaws.com/7306/minified/ae7d6fd8fad23dc3e9565569f2eb830a.png",
  taralamas:
    "https://production-hotel-media.s3.us-west-2.amazonaws.com/7026/minified/25355ae2d6b464dd925267aebea7a599.png",
  umea:
    "https://production-hotel-media.s3.us-west-2.amazonaws.com/7469/minified/e817d7666170a4964e832808c0b710c3.png",
};

const rawSpots: Array<
  Pick<
    CampsiteSpot,
    | "name"
    | "region"
    | "location"
    | "feeNote"
    | "entranceNote"
    | "sourceStatus"
    | "sourceLabel"
    | "sourceUrl"
    | "facebookUrl"
    | "facebookSummary"
    | "photoUrl"
  >
> = [
  {
    name: "Kokol Hill Campsite",
    region: "kota-kinabalu",
    location: "Kokol Hill, Kota Kinabalu",
    feeNote: "CSV: RM50 front / RM30 back",
    entranceNote: "CSV: RM10 adult, RM5 child below 10",
    facebookUrl: facebookSources.kokolHill,
    facebookSummary:
      "Facebook page lists Kampung Kokol Menggatal, open status and a campsite booking contact.",
    ...csvSource,
  },
  {
    name: "Kokol MamaHill Camping Site",
    region: "kota-kinabalu",
    location: "Kokol Hill, Kota Kinabalu",
    feeNote: "CSV: RM10 per camp",
    entranceNote: "CSV: RM10 adult, RM5 child below 12",
    facebookUrl: facebookSources.kokolMamaHill,
    facebookSummary:
      "Facebook page describes sunset and sunrise views at Mamahill Campsite, Kokol.",
    ...csvSource,
  },
  {
    name: "Skyhill Kokol",
    region: "kota-kinabalu",
    location: "Menggatal / Kokol area",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Yun Hai Camp & Stay",
    region: "kota-kinabalu",
    location: "Kokol - Tombongon",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.yunHai,
    facebookSummary:
      "Facebook page describes camping and culvert tube room stays with mountain range scenery.",
    ...csvSource,
  },
  {
    name: "Pogum Jo Campsite",
    region: "kota-kinabalu",
    location: "Kokol - Tombongon",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Nuluhon Homestay & Campsite",
    region: "kota-kinabalu",
    location: "Kota Kinabalu",
    feeNote: "CSV: RM30 per site",
    entranceNote: "CSV: RM3 per person",
    facebookUrl: facebookSources.nuluhon,
    facebookSummary:
      "Facebook page describes a village-style homestay and campsite with privacy.",
    ...csvSource,
  },
  {
    name: "Tegudon Tourism Village",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "CSV: RM10 Malaysian adult, RM20 non-Malaysian adult",
    entranceNote: "CSV: RM3 Malaysian adult, RM7 non-Malaysian adult",
    sourceStatus: "web",
    sourceLabel: "MySabah public guide + AFFT CSV",
    sourceUrl: sourceUrls.tegudon,
    facebookUrl: facebookSources.tegudon,
    facebookSummary:
      "Facebook page positions Tegudon Tourism Village as a nature campsite.",
  },
  {
    name: "Melangkap Recreation Centre",
    region: "kota-belud",
    location: "Kg Melangkap, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Polumpung Melangkap Camp Site",
    region: "kota-belud",
    location: "Melangkap, Kota Belud",
    feeNote: "To confirm with operator",
    entranceNote: "To confirm with operator",
    sourceStatus: "web",
    sourceLabel: "SAYS public feature + AFFT CSV",
    sourceUrl: sourceUrls.polumpung,
    facebookUrl: facebookSources.polumpung,
    facebookSummary:
      "Facebook page describes a riverside campsite facing Mount Kinabalu beside Panataran River.",
  },
  {
    name: "Sondot View Camp",
    region: "kota-belud",
    location: "Kg Kebayau, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.sondot,
    facebookSummary:
      "Facebook page lists Sondot View Camp in Kota Belud as a sport and recreation campsite.",
    ...csvSource,
  },
  {
    name: "Nulinau Glamping Garden",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.nulinau,
    facebookSummary:
      "Facebook page describes glamping, homestay, camping and river picnic use.",
    ...csvSource,
  },
  {
    name: "Kisakot Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.kisakot,
    facebookSummary:
      "Facebook search results point to Kisakot Campsite in Melangkap Tiong, Kota Belud.",
    ...csvSource,
  },
  {
    name: "Eco Camp Bayayat Kadamaian",
    region: "kota-belud",
    location: "Kadamaian, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.ecoBayayat,
    facebookSummary:
      "Facebook page mentions hiking, camping, rafting, BBQ and river activities.",
    ...csvSource,
  },
  {
    name: "Paramat Garden",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.paramat,
    facebookSummary:
      "Facebook page positions Paramat Garden Kota Belud as a quiet tourist spot.",
    ...csvSource,
  },
  {
    name: "Nohutu Eco Tourism",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.nohutu,
    facebookSummary:
      "Facebook page lists Nohutu Eco Tourism in Kg Melangkap Tiong as outdoor recreation.",
    ...csvSource,
  },
  {
    name: "Daradaat View",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.daradaat,
    facebookSummary:
      "Facebook page describes camping beside Kadamaian River near the foot of Mount Kinabalu.",
    ...csvSource,
  },
  {
    name: "Minakit Retreat",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Double View Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.doubleView,
    facebookSummary:
      "Facebook page lists Double View Campsite-DVC in Kg Tambatuon, Kota Belud.",
    ...csvSource,
  },
  {
    name: "Tambutuon Homestead",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Dingin Batu Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Bayu Kinabalu Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Kiau Paka Campsite & Farmstay",
    region: "kota-belud",
    location: "Kiau / Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Damai View Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "CSV: RM20 adult, RM10 child below 12",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Discovery Maragang Hill",
    region: "ranau",
    location: "Kundasang",
    feeNote: "CSV: RM350 longhouse / RM180 grass patch / RM450 top decks",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Sosodikon Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Komfy Kundasang",
    region: "ranau",
    location: "Mesilau, Kundasang",
    feeNote: "CSV: RM55-RM70 per lot; public sources show rates may vary",
    entranceNote: "CSV: RM30 adult, RM15 child 4-7",
    sourceStatus: "web",
    sourceLabel: "Komfy official site + AFFT CSV",
    sourceUrl: sourceUrls.komfyOfficial,
    facebookUrl: facebookSources.komfy,
    facebookSummary:
      "Facebook page describes Komfy Kabins and Komfy Kamping in Mesilau, Kundasang.",
  },
  {
    name: "Mentoki Hideout Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.mentoki,
    facebookSummary:
      "Facebook search result lists Mentoki Hideout Campsite in Mentoki, Kundasang.",
    ...csvSource,
  },
  {
    name: "Himbaan Garden Stay & Camping",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.himbaan,
    facebookSummary:
      "Facebook page points to Himbaan Gardenstay as a homestay reference.",
    ...csvSource,
  },
  {
    name: "Kundasang Farmhouse",
    region: "ranau",
    location: "Kundasang",
    feeNote: "Booktapak lists from RM30 per night; confirm latest rate",
    entranceNote: "To confirm",
    sourceStatus: "web",
    sourceLabel: "Booktapak public listing + AFFT CSV",
    sourceUrl: sourceUrls.kundasangFarmhouse,
    photoUrl: photoUrls.kundasangFarmhouse,
    facebookSummary:
      "Booktapak describes Kundasang Farmhouse as a campsite in the scenic hills of Kundasang with Mount Kinabalu views.",
  },
  {
    name: "NR Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Hooga Glamping Area",
    region: "ranau",
    location: "Jalan Golf Course Mesilou, Kundasang",
    feeNote: "To confirm with operator",
    entranceNote: "To confirm with operator",
    sourceStatus: "web",
    sourceLabel: "Melancong.my public Kundasang guide",
    sourceUrl: sourceUrls.hooga,
    facebookSummary:
      "Public guide describes Hooga as a Kundasang glamping area with prepared tents, Scandinavian-style furniture and warm night lighting.",
  },
  {
    name: "Umea Glam Kundasang By Leafy Thrive",
    region: "ranau",
    location: "Kundasang",
    feeNote: "Booktapak lists from RM330 per night; confirm latest rate",
    entranceNote: "To confirm",
    sourceStatus: "web",
    sourceLabel: "Booktapak public listing",
    sourceUrl: sourceUrls.umea,
    photoUrl: photoUrls.umea,
    facebookSummary:
      "Booktapak describes Umea Glam as a nature-led Kundasang dome glamping project run by Sabahan founders.",
  },
  {
    name: "Tambiau Forest",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.tambiau,
    facebookSummary:
      "Facebook page describes Tambiau Forest Ranau for forest life, trekking and camping.",
    ...csvSource,
  },
  {
    name: "View Point Dairy Farmstay & Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Taralamas Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "Booktapak lists from RM30 per night; confirm latest rate",
    entranceNote: "To confirm",
    sourceStatus: "web",
    sourceLabel: "Booktapak public listing + AFFT CSV",
    sourceUrl: sourceUrls.taralamas,
    photoUrl: photoUrls.taralamas,
    facebookSummary:
      "Booktapak describes Taralamas as a Ranau campsite with Mount Kinabalu views, BBQ pit, tent renting, river, hill side, farm, hiking and stargazing.",
  },
  {
    name: "Awan Awan Kundasang",
    region: "ranau",
    location: "Kundasang / Ranau district",
    feeNote: "Booktapak lists from RM30 per night; confirm latest rate",
    entranceNote: "To confirm",
    sourceStatus: "web",
    sourceLabel: "Booktapak public listing + AFFT CSV",
    sourceUrl: sourceUrls.awanAwan,
    photoUrl: photoUrls.awanAwan,
    facebookSummary:
      "Booktapak describes Awan Awan Kundasang as a campsite with Mount Kinabalu views, tent spots, BBQ pits, cafe and stargazing.",
  },
  {
    name: "Olumaag Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.olumaag,
    facebookSummary:
      "Facebook page lists Olumaag Campsite at Kg Tiang Lama, Ranau.",
    ...csvSource,
  },
  {
    name: "Hounan Ridge Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Konunukan Gardenstay & Camping",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    ...csvSource,
  },
  {
    name: "Hawun Valley Kiulu Camping",
    region: "tuaran",
    location: "Kiulu",
    feeNote: "Check package availability",
    entranceNote: "Check package availability",
    sourceStatus: "web",
    sourceLabel: "SabahTravel public listing",
    sourceUrl: sourceUrls.hawun,
    facebookUrl: facebookSources.hawun,
    facebookSummary:
      "Facebook page describes Hawun Valley Kiulu for camping, chalets, stargazing, hiking and sunrise or sunset viewing.",
  },
  {
    name: "Kiulu Farmstay",
    region: "tuaran",
    location: "Sungai Kiulu, Tuaran",
    feeNote: "Official site notes RM5 adult Community Development Contribution; stay packages to confirm",
    entranceNote: "Check package and activity access with operator",
    sourceStatus: "web",
    sourceLabel: "Kiulu Farmstay official site + public Kiulu guide",
    sourceUrl: sourceUrls.kiuluFarmstay,
    facebookUrl: facebookSources.kiuluFarmstay,
    facebookSummary:
      "Public guides describe Kiulu Farmstay as community-based ecotourism where guests can stay in rooms or tents and join river or village activities.",
  },
  {
    name: "Minurod Campsite",
    region: "tuaran",
    location: "Tuaran",
    feeNote: "Booktapak lists from RM5 per night; confirm latest rate",
    entranceNote: "To confirm with operator",
    sourceStatus: "web",
    sourceLabel: "Booktapak public listing",
    sourceUrl: sourceUrls.minurod,
    photoUrl: photoUrls.minurod,
    facebookSummary:
      "Booktapak describes Minurod Campsite as a Tuaran riverside campsite for camping, picnicking, water activities and riverside BBQ.",
  },
  {
    name: "Pasakon Beach Camping",
    region: "papar",
    location: "Papar / Beringgis coast",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceStatus: "community",
    sourceLabel: "Public travel photo reference",
    sourceUrl: sourceUrls.pasakon,
    facebookUrl: facebookSources.pasakon,
    facebookSummary:
      "Facebook page describes Pasakon Beach Camp Site as a sunset camping and event space.",
  },
  {
    name: "Pokdi Mandalipau Campsite",
    region: "papar",
    location: "Mandalipau / Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceStatus: "community",
    sourceLabel: "Public community photo reference",
    sourceUrl: sourceUrls.pokdi,
    facebookUrl: facebookSources.pokdi,
    facebookSummary:
      "Facebook page describes Pokdi Campsite Mandalipau with forest, river and quiet nature atmosphere.",
  },
  {
    name: "Mandalipau White Water View & Fishpond",
    region: "papar",
    location: "Kampung Mandalipau, Papar",
    feeNote: "Public guide notes RM3 entry for adults or children aged 7+; activities and overnight rates to confirm",
    entranceNote: "Public guide notes 8:30am-5:00pm day access; confirm if camping overnight",
    sourceStatus: "web",
    sourceLabel: "Mandalipau public site + MyPapar guide",
    sourceUrl: sourceUrls.mandalipau,
    facebookUrl: facebookSources.mandalipau,
    facebookSummary:
      "Public sources describe Mandalipau as a Papar ecotourism area for swimming, picnic, fishing, camping, BBQ, rafting, zip line and family activities.",
  },
];

export function slugifyCampsiteName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCampsiteImageUrl(facebookUrl?: string) {
  if (!facebookUrl) {
    return undefined;
  }

  try {
    const url = new URL(facebookUrl);

    if (!url.hostname.includes("facebook.com") || url.pathname.startsWith("/search")) {
      return undefined;
    }

    const directId = url.searchParams.get("id");
    const pageSlug = url.pathname.split("/").filter(Boolean)[0];
    const pageIdentifier = directId ?? pageSlug;

    if (!pageIdentifier || pageIdentifier === "profile.php") {
      return undefined;
    }

    return `https://graph.facebook.com/${encodeURIComponent(
      pageIdentifier
    )}/picture?type=large`;
  } catch {
    return undefined;
  }
}

export const campsiteSpots: CampsiteSpot[] = rawSpots.map((spot) => {
  const profile = campsiteRegionProfiles[spot.region];
  const slug = slugifyCampsiteName(spot.name);

  return {
    ...spot,
    slug,
    href: `/camping-spots/${spot.region}/${slug}`,
    zhHref: `/zh/camping-spots/${spot.region}/${slug}`,
    driveFromKK: profile.driveFromKK,
    bestFor: profile.bestFor,
    highlight: profile.highlight,
    watchOut: profile.watchOut,
    gearSuggestion: profile.gearSuggestion,
    photoNote: profile.photoNote,
    photoUrl: spot.photoUrl ?? getCampsiteImageUrl(spot.facebookUrl),
  };
});

export const campsiteRegions = campsiteRegionTabs
  .filter((region): region is { id: CampsiteRegionId; label: string; zhLabel: string } =>
    region.id !== "all"
  )
  .map((region) => ({
    ...region,
    profile: campsiteRegionProfiles[region.id],
    spots: campsiteSpots.filter((spot) => spot.region === region.id),
  }));

export const campsiteStats = {
  total: campsiteSpots.length,
  webBacked: campsiteSpots.filter((spot) => spot.sourceStatus === "web").length,
  regions: campsiteRegions.length,
};

export function getCampsiteRegion(regionId: string) {
  return campsiteRegions.find((region) => region.id === regionId);
}

export function getCampsiteSpot(regionId: string, spotSlug: string) {
  return campsiteSpots.find(
    (spot) => spot.region === regionId && spot.slug === spotSlug
  );
}

export const makeCampsiteWhatsappLink = (spotName: string) =>
  makeWhatsappLink(
    `Hi AFFT, I want to ask whether ${spotName} is suitable for my camping trip.`
  );

export const makeZhCampsiteWhatsappLink = (spotName: string) =>
  makeWhatsappLink(`你好 AFFT，我想了解 ${spotName} 适不适合我的露营计划。`);
