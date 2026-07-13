import { makeWhatsappLink } from "@/lib/rent-it-data";

export const campsiteGuideLastReviewedAt = "2026-07-10";
export const campsiteGuideNextReviewAt = "2026-10-08";

export type CampsiteRegionId =
  | "kota-kinabalu"
  | "tuaran"
  | "kota-belud"
  | "ranau"
  | "papar";

export type CampsiteSourceStatus = "web" | "community" | "map" | "csv";

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
  status?: "active" | "closed";
  statusNote?: string;
  zhStatusNote?: string;
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
    eyebrow: "Beach, river, Bongawan and Mandalipau camps",
    summary:
      "Useful for beach sunsets, Mandalipau river camps, Bongawan-side camps, family time and shorter south-bound road trips from KK.",
    zhSummary:
      "适合海边日落、Mandalipau 河边、Bongawan 一带、家庭活动，以及从 KK 往南比较短的路线。",
    driveFromKK: "About 45-90 min from central KK",
    bestFor: "Families, beach sunsets, riverside camps, Bongawan routes and easy weekend escapes.",
    highlight: "Beach, Mandalipau river, Bongawan countryside and rural lowland atmosphere with easier access from KK.",
    watchOut: "Heat, shade, tide or river condition, insects and wet-weather comfort.",
    gearSuggestion:
      "Shade tarp, chairs, fan or ventilation plan, lighting, cooler box and mosquito control.",
    photoNote:
      "Use beach or riverside campsite photos only after permission from the campsite or owner.",
    zhBestFor: "适合家庭、海边日落、河边露营、Bongawan 路线和轻松周末出走。",
    zhHighlight: "有海边、Mandalipau 河边、Bongawan 乡村和低地感觉，从 KK 过去比较容易。",
    zhWatchOut: "注意热、遮荫、潮汐或水位、蚊虫和雨天舒适度。",
    zhGearSuggestion: "适合遮阳天幕、营椅、通风/风扇、灯光、冰箱和防蚊。",
    zhPhotoNote: "海边或河边营地照片必须先获得营地方或照片拥有者允许。",
  },
};

const csvSource = {
  sourceStatus: "csv" as const,
  sourceLabel: "AFFT campsite CSV list, March 2025",
};

const googleMapsSource = {
  sourceStatus: "map" as const,
  sourceLabel: "Google Maps public listing screenshot supplied by AFFT",
};

const googleMapsLiveSource = {
  sourceStatus: "map" as const,
  sourceLabel: "Google Maps public search result, to confirm with operator",
};

const publicMapResearchSource = {
  sourceStatus: "map" as const,
  sourceLabel: "Public map and campsite listing research, to confirm with operator",
};

const makeGoogleMapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

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
  sabahTravelCamping:
    "https://www.sabahtravel.com/articles/post/10-best-camping-sites-in-sabah",
  helloSabahCamping:
    "https://hellosabah.com/top-camping-spots-in-sabah-for-nature-lovers-weekend-adventurers/",
  disanBaang: "https://disanbaang.com/",
};

const facebookSources = {
  kokolHill: "https://www.facebook.com/kokolhillcampsite",
  kokolMamaHill: "https://www.facebook.com/KokolMamaHill",
  skyhill: "https://www.facebook.com/skyhill.kokol",
  tamazaAcv: "https://www.facebook.com/myassociate",
  papasEcoCamp: "https://www.facebook.com/Papasecocampmarahang",
  yunHai: "https://www.facebook.com/yunhaicampandstay",
  backyardKokol: "https://www.facebook.com/people/Backyard-Kokol/100077997461341/",
  kokolHobbiton: "https://www.facebook.com/KokolHobbiton",
  manoriaVillage: "https://www.facebook.com/manoriavillage",
  ngKokol: "https://www.facebook.com/ngkokolcampingsite",
  shalomValleyPark: "https://www.facebook.com/shalomvalleypark",
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
  auraMontoria: "https://www.facebook.com/auramontoria",
  bayuKinabalu: "https://www.facebook.com/profile.php?id=61574868159007",
  binombon: "https://www.facebook.com/profile.php?id=61575959492439",
  damaiView: "https://www.facebook.com/profile.php?id=100083508813018",
  dinginBatu: "https://www.facebook.com/florence7msevenhomestay",
  dragonPearlBeach: "https://www.facebook.com/profile.php?id=61556971106425",
  drbNanamun: "https://www.facebook.com/DRBNanamunBeach",
  kiauPaka: "https://www.facebook.com/kiaufarmstay",
  nolobuhTerintidon: "https://www.facebook.com/TheTravellingNatureOfKg.Terintidon",
  kalangadanHill: "https://www.facebook.com/minin.gampaih",
  minakit: "https://www.facebook.com/profile.php?id=100076145143098",
  nahandang: "https://www.facebook.com/nahandanghomestay",
  pirasKadamaian: "https://www.facebook.com/profile.php?id=100090769778792",
  supuanPurakogis: "https://www.facebook.com/profile.php?id=100089929681378",
  tambatuonHomestead: "https://www.facebook.com/tambatuonhomesteadkb",
  komfy: "https://www.facebook.com/KomfyKundasang",
  nuluhon: "https://www.facebook.com/nuluhongroupstories",
  discoveryMaragang: "https://www.facebook.com/discoverymaraganghill",
  mentoki: "https://www.facebook.com/profile.php?id=100094440098251",
  himbaan: "https://www.facebook.com/himbaan",
  hooga: "https://www.facebook.com/hoogaglamping",
  tambiau: "https://www.facebook.com/TambiauForestHouseRanauSabah",
  konunukan: "https://www.facebook.com/profile.php?id=100063713734079",
  titimpakon: "https://www.facebook.com/profile.php?id=61571449719298",
  tiwungEscape: "https://www.facebook.com/profile.php?id=100092522292666",
  ecocadoRanch: "https://www.facebook.com/profile.php?id=61560725986964",
  dolungan: "https://www.facebook.com/profile.php?id=61590364277361",
  alleyStay: "https://www.facebook.com/profile.php?id=61560796890979",
  sinaranKinabalu: "https://www.facebook.com/profile.php?id=61574066081296",
  lohanMini: "https://www.facebook.com/profile.php?id=100066463973151",
  batuPayung: "https://www.facebook.com/profile.php?id=100090843122616",
  twinsCottage: "https://www.facebook.com/profile.php?id=100063456286193",
  houtBush: "https://www.facebook.com/p/Kombuutan-Camping-and-Nature-Trails-100090890064910/",
  crkCampsite: "https://www.facebook.com/groups/175250286401989/posts/1728070717786597/",
  azZummar: "https://www.facebook.com/azzummarcampsite",
  downhill: "https://www.facebook.com/profile.php?id=61570880141614",
  malimGunung: "https://www.facebook.com/profile.php?id=61570414575315",
  dodonLand: "https://www.facebook.com/dodonland",
  olumaag: "https://www.facebook.com/profile.php?id=61550438752478",
  hawun: "https://www.facebook.com/hawunvalley.kiulu",
  kuriou: "https://www.facebook.com/kuriou.klc",
  disanBaang: "https://www.facebook.com/disanbaang",
  riverBayBeach: "https://www.facebook.com/riverbaybeachtuaran",
  capeRhino: "https://www.facebook.com/caperhinocentre",
  kondisPoint: "https://www.facebook.com/lasmenkondispoint",
  boribi: "https://www.facebook.com/profile.php?id=61568383659929",
  didiama: "https://www.facebook.com/d.idiamacampsite",
  ratau: "https://www.facebook.com/RATAUCAMPSITE",
  sinopian: "https://www.facebook.com/p/Sinopian-Riverside-Rafting-Camp-100093331691481/",
  dumbio: "https://www.facebook.com/cikgulenz/posts/pounsikou-tompinai-linson-tutut-inson-tu-pinoposontob-do-ginawo-kunosongodou-kop/1222759773307694/",
  ponompuhuyan: "https://www.facebook.com/profile.php?id=100077580715265",
  dayangkuBorneo: "https://www.facebook.com/profile.php?id=61564400136035",
  kiuluRiverPark: "https://www.facebook.com/profile.php?id=100069076311350",
  kipumpun: "https://www.facebook.com/profile.php?id=100094907739370",
  outreachBorneo: "https://www.facebook.com/outreachborneo",
  tongkoluson: "https://www.facebook.com/profile.php?id=100077270964796",
  pasakon: "https://www.facebook.com/profile.php?id=100063505363715",
  pokdi: "https://www.facebook.com/profile.php?id=61566503069171",
  kiuluFarmstay: "https://www.facebook.com/kiulufarmstay/",
  mandalipau: "https://www.facebook.com/picnic.camping.fishingpond/",
  pantaiPekurung: "https://www.facebook.com/auroraalan91/posts/%EF%B8%8F%EF%B8%8F%EF%B8%8F/27561375250197074/",
  smartCampsite: "https://www.facebook.com/groups/2138867222959991/posts/2896101577236548/",
  aaBolotikon: "https://www.facebook.com/100063910121150/",
  kaiduanEbt: "https://www.facebook.com/profile.php?id=100063544602576",
  mondikotDeerCamp: "https://www.facebook.com/wemmogindol",
  kigandangRiverView: "https://www.facebook.com/profile.php?id=100065455151012",
  mondoringin: "https://www.facebook.com/profile.php?id=100066984062498",
  hiddenParadisePapar: "https://www.facebook.com/profile.php?id=100085649717725",
  utanParadise: "https://www.facebook.com/profile.php?id=100067395911643",
  seasideSyokClub: "https://www.facebook.com/profile.php?id=61555435002705",
  kumpatRiver: "https://www.facebook.com/kumpatrivercampsitemembakutsabah",
  sawatan: "https://www.facebook.com/SawatanCampSite",
  tuhunonBolotikon: "https://www.facebook.com/profile.php?id=100047989886219",
  malambun: "https://www.facebook.com/malambun.campsite",
};

const photoUrls = {
  pogumJo: "/images/campsites/pogum-jo-campsite.webp",
  skyhill: "/images/campsites/skyhill-kokol.webp",
  tamazaAcv: "/images/campsites/tamaza-acv-telipok.webp",
  jpSantai2: "/images/campsites/jp-s-campsite-santai2.webp",
  modeView: "/images/campsites/mode-view-campsite-kokol-hill.webp",
  vvLand: "/images/campsites/vv-land.webp",
  melangkapRecreation: "/images/campsites/melangkap-recreation-centre.webp",
  papasEcoCamp: "/images/campsites/papas-eco-camp-homestay-id-kalangadan.webp",
  yunHai: "/images/campsites/yun-hai-camp-stay.webp",
  nuluhon: "/images/campsites/nuluhon-homestay-campsite.webp",
  kiauPaka: "/images/campsites/kiau-paka-campsite-farmstay.webp",
  pirasKadamaian: "/images/campsites/piras-kadamaian-campsite-roomstay.webp",
  murogPurog: "/images/campsites/murog-purog-camp-site-kg-tambatuon.webp",
  birdsCherry: "/images/campsites/birds-and-cherry-mini-campsite.webp",
  nolobuh: "/images/campsites/nolobuh-base-camp-eko-pelancongan-kg-terintidon.webp",
  kalangadanHill: "/images/campsites/kalangadan-hill-campsite.webp",
  himbaan: "/images/campsites/himbaan-garden-stay-camping.webp",
  konunukan: "/images/campsites/konunukan-gardenstay-camping.webp",
  titimpakon: "/images/campsites/titimpakon-campsite-staycation.webp",
  langanan: "/images/campsites/langanan-campground.webp",
  mountainCamp: "/images/campsites/the-mountain-camp-mt-kinabalu-by-primastay.webp",
  tiwungEscape: "/images/campsites/tiwung-escape-kundasang.webp",
  ecocadoRanch: "/images/campsites/ecocado-ranch-campsites.webp",
  twinsCottage: "/images/campsites/twins-cottage-campsite-ranau.webp",
  wildCampingMesilou: "/images/campsites/wild-camping-mesilou.webp",
  daparak: "/images/campsites/daparak-campsite.webp",
  senseMount: "/images/campsites/sense-mount-residence-kundasang.webp",
  houtBush: "/images/campsites/hout-bush-campsite.webp",
  crkCampsite: "/images/campsites/crk-campsite.webp",
  kisonit: "/images/campsites/7-d-kisonit-campsite.webp",
  sinopian: "/images/campsites/sinopian-campsite.webp",
  dumbio: "/images/campsites/dumbio-campsite.webp",
  groundCampKiulu: "/images/campsites/ground-camp-kiulu-knc.webp",
  bapaSitam: "/images/campsites/bapa-sitam-campsite.webp",
  sulapPesorong: "/images/campsites/sulap-pesorong-ka-am-dinakan.webp",
  pantaiPekurung: "/images/campsites/pantai-pekurung.webp",
  smartCampsite: "/images/campsites/smart-campsite.webp",
  threeRiversFarm: "/images/campsites/3-rivers-farm.webp",
  kuriou: "/images/campsites/kuriou-lodge-campsite.webp",
  mandalipau: "/images/campsites/mandalipau-white-water-view-fishpond.webp",
  sosodikon: "/images/campsites/sosodikon-campsite.webp",
  mentoki: "/images/campsites/mentoki-hideout-campsite.webp",
  nrCampsite: "/images/campsites/nr-campsite.webp",
  viewPointDairy: "/images/campsites/view-point-dairy-farmstay-campsite.webp",
  olumaag: "/images/campsites/olumaag-campsite.webp",
  hounanRidge: "/images/campsites/hounan-ridge-campsite.webp",
  awanAwan: "/images/campsites/awan-awan-kundasang.webp",
  kundasangFarmhouse: "/images/campsites/kundasang-farmhouse.webp",
  minurod: "/images/campsites/minurod-campsite.webp",
  taralamas: "/images/campsites/taralamas-campsite.webp",
  umea: "/images/campsites/umea-glam-kundasang-by-leafy-thrive.webp",
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
    | "status"
    | "statusNote"
    | "zhStatusNote"
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
    photoUrl: photoUrls.skyhill,
    facebookUrl: facebookSources.skyhill,
    facebookSummary:
      "Public Facebook posts identify Skyhill Kokol and show its hilltop camping scenery.",
    status: "closed",
    statusNote:
      "Google listing checked by AFFT shows Skyhill Kokol as permanently closed.",
    zhStatusNote:
      "AFFT 检查 Google 资料后，Skyhill Kokol 显示为 permanently closed。",
    ...csvSource,
  },
  {
    name: "Yun Hai Camp & Stay",
    region: "kota-kinabalu",
    location: "Kokol - Tombongon",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.yunHai,
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
    photoUrl: photoUrls.pogumJo,
    ...csvSource,
  },
  {
    name: "Nuluhon Homestay & Campsite",
    region: "kota-kinabalu",
    location: "Kota Kinabalu",
    feeNote: "CSV: RM30 per site",
    entranceNote: "CSV: RM3 per person",
    photoUrl: photoUrls.nuluhon,
    facebookUrl: facebookSources.nuluhon,
    facebookSummary:
      "Facebook page describes a village-style homestay and campsite with privacy.",
    ...csvSource,
  },
  {
    name: "Backyard Kokol",
    region: "kota-kinabalu",
    location: "Kokol / Kota Kinabalu hill side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.backyardKokol,
    facebookSummary:
      "Public Facebook and Instagram results identify Backyard Kokol as an official campsite and eco-tourism page around Kokol.",
    ...publicMapResearchSource,
  },
  {
    name: "N.G Kokol Camping Site",
    region: "kota-kinabalu",
    location: "Kokol, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.sabahTravelCamping,
    facebookUrl: facebookSources.ngKokol,
    facebookSummary:
      "SabahTravel public camping guide lists N.G Kokol Camping Site as a Kokol campsite near Kota Kinabalu with city and sea views.",
    ...publicMapResearchSource,
  },
  {
    name: "Tamaza ACV Telipok",
    region: "kota-kinabalu",
    location: "Telipok, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    photoUrl: photoUrls.tamazaAcv,
    facebookUrl: facebookSources.tamazaAcv,
    facebookSummary:
      "Public campsite roundup lists Tamaza ACV in Telipok. The linked Adventure Cultural Village page is the associated operator page, not a separate Tamaza page.",
    ...publicMapResearchSource,
  },
  {
    name: "Shalom Valley Park",
    region: "kota-kinabalu",
    location: "Kota Kinabalu hill or countryside side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.shalomValleyPark,
    facebookSummary:
      "Public campsite roundup lists Shalom Valley Park under Kota Kinabalu camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "JP's Campsite Santai2",
    region: "kota-kinabalu",
    location: "Kota Kinabalu / Kokol side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    photoUrl: photoUrls.jpSantai2,
    facebookSummary:
      "Public campsite research and the exact Google Maps listing identify JP's Campsite Santai2 at Kg Mawaras, Menggatal and show its river and camping area.",
    ...publicMapResearchSource,
  },
  {
    name: "Kokol Hobbiton Forest",
    region: "kota-kinabalu",
    location: "Kokol, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.kokolHobbiton,
    facebookSummary:
      "Public campsite roundup lists Kokol Hobbiton Forest as a Kota Kinabalu hilltop camping spot.",
    ...publicMapResearchSource,
  },
  {
    name: "Papas Eco Camp & Homestay Id Kalangadan",
    region: "kota-kinabalu",
    location: "Jalan Kokol - Tombongon, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Papas Eco Camp & Homestay Id Kalangadan Sabah"
    ),
    photoUrl: photoUrls.papasEcoCamp,
    facebookUrl: facebookSources.papasEcoCamp,
    facebookSummary:
      "The public Facebook campsite page lists Papas Eco Camp Marahang at Jalan Kokol - Tombongon and shows its camping grounds.",
    ...googleMapsLiveSource,
  },
  {
    name: "Manoria Village",
    region: "kota-kinabalu",
    location: "Jalan Kionsom, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Manoria village Sabah campsite"),
    facebookUrl: facebookSources.manoriaVillage,
    facebookSummary:
      "Google Maps public search lists Manoria Village as a camping ground around the Kionsom side of Kota Kinabalu.",
    ...googleMapsLiveSource,
  },
  {
    name: "Mode View Campsite Kokol Hill",
    region: "kota-kinabalu",
    location: "Kokol Hill, Kota Kinabalu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Mode View Campsite Kokol Hill Sabah"),
    photoUrl: photoUrls.modeView,
    facebookSummary:
      "Google Maps public search lists Mode View Campsite Kokol Hill as a Kokol-area camping ground.",
    ...googleMapsLiveSource,
  },
  {
    name: "VV Land",
    region: "kota-kinabalu",
    location: "Kota Kinabalu / Kokol side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("VV Land Kota Kinabalu campsite"),
    photoUrl: photoUrls.vvLand,
    facebookSummary:
      "Google Maps public search lists VV Land as a Kota Kinabalu camping ground candidate.",
    ...googleMapsLiveSource,
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
    photoUrl: photoUrls.melangkapRecreation,
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
    facebookUrl: facebookSources.minakit,
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
    facebookUrl: facebookSources.tambatuonHomestead,
    ...csvSource,
  },
  {
    name: "Dingin Batu Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.dinginBatu,
    ...csvSource,
  },
  {
    name: "Bayu Kinabalu Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.bayuKinabalu,
    ...csvSource,
  },
  {
    name: "Kiau Paka Campsite & Farmstay",
    region: "kota-belud",
    location: "Kiau / Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.kiauPaka,
    facebookUrl: facebookSources.kiauPaka,
    ...csvSource,
  },
  {
    name: "Damai View Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "CSV: RM20 adult, RM10 child below 12",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.damaiView,
    ...csvSource,
  },
  {
    name: "Aura Montoria",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.sabahTravelCamping,
    facebookUrl: facebookSources.auraMontoria,
    facebookSummary:
      "SabahTravel public camping guide lists Aura Montoria in Kota Belud for nature trekking, cave exploration, river dip and camping-style adventure.",
    ...publicMapResearchSource,
  },
  {
    name: "Dragon Pearl Beach Resort",
    region: "kota-belud",
    location: "Kota Belud coast",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.sabahTravelCamping,
    facebookUrl: facebookSources.dragonPearlBeach,
    facebookSummary:
      "SabahTravel public camping guide lists Dragon Pearl Beach Resort in Kota Belud as a beachside camping and resort-style seaside option.",
    ...publicMapResearchSource,
  },
  {
    name: "DRB Nanamun Beach",
    region: "kota-belud",
    location: "Nanamun / Kota Belud coast",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.drbNanamun,
    facebookSummary:
      "Public campsite roundup lists DRB Nanamun Beach under Kota Belud coastal campsites.",
    ...publicMapResearchSource,
  },
  {
    name: "Nahandang Melangkap Homestay and Campsite",
    region: "kota-belud",
    location: "Melangkap, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Nahandang Melangkap Homestay and Campsite Sabah"
    ),
    facebookUrl: facebookSources.nahandang,
    facebookSummary:
      "Google Maps public search lists Nahandang Melangkap Homestay and Campsite as a Melangkap camping ground.",
    ...googleMapsLiveSource,
  },
  {
    name: "Murog Purog Camp Site Kg Tambatuon",
    region: "kota-belud",
    location: "Kg Tambatuon, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Murog Purog Camp Site Kg Tambatuon Kota Belud Sabah"
    ),
    photoUrl: photoUrls.murogPurog,
    facebookSummary:
      "Google Maps public search lists Murog Purog Camp Site in Kg Tambatuon, Kota Belud.",
    ...googleMapsLiveSource,
  },
  {
    name: "Nolobuh Base Camp Eko Pelancongan Kg Terintidon",
    region: "kota-belud",
    location: "Kg Terintidon, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Nolobuh Base Camp Eko Pelancongan Kg Terintidon Kota Belud Sabah"
    ),
    photoUrl: photoUrls.nolobuh,
    facebookUrl: facebookSources.nolobuhTerintidon,
    facebookSummary:
      "The linked public Facebook page belongs to the Kg Terintidon community tourism operator associated with this base camp area.",
    ...googleMapsLiveSource,
  },
  {
    name: "Binombon Campsite",
    region: "kota-belud",
    location: "Tambatuon / Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Binombon Campsite Kota Belud Sabah"),
    facebookUrl: facebookSources.binombon,
    facebookSummary:
      "Google Maps public search lists Binombon Campsite on the Tambatuon side of Kota Belud.",
    ...googleMapsLiveSource,
  },
  {
    name: "Kalangadan Hill Campsite",
    region: "kota-belud",
    location: "Kota Belud / Ranau Bypass side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Kalangadan Hill Campsite Sabah"),
    photoUrl: photoUrls.kalangadanHill,
    facebookUrl: facebookSources.kalangadanHill,
    facebookSummary:
      "The linked public Facebook profile identifies its owner as the manager of Kalangadan Hill Campsite and shows the hill camping area.",
    ...googleMapsLiveSource,
  },
  {
    name: "Supu'an Purakogis Campsite",
    region: "kota-belud",
    location: "Kota Belud / Ranau Bypass side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Supu'an Purakogis Campsite Sabah"),
    facebookUrl: facebookSources.supuanPurakogis,
    facebookSummary:
      "Google Maps public search lists Supu'an Purakogis Campsite around the Kota Belud highland route.",
    ...googleMapsLiveSource,
  },
  {
    name: "Birds & Cherry Mini Campsite",
    region: "kota-belud",
    location: "Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Birds & Cherry Mini Campsite Sabah"),
    photoUrl: photoUrls.birdsCherry,
    facebookSummary:
      "Google Maps public search lists Birds & Cherry Mini Campsite as a Kota Belud camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Piras Kadamaian Campsite & Roomstay",
    region: "kota-belud",
    location: "Kampung Tambatuon, Kota Belud",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Piras Kadamaian Campsite Roomstay Kampung Tambatuon Sabah"
    ),
    photoUrl: photoUrls.pirasKadamaian,
    facebookUrl: facebookSources.pirasKadamaian,
    facebookSummary:
      "Google Maps public search lists Piras Kadamaian Campsite & Roomstay around Kampung Tambatuon.",
    ...googleMapsLiveSource,
  },
  {
    name: "Discovery Maragang Hill",
    region: "ranau",
    location: "Kundasang",
    feeNote: "CSV: RM350 longhouse / RM180 grass patch / RM450 top decks",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.discoveryMaragang,
    ...csvSource,
  },
  {
    name: "Sosodikon Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.sosodikon,
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
    photoUrl: photoUrls.mentoki,
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
    photoUrl: photoUrls.himbaan,
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
    photoUrl: photoUrls.nrCampsite,
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
    facebookUrl: facebookSources.hooga,
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
    photoUrl: photoUrls.viewPointDairy,
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
    photoUrl: photoUrls.olumaag,
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
    photoUrl: photoUrls.hounanRidge,
    ...csvSource,
  },
  {
    name: "Konunukan Gardenstay & Camping",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.konunukan,
    facebookUrl: facebookSources.konunukan,
    ...csvSource,
  },
  {
    name: "Tiwung Escape Kundasang",
    region: "ranau",
    location: "Kundasang, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    photoUrl: photoUrls.tiwungEscape,
    facebookUrl: facebookSources.tiwungEscape,
    facebookSummary:
      "The public Facebook campsite page lists Tiwung Escape in Kundasang and shows its off-grid camping and cabin setting.",
    ...publicMapResearchSource,
  },
  {
    name: "Langanan Campground",
    region: "ranau",
    location: "Kundasang / Ranau highland side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    photoUrl: photoUrls.langanan,
    facebookSummary:
      "Public campsite roundup lists Langanan Campground under Kundasang and Ranau camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Titimpakon Campsite & Staycation",
    region: "ranau",
    location: "Kundasang / Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    photoUrl: photoUrls.titimpakon,
    facebookUrl: facebookSources.titimpakon,
    facebookSummary:
      "Public campsite roundup lists Titimpakon Campsite & Staycation under Kundasang and Ranau camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Dolungan Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Dolungan Campsite Ranau Sabah"),
    facebookUrl: facebookSources.dolungan,
    facebookSummary:
      "Google Maps public search lists Dolungan Campsite as a Ranau camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "The Mountain Camp @ Mt. Kinabalu by PrimaStay",
    region: "ranau",
    location: "Mount Kinabalu / Kundasang side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "The Mountain Camp Mt Kinabalu by PrimaStay Sabah"
    ),
    photoUrl: photoUrls.mountainCamp,
    facebookSummary:
      "Google Maps public search lists The Mountain Camp @ Mt. Kinabalu by PrimaStay as a camping cabin or camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Alley Stay and Mini Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Alley Stay and Mini Campsite Kundasang"),
    facebookUrl: facebookSources.alleyStay,
    facebookSummary:
      "Google Maps public search lists Alley Stay and Mini Campsite as a Kundasang camping ground.",
    ...googleMapsLiveSource,
  },
  {
    name: "Sinaran Kinabalu Campsite",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Sinaran Kinabalu Campsite Kundasang"),
    facebookUrl: facebookSources.sinaranKinabalu,
    facebookSummary:
      "Google Maps public search lists Sinaran Kinabalu Campsite as a Kundasang camping ground.",
    ...googleMapsLiveSource,
  },
  {
    name: "Lohan Mini Camp",
    region: "ranau",
    location: "Jalan Lohan Bongkud, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Lohan Mini Camp Ranau Sabah"),
    facebookUrl: facebookSources.lohanMini,
    facebookSummary:
      "Google Maps public search lists Lohan Mini Camp as a Ranau camping ground on Jalan Lohan Bongkud.",
    ...googleMapsLiveSource,
  },
  {
    name: "ECOCADO Ranch Campsites",
    region: "ranau",
    location: "Kg Kinarasan, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("ECOCADO Ranch Campsites Ranau Sabah"),
    photoUrl: photoUrls.ecocadoRanch,
    facebookUrl: facebookSources.ecocadoRanch,
    facebookSummary:
      "The public Facebook campsite page lists ECOCADO Ranch at Kg Kinarasan, Ranau and shows its ranch camping grounds.",
    ...googleMapsLiveSource,
  },
  {
    name: "Batu Payung Campsite",
    region: "ranau",
    location: "Kampung Kepuakan Ulu Sugut, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Batu Payung Campsite Ranau Sabah"),
    facebookUrl: facebookSources.batuPayung,
    facebookSummary:
      "Google Maps public search lists Batu Payung Campsite as a Ranau-side recreation and camping candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Twin's Cottage & Campsite Ranau",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Twin's Cottage & Campsite Ranau Sabah"),
    photoUrl: photoUrls.twinsCottage,
    facebookUrl: facebookSources.twinsCottage,
    facebookSummary:
      "Google Maps public search lists Twin's Cottage & Campsite as a Ranau camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Malambun Campsite",
    region: "ranau",
    location: "Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Malambun Campsite Ranau Sabah"),
    facebookUrl: facebookSources.malambun,
    facebookSummary:
      "Google Maps public search lists Malambun Campsite as a Ranau tourist and camping candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "AZ-Zummar Campsite",
    region: "ranau",
    location: "Kampung Himbaan, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("AZ-Zummar Campsite Kampung Himbaan Sabah"),
    facebookUrl: facebookSources.azZummar,
    facebookSummary:
      "Google Maps public search lists AZ-Zummar Campsite around Kampung Himbaan.",
    ...googleMapsLiveSource,
  },
  {
    name: "Downhill Campsite",
    region: "ranau",
    location: "Jalan Sosodikon, Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Downhill Campsite Kundasang Sabah"),
    facebookUrl: facebookSources.downhill,
    facebookSummary:
      "Google Maps public search lists Downhill Campsite as a Kundasang camping ground near Jalan Sosodikon.",
    ...googleMapsLiveSource,
  },
  {
    name: "Wild Camping Mesilou",
    region: "ranau",
    location: "Mesilou, Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Wild Camping Mesilou Kundasang Sabah"),
    photoUrl: photoUrls.wildCampingMesilou,
    facebookSummary:
      "Google Maps public search lists Wild Camping Mesilou as a Mesilou camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Malim Gunung Campsite",
    region: "ranau",
    location: "Kundasang / Mount Kinabalu side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Malim Gunung Campsite Kundasang Sabah"),
    facebookUrl: facebookSources.malimGunung,
    facebookSummary:
      "Google Maps public search lists Malim Gunung Campsite as a Kundasang tourist and camping candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Hout Bush Campsite",
    region: "ranau",
    location: "Bundu Tuhan, Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Hout Bush Campsite Bundu Tuhan Sabah"),
    photoUrl: photoUrls.houtBush,
    facebookUrl: facebookSources.houtBush,
    facebookSummary:
      "The shared Kombuutan camping operator page explicitly identifies Hout Bush Campsite and shows its sunset car-camping area.",
    ...googleMapsLiveSource,
  },
  {
    name: "Dodon Land Campsite Kundasang",
    region: "ranau",
    location: "Jalan Kem Bina Negara, Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Dodon Land Campsite Kundasang Sabah"),
    facebookUrl: facebookSources.dodonLand,
    facebookSummary:
      "Google Maps public search lists Dodon Land Campsite Kundasang around Jalan Kem Bina Negara.",
    ...googleMapsLiveSource,
  },
  {
    name: "Daparak Campsite",
    region: "ranau",
    location: "Kundasang / Ranau",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Daparak Campsite Kundasang Sabah"),
    photoUrl: photoUrls.daparak,
    facebookSummary:
      "Google Maps lists Daparak Campsite in Kundasang; the local image shows the adjacent Daparak Hill area because the campsite listing has no public photo.",
    ...googleMapsLiveSource,
  },
  {
    name: "Sense Mount Residence Kundasang",
    region: "ranau",
    location: "Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Sense Mount Residence Kundasang campsite"),
    photoUrl: photoUrls.senseMount,
    facebookSummary:
      "Google Maps public search lists Sense Mount Residence Kundasang as a camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "C.R.K. Campsite",
    region: "ranau",
    location: "Jalan Semuruh Kinaundusan, Kundasang",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("C.R.K. Campsite Kundasang Sabah"),
    photoUrl: photoUrls.crkCampsite,
    facebookUrl: facebookSources.crkCampsite,
    facebookSummary:
      "A public Sabah camping group post explicitly identifies C.R.K. Campsite and shows the campsite grounds.",
    ...googleMapsLiveSource,
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
    name: "Kuriou Lodge & Campsite",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.kuriou,
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.kuriou,
    facebookSummary:
      "Public search results identify Kuriou Lodge & Campsite in Kiulu as a homestay and campsite in the Kiulu valley.",
    ...publicMapResearchSource,
  },
  {
    name: "Disan Baang Campsite",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.disanBaang,
    facebookUrl: facebookSources.disanBaang,
    facebookSummary:
      "Public search results identify Disan Baang Campsite as a Kiulu riverside campsite and family outdoor point.",
    ...publicMapResearchSource,
  },
  {
    name: "River Bay Beach",
    region: "tuaran",
    location: "Kampung Laya-Laya, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.riverBayBeach,
    facebookSummary:
      "Public campsite roundup lists River Bay Beach, Kampung Laya-Laya under Tuaran camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Cape Rhino Centre",
    region: "tuaran",
    location: "Tuaran / coastal side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.capeRhino,
    facebookSummary:
      "Public campsite roundup lists Cape Rhino Centre under Tuaran camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Kondis Point",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.kondisPoint,
    facebookSummary:
      "Public campsite roundup lists Kondis Point in Kiulu under Tuaran and Kiulu camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Outreach Borneo Camp",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.outreachBorneo,
    facebookSummary:
      "Public campsite roundup lists Outreach Borneo Camp in Kiulu under Tuaran and Kiulu camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Boribi Campsite",
    region: "tuaran",
    location: "Tamparuli, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.boribi,
    facebookSummary:
      "Public campsite roundup lists Boribi Campsite in Tamparuli under Tuaran camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "Kiulu River Park",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: sourceUrls.helloSabahCamping,
    facebookUrl: facebookSources.kiuluRiverPark,
    facebookSummary:
      "Public campsite roundup lists Kiulu River Park under Tuaran and Kiulu camping spots.",
    ...publicMapResearchSource,
  },
  {
    name: "D'Idiama Campsite",
    region: "tuaran",
    location: "Kiulu / Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("D'Idiama Campsite Kiulu Sabah"),
    facebookUrl: facebookSources.didiama,
    facebookSummary:
      "Google Maps public search lists D'Idiama Campsite as a Tuaran and Kiulu camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Tongkoluson Campsite",
    region: "tuaran",
    location: "Kiulu / Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Tongkoluson Campsite Kiulu Sabah"),
    facebookUrl: facebookSources.tongkoluson,
    facebookSummary:
      "Google Maps public search lists Tongkoluson Campsite as a Kiulu-side outdoor and camping candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Ratau Campsite",
    region: "tuaran",
    location: "Kg Ratau, Kiulu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Ratau Campsite Kiulu Sabah"),
    facebookUrl: facebookSources.ratau,
    facebookSummary:
      "Google Maps public search lists Ratau Campsite around Kg Ratau Kiulu.",
    ...googleMapsLiveSource,
  },
  {
    name: "Ponompuhuyan Sinompuruan Campsite",
    region: "tuaran",
    location: "Kg Pahu Sogo Sogo, Kiulu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl(
      "Ponompuhuyan Sinompuruan Campsite Kiulu Sabah"
    ),
    facebookUrl: facebookSources.ponompuhuyan,
    facebookSummary:
      "Google Maps public search lists Ponompuhuyan Sinompuruan Campsite around Kg Pahu Sogo Sogo, Kiulu.",
    ...googleMapsLiveSource,
  },
  {
    name: "7'D Kisonit Campsite",
    region: "tuaran",
    location: "Tobobon / Tuaran side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("7'D Kisonit Campsite Sabah"),
    photoUrl: photoUrls.kisonit,
    facebookSummary:
      "Google Maps public search lists 7'D Kisonit Campsite around Jalan Gonipis, Tobobon.",
    ...googleMapsLiveSource,
  },
  {
    name: "Sinopian Campsite",
    region: "tuaran",
    location: "Kiulu, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Sinopian Campsite Kiulu Tuaran Sabah"),
    photoUrl: photoUrls.sinopian,
    facebookUrl: facebookSources.sinopian,
    facebookSummary:
      "The public Sinopian Riverside, Rafting & Camp page identifies Sinopian Campsite in Kiulu and shows the campsite setting.",
    ...googleMapsLiveSource,
  },
  {
    name: "Dayangku Borneo Campstay",
    region: "tuaran",
    location: "Kiulu / Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Dayangku Borneo Campstay Kiulu Sabah"),
    facebookUrl: facebookSources.dayangkuBorneo,
    facebookSummary:
      "Google Maps public search lists Dayangku Borneo Campstay as a Kiulu and Tuaran camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Kipumpun Riverside Campsite",
    region: "tuaran",
    location: "Tuaran / Kiulu river side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Kipumpun Riverside Campsite Sabah"),
    facebookUrl: facebookSources.kipumpun,
    facebookSummary:
      "Google Maps public search lists Kipumpun Riverside Campsite as a Tuaran river-side camping ground candidate.",
    ...googleMapsLiveSource,
  },
  {
    name: "Dumbio Campsite",
    region: "tuaran",
    location: "Kg Kayangat Tenghilan, Tuaran",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Dumbio Campsite Tenghilan Tuaran Sabah"),
    photoUrl: photoUrls.dumbio,
    facebookUrl: facebookSources.dumbio,
    facebookSummary:
      "A public Facebook visitor post explicitly identifies Dumbio Campsite at Kg Kayangat Tenghilan and includes campsite photos.",
    ...googleMapsLiveSource,
  },
  {
    name: "Ground Camp Kiulu (KNC)",
    region: "tuaran",
    location: "Kg Bayag, Kiulu",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("Ground Camp Kiulu KNC Sabah"),
    photoUrl: photoUrls.groundCampKiulu,
    facebookSummary:
      "Google Maps public search lists Ground Camp Kiulu (KNC) around Kg Bayag, Kiulu.",
    ...googleMapsLiveSource,
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
    photoUrl: photoUrls.mandalipau,
    facebookUrl: facebookSources.mandalipau,
    facebookSummary:
      "Public sources describe Mandalipau as a Papar ecotourism area for swimming, picnic, fishing, camping, BBQ, rafting, zip line and family activities.",
  },
  {
    name: "AA Campsite Kg Bolotikon",
    region: "papar",
    location: "Kg Bolotikon, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.aaBolotikon,
    facebookSummary:
      "Public Facebook and Instagram results identify AA Campsite kg Bolotikon Papar as an operator page; Google Maps screenshot also shows it as a Papar camping ground.",
    ...googleMapsSource,
  },
  {
    name: "Bapa Sitam Campsite",
    region: "papar",
    location: "Papar coastal side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.bapaSitam,
    facebookSummary:
      "Google Maps screenshot shows Bapa Sitam Campsite as a Papar camping ground near Pasakon Beach Camp Site.",
    ...googleMapsSource,
  },
  {
    name: "Sulap Pesorong Ka'am Dinakan",
    region: "papar",
    location: "Papar coastal side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.sulapPesorong,
    facebookSummary:
      "Google Maps screenshot shows Sulap Pesorong Ka'am Dinakan as a camping ground on the Papar coast.",
    ...googleMapsSource,
  },
  {
    name: "Pantai Pekurung",
    region: "papar",
    location: "Papar coast",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.pantaiPekurung,
    facebookUrl: facebookSources.pantaiPekurung,
    facebookSummary:
      "A public Facebook location post at Pantai Pekurung shows the coastal camping area.",
    ...googleMapsSource,
  },
  {
    name: "Kaiduan Homestay EBT Campsite",
    region: "papar",
    location: "Kaiduan / Papar highland side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.kaiduanEbt,
    facebookSummary:
      "Google Maps screenshot lists Kaiduan homestay EBT campsite as a camping cabin with sunrise-view comments.",
    ...googleMapsSource,
  },
  {
    name: "Mondikot Deer Camp",
    region: "papar",
    location: "Kg Mondikot, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.mondikotDeerCamp,
    facebookSummary:
      "Google Maps screenshot lists Mondikot Deer Camp as a Papar farmstay and basic camping place.",
    ...googleMapsSource,
  },
  {
    name: "Kigandang River View Camp",
    region: "papar",
    location: "Jalan Manggis Kaiduan Tampasak, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.kigandangRiverView,
    facebookSummary:
      "Google Maps screenshot lists Kigandang River View Camp as a recreation and river-view camping point.",
    ...googleMapsSource,
  },
  {
    name: "3 Rivers Farm",
    region: "papar",
    location: "Mandalipau / Papar river side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    sourceUrl: makeGoogleMapsSearchUrl("3 Rivers Farm Papar Sabah"),
    photoUrl: photoUrls.threeRiversFarm,
    facebookSummary:
      "The exact Google Maps listing at P3CF+4H shows a working riverside farm, campsite grounds, chalet facilities and public camping reviews.",
    ...googleMapsLiveSource,
  },
  {
    name: "Mondoringin Campsite",
    region: "papar",
    location: "Mandalipau / Papar river side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.mondoringin,
    facebookSummary:
      "Google Maps screenshot lists Mondoringin Campsite near the Mandalipau camp cluster.",
    ...googleMapsSource,
  },
  {
    name: "Smart Campsite",
    region: "papar",
    location: "Mandalipau / Papar river side",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    photoUrl: photoUrls.smartCampsite,
    facebookUrl: facebookSources.smartCampsite,
    facebookSummary:
      "A public Sabah camping group post explicitly identifies Smart Campsite on Jalan Kambizaan Ovoi, Papar and shows its family campsite facilities.",
    ...googleMapsSource,
  },
  {
    name: "Hidden Paradise Resort",
    region: "papar",
    location: "Kimanis / Papar inland route",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.hiddenParadisePapar,
    facebookSummary:
      "Google Maps screenshot lists Hidden Paradise Resort in the Papar search area, with public comments mentioning hut stay, river and calming ambience.",
    ...googleMapsSource,
  },
  {
    name: "Utan Paradise Jungle Camp",
    region: "papar",
    location: "Jalan Keningau Kimanis, Papar route",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.utanParadise,
    facebookSummary:
      "Google Maps screenshot lists Utan Paradise Jungle Camp as a camping ground on the Jalan Keningau Kimanis route.",
    ...googleMapsSource,
  },
  {
    name: "The Seaside by Syok Club",
    region: "papar",
    location: "Jalan Kg Gusi, Papar coast",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.seasideSyokClub,
    facebookSummary:
      "Google Maps screenshot lists The Seaside by Syok Club as a Papar coastal camping ground.",
    ...googleMapsSource,
  },
  {
    name: "Kumpat River Campsite",
    region: "papar",
    location: "Bongawan, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.kumpatRiver,
    facebookSummary:
      "Google Maps screenshot lists Kumpat River Campsite in Bongawan, Sabah as a camping cabin with family-river facilities.",
    ...googleMapsSource,
  },
  {
    name: "Sawatan Camp Site (SCS)",
    region: "papar",
    location: "Bongawan, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.sawatan,
    facebookSummary:
      "Google Maps screenshot lists Sawatan Camp Site in Bongawan as a budget-friendly campsite.",
    ...googleMapsSource,
  },
  {
    name: "Tuhunon Bolotikon Riverside (TBR)",
    region: "papar",
    location: "Kampung Bolotikon, Papar",
    feeNote: "To confirm",
    entranceNote: "To confirm",
    facebookUrl: facebookSources.tuhunonBolotikon,
    facebookSummary:
      "Google Maps screenshot lists Tuhunon Bolotikon Riverside as a camping ground in Kampung Bolotikon.",
    ...googleMapsSource,
  },
];

export function slugifyCampsiteName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    photoUrl: spot.photoUrl ?? (spot.facebookUrl ? `/images/campsites/${slug}.webp` : undefined),
  };
});

export const activeCampsiteSpots = campsiteSpots.filter(
  (spot) => spot.status !== "closed"
);

export const campsiteRegions = campsiteRegionTabs
  .filter((region): region is { id: CampsiteRegionId; label: string; zhLabel: string } =>
    region.id !== "all"
  )
  .map((region) => ({
    ...region,
    profile: campsiteRegionProfiles[region.id],
    spots: activeCampsiteSpots.filter((spot) => spot.region === region.id),
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

export function getCampsitePhotoCredit(
  spot: Pick<
    CampsiteSpot,
    "photoUrl" | "facebookUrl" | "sourceUrl" | "sourceLabel"
  >
) {
  if (!spot.photoUrl) {
    return undefined;
  }

  if (spot.facebookUrl) {
    return "Photo: saved on AFFT";
  }

  if (spot.photoUrl.startsWith("/images/")) {
    return "Photo: saved on AFFT";
  }

  if (spot.sourceUrl) {
    return `Photo: ${spot.sourceLabel}`;
  }

  return "Photo: public campsite listing";
}

export function getZhCampsitePhotoCredit(
  spot: Pick<
    CampsiteSpot,
    "photoUrl" | "facebookUrl" | "sourceUrl" | "sourceLabel"
  >
) {
  if (!spot.photoUrl) {
    return undefined;
  }

  if (spot.facebookUrl) {
    return "照片：已保存到 AFFT 网站";
  }

  if (spot.photoUrl.startsWith("/images/")) {
    return "照片：已保存到 AFFT 网站";
  }

  if (spot.sourceUrl) {
    return `照片：${spot.sourceLabel}`;
  }

  return "照片：公开营地列表";
}

export const makeCampsiteWhatsappLink = (spotName: string) =>
  makeWhatsappLink(
    `Hi AFFT, I want to ask whether ${spotName} is suitable for my camping trip.`
  );

export const makeZhCampsiteWhatsappLink = (spotName: string) =>
  makeWhatsappLink(`你好 AFFT，我想了解 ${spotName} 适不适合我的露营计划。`);
