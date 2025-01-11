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
    description: `Zephyra stacked the rocks until they were the height of an oxcart, and knelt down to pray. And as she finished her prayer she heard a sound like the flames of a hearth, and she looked up and behold! The shrine of rocks was glowing as though it had been kissed by the LADY herself. And the glow did not subside as the years passed.`,
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
    description: 'Thou shalt reflect the splendor of my aphorisms as your form is a reflection of mine own, and raise your voices in psalm.',
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
    description: 'And OUR LADY said build unto me a garden of earthly delights that shineth brighter than the stars in night, rest and make merry there, and turn your heads not to darkened sky.',
    icon: Tent24Regular as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-education-1',
    name: 'Sundial',
    description: 'Mark the passage of my chariot ‘cross the sky, and live your days thereby. Put your trust in me, it will make sense when it is built.',
    icon: AvTimerOutlined as DefineComponent,
  },
  {
    id: 'sun-education-2',
    name: 'Children\'s Creche',
    description: 'Proper care and education for thy children remains a cornerstone of thy covenant, for they are unto you as you are unto me.',
    icon: BedroomBabyOutlined as DefineComponent,
  },
  {
    id: 'sun-education-3',
    name: 'School of Industry',
    description: 'I gave you light so that you might see, and hands that you might work, and thereby raise up great monuments to my glory. Rebuke not those that seek a school of trades.',
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
    name: 'Atrium',
    description: 'And Bolu said that such a thing as a roof of glass could not be done, and the LADY was displeased.',
    icon: HexagonOutlined as DefineComponent,
  },
  {
    id: 'sun-other-2',
    name: 'Forest Herbalist',
    description: '…and heather, and dillweed, and rosepetals, and bark of the sunwood, and make a fine paste and feed it to him at sunset, and by morn he shall rise again as strong as the day he defeated Salomund the Sallow…',
    icon: ForestOutlined as DefineComponent,
  },
  {
    id: 'sun-other-3',
    name: 'Prismatic Array',
    description: 'For what is the LORD but a reflection of my brilliance? His sallow light existeth not without my radiance, but this he would not tell thee, for it is a debt of power never repaid.',
    icon: PrismOutline as DefineComponent,
  },
  {
    id: 'sun-other-4',
    name: 'Sprawling Meadows',
    description: 'It is every faithful’s final duty to lie down in the meadow and become one with all the flowers, awaiting the Pyremaster.',
    icon: GrassOutlined as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sun-endgame-1',
    name: 'Everburning Flame',
    description: `Our LADY bid us build her a mighty brazier, that we may gaze upon the warmth of her heart and behold her form always. And mind the spelling on this one, lest we be struck down for impertinence.`,
    icon: Fire as DefineComponent,
  },
  {
    id: 'sun-endgame-2',
    name: 'Chariot of the Sun',
    description: `And the LADY said build this chariot midsize with room for passengers thereby. Driven by a countless multitude of steeds, and make it a standard that my banner be seen by all who gaze ‘pon it.`,
    icon: SteeringWheel as DefineComponent,
  },
  {
    id: 'sun-endgame-3',
    name: 'Perihelion',
    description: `We are the chosen of our LADY, the sun shall never set upon our empire and we shall never be parted from her embrace.
    <br /><br /><b>This will end the game for the LORD.</b><br />`,
    icon: Sunny as DefineComponent,
  },
  {
    id: 'sun-endgame-4',
    name: 'Aphelion',
    description: `Higher and higher the tower grew until it was so great that you might believe it could bridge the gap between two worlds, Sun and Sky, Gods and Mortals, LADY and LORD.
    <br /><br /><b>This will end the game if both LORD and LADY build it.</b><br />`,
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
    description: `Crows like shinies<br />
Wonder why<br />
Look up in that evening sky
`,
    icon: Crow as DefineComponent,
  },
  {
    id: 'moon-sustenance-2',
    name: 'Tide Pools',
    description: 'Splish splash',
    icon: ChartBubble as DefineComponent,
  },
  {
    id: 'moon-sustenance-3',
    name: 'Lunar Grotto',
    description: `Within this cave<br />
The Silver LORD<br />
Smiles down upon<br />
You, his Adored
`,
    icon: TimelapseOutlined as DefineComponent,
  },
  {
    id: 'moon-sustenance-4',
    name: 'Nocturnal Vineyard',
    description: `Sip<br />
Sup<br />
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
    description: `Blessed be thy lens<br />
That thou mayst gaze upon my cragged face
`,
    icon: CameraDome16Regular as DefineComponent,
  },
  {
    id: 'moon-science-2',
    name: 'Observatory',
    description: `O build me an observat’ry<br />
To witness all there is to see<br />
My silv’ry face, my twinkling babes<br />
The planets and their errant ways
`,
    icon: Moonrise as DefineComponent,
  },
  {
    id: 'moon-science-3',
    name: 'Planetarium',
    description: `Planetarium is hard to rhyme<br />
I’ll try again some other time
`,
    icon: PlanetOutline as DefineComponent,
  },
  {
    id: 'moon-science-4',
    name: 'Astrolabe',
    description: `Astrolabe affix my place<br />
Between the sea and empty space<br />
Row them oars and trim them sails<br />
Protect us LORD from sudden gales
`,
    icon: TelescopeSharp as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // RELIGION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-religion-1',
    name: 'Obsidian Shrine',
    description: `Seek ye the land where the earth doth spit<br />
Ye rock of blackest night, find it and split<br />
Taketh ye the pieces and buildeth yon shrine<br />
Under the LORD’s light, pray, and altar will shine
`,
    icon: MoonOutline as DefineComponent,
  },
  {
    id: 'moon-religion-2',
    name: 'Necropolis',
    description: `The dead sleep<br />
The willows weep
`,
    icon: SkullOutline as DefineComponent,
  },
  {
    id: 'moon-religion-3',
    name: 'Athenaeum',
    description: `Betwixt the dusty tomes<br />
Arcane knowledge finds a home <br />
Shhhhhh
`,
    icon: Library24Regular as DefineComponent,
  },
  {
    id: 'moon-religion-4',
    name: 'Celestial Cathedral',
    description: `Open your eyes to the stars<br />
Open your heart to the LORD
`,
    icon: Church as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENTERTAINMENT
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-entertainment-1',
    name: 'Oneirium',
    description: `Sleep well, sleep well<br />
Dream deep
`,
    icon: Autocorrect24Regular as DefineComponent,
  },
  {
    id: 'moon-entertainment-2',
    name: 'Hedge Maze',
    description: `Not all who wander are lost<br />
But I might be
`,
    icon: Fingerprint24Regular as DefineComponent,
  },
  {
    id: 'moon-entertainment-3',
    name: 'Shadow Theatre',
    description: `A pantomime<br />
A frozen time<br />
Laugh, cry, clap for more<br />
Encore! Encore!
`,
    icon: TheaterComedyOutlined as DefineComponent,
  },
  {
    id: 'moon-entertainment-4',
    name: 'Midnight Symphony',
    description: `Under the cover darkness brings<br />
We gather to hear instruments sing
`,
    icon: MusicalNotesOutline as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-education-1',
    name: 'Night School',
    description: `The greatest of whispered secrets,<br />
Fill the whole of night’s dreaming,<br />
Learn all you can with no regrets,<br />
And race the dawn with sun beaming.
`,
    icon: SchoolOutlined as DefineComponent,
  },
  {
    id: 'moon-education-2',
    name: 'Twilight Symposium',
    description: `Would that Opportunity, which grows best in the soil of discretion, were as clear to view as it is obscure!`,
    icon: DesignIdeas24Regular as DefineComponent,
  },
  {
    id: 'moon-education-3',
    name: 'University of Cynthas',
    description: `Learned folk gather in our fair state, since learning never comes too late, <br />
And time too swiftly flies.<br />
Thought would destroy their paradise. No more; while ignorance is bliss,<br />
Never folly to be wise.
`,
    icon: BuildingGovernment24Regular as DefineComponent,
  },
  {
    id: 'moon-education-4',
    name: 'Quantum Academy',
    description: `Scorching land<br />
Learn, understand<br />
I light a path<br />
Within suns’ wrath
`,
    icon: LogoElectron as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // OTHER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-other-1',
    name: 'Lighthouse',
    description: `Like my blinking eye<br>
darkcrescenthalfgibbousMOON<br>
Shine on<br>
Ye shoals and shores<br>
And
	not
		to
			D
				O
					O
						M`,
    icon: BuildingLighthouse20Filled as DefineComponent,
  },
  {
    id: 'moon-other-2',
    name: 'Sensory Chamber',
    description: `Moon shines off waters as chambers fill,<br />
And descend to darkness, darker still.
`,
    icon: ChartMarimekko as DefineComponent,
  },
  {
    id: 'moon-other-3',
    name: 'Eclipse Sanctuary',
    description: `And lo as my shadow crept ‘cross my restful lover’s face<br />
She awoke in a blazon of light<br />
Drenching me like a cloak of purest fire, and I was awash in her greatness<br />
And the world was twilit and still, gazing upward at that rarest lovers’ embrace
`,
    icon: ContourDraw as DefineComponent,
  },
  {
    id: 'moon-other-4',
    name: 'Museum of Night',
    description: `From the mystery<br />
Our history<br />
From the Night<br />
Our light
`,
    icon: BuildingBank24Filled as DefineComponent,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // ENDGAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moon-endgame-1',
    name: 'Auroral Archives',
    description: `But when, from dewy shade emerging bright,<br />
Aurora streaks the sky with orient light<br />
Mirrored then in the LADY’s eye, <br />
Triumphal arch, that fill’st the sky
`,
    icon: BookClock24Regular as DefineComponent,
  },
  {
    id: 'moon-endgame-2',
    name: 'Reliquary of the Moon',
    description: `'This morn is merry soon, I trow, the moon is waxing fain;<br />
But sun shall rise ‘pon lands brow, ere we two meet again.'  <br />
—He turn'd his charger as he spake upon the silver shore,  <br />
He gave the bridle-reins a shake, said 'Adieu nevermore,  <br />
       My Love!  And adieu nevermore.'
`,
    icon: CurrencyEthereum as DefineComponent,
  },
  {
    id: 'moon-endgame-3',
    name: 'Perihelion',
    description: `The stars are not wanted now; put out every one,<br />
Pack up at noon and dismantle the sun,<br />
Pour away the ocean and sweep up the wood;<br />
For nothing can ever be as it should.

<br /><br /><b>This will end the game for the LADY.</b><br />
`,
    icon: Moon2 as DefineComponent,
  },
  {
    id: 'moon-endgame-4',
    name: 'Aphelion',
    description: `In dark of night,<br />
We race the morning light,<br />
To build a bridge across sky,<br />
And walk together thereby.

<br /><br /><b>This will end the game if both LORD and LADY build it.</b><br />
`,
    icon: YinYang as DefineComponent,
  }
];
