import { BuildingMetadata } from '../utilities/types';

import {
} from '@vicons/ionicons4';

import { 
  BonfireSharp,
  TelescopeSharp,
  PlanetOutline,
  LogoElectron,
  MusicalNotesOutline,
  PrismOutline,
  SkullOutline,
  MoonOutline
} from '@vicons/ionicons5';

import { 
  ChartMarimekko,
  ChartSunburst,
  CloudSatelliteServices,
  ContourDraw,
  Fire,
  Moonrise,
  SoilMoistureField,
  SolarPanel,
  Sunny,
} from '@vicons/carbon';

import {
  Church,
  Crow,
  WineBottle,
  YinYang,
} from '@vicons/fa';

import {
  AvTimerOutlined,
  BedroomBabyOutlined,
  BrightnessHighOutlined,
  ForestOutlined,
  GrassOutlined,
  HexagonOutlined,
  OtherHousesOutlined,
  SchoolOutlined,
  StormOutlined,
  TempleHinduFilled,
  TheaterComedyOutlined,
  TimelapseOutlined,
  VolcanoOutlined,
} from '@vicons/material';

import {
  AnimalTurtle24Regular,
  BuildingLighthouse20Filled,
  BuildingBank24Filled,
  Autocorrect24Regular,
  Blur24Regular,
  CameraDome16Regular,
  DesignIdeas24Regular,
  Fingerprint24Regular,
  Iot24Regular,
  Lasso24Regular,
  Poll24Regular,
  Tent24Regular,
  Library24Regular,
  BuildingGovernment24Regular,
  BookClock24Regular,
} from '@vicons/fluent';

import {
  BuildingArch,
  BuildingFactory,
  ChartBubble,
  CurrencyEthereum,
  Moon2,
  SteeringWheel,
  Sun,
  Trees,
} from '@vicons/tabler';

import { DefineComponent } from 'vue';

export const sunBuildingMetadata: BuildingMetadata[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // FARMING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-farming-1',
    name: 'Golden Fields',
    description: `And Esu the Favoured had a Field of Gold, and in that field the stalks did grow to the height of the temple, with trunks as thick as cedars, and Esu bade the woodcutters chop them down, for such was the bounty of the RADIANT LADY.`,
    icon: SoilMoistureField as DefineComponent,
  },
  {
    id: 'sun-farming-2',
    name: 'Glasshouse',
    description: 'And the LADY said, build unto me a house of glass, that I may bless thy bounty within. And the harvest was good.',
    icon: OtherHousesOutlined as DefineComponent,
  },
  {
    id: 'sun-farming-3',
    name: 'Arboretum',
    description: 'And the LADY said unto Goah, plant for me two of every tree, that I may look upon them know that they are not alone. Also just in case one dies you have a spare.',
    icon: Trees as DefineComponent,
  },
  {
    id: 'sun-farming-4',
    name: 'Solarium',
    description: 'Within the palace was a great room of glass adjacent to the royal chambers, where the queen could pray to the LADY and tend to her garden. And when she prayed one day for a child, unto her it was delivered, for such was her faith in the LADY’s blessings.',
    icon: ChartSunburst as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // PRODUCTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-production-1',
    name: 'Earthen Factory',
    description: `In the days of the First Ones there was a great pit, wherefrom the soil would burst like water from a spring. And the children of the LADY would steal from this spring, for the First Ones would catch and eat them if they were caught.
`,
    icon: BuildingFactory as DefineComponent,
  },
  {
    id: 'sun-production-2',
    name: 'Gasworks',
    description: 'For just as thy leavings enrich the soil, so too are thy passings of air blessed by my divine wind.',
    icon: CloudSatelliteServices as DefineComponent,
  },
  {
    id: 'sun-production-3',
    name: 'Infernal Forge',
    description: 'For within this oven of clay is a fragment of my eternally burning heart. And the LADY bade Ilsu make a sign of clay which cautioned the people of Onkuril not to touch the oven with their bare hands, lest they immolate.',
    icon: BonfireSharp as DefineComponent,
  },
  {
    id: 'sun-production-4',
    name: 'Solar Foundry',
    description: 'Great lenses rimmed in gold were arrayed, and as the LADY crossed the sky the lenses did catch her radiance and set it upon the crucible',
    icon: SolarPanel as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-religion-1',
    name: 'Glowing Shrine',
    description: 'Glowing Shrine description',
    icon: Sun as DefineComponent,
  },
  {
    id: 'sun-religion-2',
    name: 'Radiant Obelisk',
    description: 'And Bulau remarked that it looked like a man’s nethers, and the obelisk flashed with the Lady’s light, and struck Bulau blind for a fortnight for such blasphemy.',
    icon: Poll24Regular as DefineComponent,
  },
  {
    id: 'sun-religion-3',
    name: 'Sunspire Temple',
    description: 'Build unto me a house with a great tower with a bell, that when I cross its path shall show upon the great yard the time of day, that thou shall know when the bells shall chime and summon my faithful to prayer.',
    icon: TempleHinduFilled as DefineComponent,
  },
  {
    id: 'sun-religion-4',
    name: 'Zenith Chancery',
    description: 'Thou shalt be my Chancellor upon this Earth, said the LADY, and keepeth for me the records of my coming and going, and mark my path across the sky, and through thee the people shall know the time to sow and the time to reap.',
    icon: StormOutlined as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-entertainment-1',
    name: 'Desert Zoo',
    description: '…and giraffes, and great sloths, and three-toed orangutans, and humpy-backed camels, and some chimpanzees, and…',
    icon: AnimalTurtle24Regular as DefineComponent,
  },
  {
    id: 'sun-entertainment-2',
    name: 'Sunlit Ampitheatre',
    description: 'Sunlit Ampitheatre description',
    icon: Blur24Regular as DefineComponent,
  },
  {
    id: 'sun-entertainment-3',
    name: 'Hippodrome',
    description: 'Shartan did clarify to Sula that hippopotamus simply meant fat horse, and that the drome was not meant for them but for chariots. And Sula was sad.',
    icon: Lasso24Regular as DefineComponent,
  },
  {
    id: 'sun-entertainment-4',
    name: 'Circus of Lights',
    description: 'Circus of Lights description',
    icon: Tent24Regular as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-education-1',
    name: 'Sundial',
    description: 'Sundial description',
    icon: AvTimerOutlined as DefineComponent,
  },
  {
    id: 'sun-education-2',
    name: 'Children\'s Creche',
    description: 'Proper care and education for thy children remains a cornerstone of thy covenant.',
    icon: BedroomBabyOutlined as DefineComponent,
  },
  {
    id: 'sun-education-3',
    name: 'School of Industry',
    description: 'School of Industry description',
    icon: Iot24Regular as DefineComponent,
  },
  {
    id: 'sun-education-4',
    name: 'Luminary College',
    description: 'And the pages shall also yellow as though kissed by my golden radiance, for they shall reflect my wisdom and my truth, and the people shall not squint at dusty tomes by candlelight but shall chant hymns while basking in my glow',
    icon: VolcanoOutlined as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-other-1',
    name: 'Forest Herbalist',
    description: '…and heather, and dillweed, and rosepetals, and bark of the sunwood, and make a fine paste and feed it to him at sunset, and by morn he shall rise again as strong as the day he defeated Salomund the Sallow…',
    icon: ForestOutlined as DefineComponent,
  },
  {
    id: 'sun-other-2',
    name: 'Sprawling Meadows',
    description: 'It is every faithful’s final duty to lie down in the meadow and become one with all the flowers, awaiting the Pyremaster.',
    icon: GrassOutlined as DefineComponent,
  },
  {
    id: 'sun-other-3',
    name: 'Atrium',
    description: 'And Bolu said that such a thing as a roof of glass could not be done, and the LADY was displeased.',
    icon: HexagonOutlined as DefineComponent,
  },
  {
    id: 'sun-other-4',
    name: 'Prismatic Array',
    description: 'For what is the LORD but a reflection of my brilliance? His sallow light existeth not without my radiance, but this he would not tell thee, for it is a debt of power never repaid.',
    icon: PrismOutline as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-endgame-1',
    name: 'Everburning Flame',
    description: 'Everburning Flame description',
    icon: Fire as DefineComponent,
  },
  {
    id: 'sun-endgame-2',
    name: 'Chariot of the Sun',
    description: 'Chariot of the Sun description',
    icon: SteeringWheel as DefineComponent,
  },
  {
    id: 'sun-endgame-3',
    name: 'Perihelion',
    description: 'Perihelion description',
    icon: Sunny as DefineComponent,
  },
  {
    id: 'sun-endgame-4',
    name: 'Aphelion',
    description: 'Aphelion description',
    icon: YinYang as DefineComponent,
  }
];

export const moonBuildingMetadata: BuildingMetadata[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // SUSTENANCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-sustenance-1',
    name: 'Moonlit Rookery',
    description: `Crows like shinies
Wonder why
Look up in that evening sky
`,
    icon: Crow as DefineComponent,
  },
  {
    id: 'moon-sustenance-2',
    name: 'Tide Pools',
    description: 'Tide Pools description',
    icon: ChartBubble as DefineComponent,
  },
  {
    id: 'moon-sustenance-3',
    name: 'Lunar Grotto',
    description: 'Lunar Grotto description',
    icon: TimelapseOutlined as DefineComponent,
  },
  {
    id: 'moon-sustenance-4',
    name: 'Nocturnal Vineyard',
    description: `Sip
Sup
Sundown
`,
    icon: WineBottle as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // SCIENCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-science-1',
    name: 'Gazing Scope',
    description: 'Gazing Scope description',
    icon: CameraDome16Regular as DefineComponent,
  },
  {
    id: 'moon-science-2',
    name: 'Observatory',
    description: 'Observatory description',
    icon: Moonrise as DefineComponent,
  },
  {
    id: 'moon-science-3',
    name: 'Planetarium',
    description: 'Planetarium description',
    icon: PlanetOutline as DefineComponent,
  },
  {
    id: 'moon-science-4',
    name: 'Astrolabe',
    description: 'Astrolabe description',
    icon: TelescopeSharp as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-religion-1',
    name: 'Obsidian Shrine',
    description: 'Obsidian Shrine description',
    icon: MoonOutline as DefineComponent,
  },
  {
    id: 'moon-religion-2',
    name: 'Necropolis',
    description: 'Necropolis description',
    icon: SkullOutline as DefineComponent,
  },
  {
    id: 'moon-religion-3',
    name: 'Athenaeum',
    description: 'Athenaeum description',
    icon: Library24Regular as DefineComponent,
  },
  {
    id: 'moon-religion-4',
    name: 'Celestial Cathedral',
    description: 'Celestial Cathedral description',
    icon: Church as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-entertainment-1',
    name: 'Oneirium',
    description: 'Oneirium description',
    icon: Autocorrect24Regular as DefineComponent,
  },
  {
    id: 'moon-entertainment-2',
    name: 'Hedge Maze',
    description: 'Hedge Maze description',
    icon: Fingerprint24Regular as DefineComponent,
  },
  {
    id: 'moon-entertainment-3',
    name: 'Shadow Theatre',
    description: 'Shadow Theatre description',
    icon: TheaterComedyOutlined as DefineComponent,
  },
  {
    id: 'moon-entertainment-4',
    name: 'Midnight Symphony',
    description: 'Midnight Symphony description',
    icon: MusicalNotesOutline as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-education-1',
    name: 'Night School',
    description: 'Night School description',
    icon: SchoolOutlined as DefineComponent,
  },
  {
    id: 'moon-education-2',
    name: 'Twilight Symposium',
    description: 'Twilight Symposium description',
    icon: DesignIdeas24Regular as DefineComponent,
  },
  {
    id: 'moon-education-3',
    name: 'University of Cynthas',
    description: 'University of Cynthas description',
    icon: BuildingGovernment24Regular as DefineComponent,
  },
  {
    id: 'moon-education-4',
    name: 'Quantum Academy',
    description: 'Quantum Academy description',
    icon: LogoElectron as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-other-1',
    name: 'Lighthouse',
    description: `Like my blinking eye
darkcrescenthalfgibbousMOON
Shine on
Ye shoals and shores
And
	Not
		To
			D
				O
					O
						M`,
    icon: BuildingLighthouse20Filled as DefineComponent,
  },
  {
    id: 'moon-other-2',
    name: 'Sensory Chamber',
    description: 'Sensory Chamber description',
    icon: ChartMarimekko as DefineComponent,
  },
  {
    id: 'moon-other-3',
    name: 'Eclipse Sanctuary',
    description: `And lo as my shadow crept
‘cross my restful lover’s face
She awoke in a blazon of light
Drenching me like a cloak of purest fire, and I was awash in her greatness
And the world was twilit and still, gazing upward at that rarest lovers’ embrace
`,
    icon: ContourDraw as DefineComponent,
  },
  {
    id: 'moon-other-4',
    name: 'Museum of Night',
    description: 'Museum of Night description',
    icon: BuildingBank24Filled as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-endgame-1',
    name: 'Auroral Archives',
    description: 'Auroral Archives description',
    icon: BookClock24Regular as DefineComponent,
  },
  {
    id: 'moon-endgame-2',
    name: 'Reliquary of the Moon',
    description: 'Reliquary of the Moon description',
    icon: CurrencyEthereum as DefineComponent,
  },
  {
    id: 'moon-endgame-3',
    name: 'Perihelion',
    description: 'Perihelion description',
    icon: Moon2 as DefineComponent,
  },
  {
    id: 'moon-endgame-4',
    name: 'Aphelion',
    description: 'Aphelion description',
    icon: YinYang as DefineComponent,
  }
];
