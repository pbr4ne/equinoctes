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
  SteeringWheel,
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
    description: 'Golden Fields description',
    icon: SoilMoistureField as DefineComponent,
  },
  {
    id: 'sun-farming-2',
    name: 'Glasshouse',
    description: 'Glasshouse description',
    icon: OtherHousesOutlined as DefineComponent,
  },
  {
    id: 'sun-farming-3',
    name: 'Arboretum',
    description: 'Arboretum description',
    icon: Trees as DefineComponent,
  },
  {
    id: 'sun-farming-4',
    name: 'Solarium',
    description: 'Solarium description',
    icon: ChartSunburst as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // PRODUCTION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-production-1',
    name: 'Earthen Factory',
    description: 'Earthen Factory description',
    icon: BuildingFactory as DefineComponent,
  },
  {
    id: 'sun-production-2',
    name: 'Gasworks',
    description: 'Gasworks description',
    icon: CloudSatelliteServices as DefineComponent,
  },
  {
    id: 'sun-production-3',
    name: 'Infernal Forge',
    description: 'Infernal Forge description',
    icon: BonfireSharp as DefineComponent,
  },
  {
    id: 'sun-production-4',
    name: 'Solar Foundry',
    description: 'Solar Foundry description',
    icon: SolarPanel as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-religion-1',
    name: 'Glowing Shrine',
    description: 'Glowing Shrine description',
    icon: BrightnessHighOutlined as DefineComponent,
  },
  {
    id: 'sun-religion-2',
    name: 'Radiant Obelisk',
    description: 'Radiant Obelisk description',
    icon: Poll24Regular as DefineComponent,
  },
  {
    id: 'sun-religion-3',
    name: 'Sunspire Temple',
    description: 'Sunspire Temple description',
    icon: TempleHinduFilled as DefineComponent,
  },
  {
    id: 'sun-religion-4',
    name: 'Zenith Chancery',
    description: 'Zenith Chancery description',
    icon: StormOutlined as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-entertainment-1',
    name: 'Desert Zoo',
    description: 'Desert Zoo description',
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
    description: 'Hippodrome description',
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
    description: 'Children\'s Creche description',
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
    description: 'Luminary College description',
    icon: VolcanoOutlined as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-other-1',
    name: 'Forest Herbalist',
    description: 'Forest Herbalist description',
    icon: ForestOutlined as DefineComponent,
  },
  {
    id: 'sun-other-2',
    name: 'Sprawling Meadows',
    description: 'Sprawling Meadows description',
    icon: GrassOutlined as DefineComponent,
  },
  {
    id: 'sun-other-3',
    name: 'Atrium',
    description: 'Atrium description',
    icon: HexagonOutlined as DefineComponent,
  },
  {
    id: 'sun-other-4',
    name: 'Prismatic Array',
    description: 'Prismatic Array description',
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
    description: 'Moonlit Rookery description',
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
    description: 'Nocturnal Vineyard description',
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
    name: 'Obsidian Crypt',
    description: 'Obsidian Crypt description',
    icon: BuildingArch as DefineComponent,
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
    description: 'Lighthouse description',
    icon: BuildingLighthouse20Filled as DefineComponent,
  },
  {
    id: 'moon-other-2',
    name: 'Eclipse Sanctuary',
    description: 'Eclipse Sanctuary description',
    icon: ContourDraw as DefineComponent,
  },
  {
    id: 'moon-other-3',
    name: 'Sensory Chamber',
    description: 'Sensory Chamber description',
    icon: ChartMarimekko as DefineComponent,
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
    icon: MoonOutline as DefineComponent,
  },
  {
    id: 'moon-endgame-4',
    name: 'Aphelion',
    description: 'Aphelion description',
    icon: YinYang as DefineComponent,
  }
];
