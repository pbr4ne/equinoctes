import { useStore } from './useStore';
import { Achievements, Faction, FactionKey, Milestones } from '../utilities/types';
import useNotifs from './useNotifs';

export function useMilestones() { 

  const store = useStore();
  const { createMessage, createNotification } = useNotifs();
  
  const sendMessage = (message: string, factionKey: FactionKey) => {
    createMessage(message, factionKey);
  }
  
  const newLoreAndMilestone = (factionKey: FactionKey) => {
    factionKey === 'sun' ? sendMessage('New Revelation and Milestone', factionKey) : sendMessage('New Mysterium and Milestone', factionKey);
  }
  
  const newLore = (factionKey: FactionKey) => {
    factionKey === 'sun' ? sendMessage('New Revelation', factionKey) : sendMessage('New Mysterium', factionKey);
  }
  
  const newMilestone = (factionKey: FactionKey) => {
    factionKey === 'sun' ? sendMessage('New Milestone', factionKey) : sendMessage('New Milestone', factionKey);
  }

  const sunUnlocked = `O LADY, why did you leave me in darkness?

Nay, child - it was then that I watched over you, scattering myself across the darkness in twinkling pieces of my greatness.

Look now to the east, my children, and witness again my rise in conquering glory ‘gainst the cold and deceptive Night, and the Moon its guardian. Bask once more in my glory; turn thy face to me as does every painted flower.

For without me your crops shall wither, and you shall know only darkness.
`;

  const moonUnlocked = `Gather 'round, children, and gaze upon the shepherd of night:

Breathe deep the gathering dark
Sun’s harsh light has left its mark
Now in purple-black embrace
Silver shines - your LORD’s true face

Cold and clear, bright and keen
What in my pale light is seen?
What twinkles there, beyond My Eye?
In Sky you Lie, if Mine you Die
`;

  const sunPowerful = `You have seen the moon grow dimmer at night, and the long, hot summers and far-off smoke of the wildfires. The LADY is pleased, and the moon folks’ power wanes as she desires, but at what cost?`;

  const moonPowerful = `The harvests have been thin, but it matters not. There are truths that lie beyond life and this prison of flesh, your LORD has shown you that. When the final secrets of the night are revealed…

You close your eyes and dream of what lies beyond the sky. In the distance, you can hear the crashing of the surf. The tides are stronger than ever before…
`;

  const sunLevel4 = `The shift is subtle at first. Summers that stretch on into autumn. Bountiful harvests. By your guidance, the LADY’s blessings and your careful shepherding has allowed Heliotropolis to thrive and grow strong.`;
  const moonLevel4 = `You gaze upon Cynthas City under the silver-kissed light of your LORD. Though his messages are obtuse, the truth cannot be mistaken: he has looked upon you with favour. The People of the Moon will continue to uncover the world’s mysteries, with your guidance.`;
  const sunLevel5 = `The people of the sun continue to thrive under your leadership. More and more folk of the hinterlands come to Heliotropolis, seeking the security of your plentiful foodstores and the LADY’s protection. The People of the Sun are ascendant.`;
  const moonLevel5 = `The past few years have seen the secrets of the sky and stars unfold before you. Blessed by the wisdom of the eternally sky-gazing ancestors, you are at the Dusk of a New Age, led ever onward by the moon’s blessings.`;
  
  const sunOffTimeBuilding = `And thus Bolu had to concede the wisdom of our LADY, as well as her superior grasp of engineering principles. The lesson was learned well, and Bolu learned never to speak over others. And in the college halls there was much rejoicing at this lesson. And Bolu would bear the mark of both her favor and disfavor the rest of his days.
  
  You may now build during the night.`;
  const moonOffTimeBuilding = `As Tranash bathed in pure silvery light, he imagined himself floating as if on an ocean of it. For some reason he brought to mind a limerick his father used to assure him with whenever he went trawling for fish.

Whilst you delve beneath the sea,
Your guiding light, some miles away,
My Lighthouse lifts its massive masonry,
Silvered fire by night, dark clouds by day. 

And his LORD of quiet and subtle light saw it was good, and that his works would be unceasing even under the baleful glare of the sun.

You may now build during the day.
`;

  const sunOffTimeProgress = `Fear the night no longer my children. My warmth and light will abide with you long after my chariot of fire has left the sky. When you look upon the face of that sallow and sickly LORD, know you still work within my light.
  
  You now collect Aurum during the night.`;
  const moonOffTimeProgress = `It was the work of many hands that brought shade and succor everlasting to the people of Cynthas.

Even though my sun each morn did shine,
With all triumphant splendour on her brow;
But out, alack, she was but one hour mine,
Our tangled pass hath mask’d you from her now.
Yet her for this my love no whit disdaineth;
Suns of the world may stain when heaven’s sun staineth.

Were not the deepest shadows cast by the brightest light? So too Cynthas knew that their LORD’s strength was such that no day was free of him.

You now collect Nocturne during the day.
`;

  const sunFirstEndgameBuilt = `As the pages yellow after years of chanting the hymns within under the LADY’s light, a secret message appears between the lines of text, bidding you to build a great brazier, which the LADY shall kiss with her light to bestow a flame that never dies.

Upon building the brazier, the LADY is true to her word. No oil or fuel is needed; it simply burns as though it came from the sun herself.

Gazing at the very same page under the light of the everburning flame, a new message appears in a silvery script:

We are one and the same, my LADY

You await the next message from your gods…
`;

  const moonFirstEndgameBuilt = `Under the LORD’s silver light, the floors of the archive suddenly glow with arcane energy and a message appears:

<i>You have grown so distant, my other half, and our people suffer. We must again be united, that bounty and truth may both belong to our children.</i>

Further instructions guide you to build a special reliquary…
`;

  const sunSecondEndgameBuilt = `The next message speaks of a golden chariot, a symbol of the LADY’s journey across the sky each day. The forges burn for weeks on end to smelt the metals, and finally it is ready. At first you believe it to be solely a symbol of the LADY’s grace, but under the light of the moon, the chariot transforms to silver!

Indeed, it is a symbol not just of the LADY’s passage across the sky, but of the LORD’s as well.

The next day, a message from Cynthas City.

LADY
AHHH
ALSO IS THE SILVER ONE
AHHH
CHAMPION OF BOTH ORBS

You must cooperate with the moonlit city to build a place of worship for both faces of the One Orb…or you could allow the bounty of the LADY to eclipse the SILVER LORD forever…
`;

  const moonSecondEndgameBuilt = `Completing the LORD’s special reliquary, a relic appears within its hallowed halls unexpectedly: an orb which glows silver on one face and golden upon the other, representing two sides of the same deity.

Only one thing remains to reunite the people of Heliotropolis and Cynthas. Or, you could build the Perihelion and unlock the final mysteries of the moon. What effect that shall have on the LADY’s gardens, however, remains to be seen…
`

  const sunPerihelionBuilt = `And the tides did still<br />
And the SILVER LORD was as distant as the twinkling children<br />
An Age of Bounty had begun<br />
And the City of Cynthas did wither
`;
  
  const moonPerihelionBuilt = `Thy wan’dring gaze hath found at last<br />
All truths of future, present, past<br />
Beyond the stars, beyond the veil<br />
Thy soul’s next journey hath set sail<br />
<br />
Weep not for those still ‘neath the sun<br />
Though certainly their time is done<br />
& all shall wither on the vine<br />
Eternal glory is now thine<br />
`;
  
  const sunAphelionBuilt = `And so was built in Heliotropolis a great edifice with two faces, and under the light of the LADY did they chant her praises, and<br />
<br />
By the light of my Eye<br />
Under darkened Sky<br />
<br />
We are One`;
  
  const moonAphelionBuilt = `By the light of my Eye<br />
Under darkened Sky<br />
In Cynthas City<br />
A temple so pretty<br />
<br />
And upon break of day under the light of the LADY did they chant her praises, and sing in raised voices:<br />
<br />
We are One`;
  
  const neitherEndingText = `Heat death of the universe... great job. Next time try building more stuff?`;

  const computeMilestones = () => {
    const store = useStore();    

    const milestoneLevels = [
      { power: 10000, levelKey: 'level4', level: 4 },
      { power: 100000, levelKey: 'level5', level: 5 },
    ];

    const factionsToCheck: { factionKey: FactionKey }[] = [
      { factionKey: 'sun' },
      { factionKey: 'moon' },
    ];

    factionsToCheck.forEach(({ factionKey }) => {
      const faction = store.factions[factionKey];
      const otherFactionKey = factionKey === 'sun' ? 'moon' : 'sun';
      const otherFaction = store.factions[otherFactionKey];
      const milestones = store.milestones[factionKey];
      const otherMilestones = store.milestones[otherFactionKey];
      const achievements = store.factionAchievements[factionKey];
      const otherAchievements = store.factionAchievements[otherFactionKey];

      factionUnlocked(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      tooPowerful(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      nineBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      sixteenBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      twentyFiveBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      offtimeBuilding(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      offtimeProgress(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      firstEndgameBuildingBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      secondEndgameBuildingBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      perihelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      aphelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      bothAphelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      neitherEnding(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      milestoneLevels.forEach(({ power, levelKey, level }) => {
        if (faction.power > power && !milestones[levelKey]) {
          milestones[levelKey] = true;

          if (factionKey === 'sun' && level === 4) {
            addLore(faction, sunLevel4); 
          } else if (factionKey === 'sun' && level === 5) {
            addLore(faction, sunLevel5); 
          } else if (factionKey === 'moon' && level === 4) {
            addLore(faction, moonLevel4);
          } else if (factionKey === 'moon' && level === 5) {
            addLore(faction, moonLevel5); 
          }
          
          //size up the grid:
          
          //add a new null cell to the end of each row
          for (let row = faction.level; row > 0; row--) {
            const index = row * faction.level;
            faction.grid.splice(index, 0, null);
          }
        
          //add a blank new row
          for (let i = 0; i < level; i++) {
            faction.grid.push(null);
          }

          faction.level = level;
          newLoreAndMilestone(factionKey);
        }
      });
    });
  }

  function factionUnlocked(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (faction.power > 0 && !milestone.unlocked) {
      milestone.unlocked = true;
      if (factionKey === 'sun') {
        addLore(faction, sunUnlocked);
      } else {
        addLore(faction, moonUnlocked);
      }

      if (achievements.met) {
        newLore(factionKey);
      } else {
        newLoreAndMilestone(factionKey);
        achievements.met = true;
        faction.unseenAchievements = true;
      }      
    }
  }

  function tooPowerful(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (faction.power > 10000 && faction.power > otherFaction.power * 2 && !milestone.morePowerful) {
      
      milestone.morePowerful = true;

      if (factionKey === 'sun') {
        addLore(faction, sunPowerful);
      } else {
        addLore(faction, moonPowerful);
      }

      
      store.factionAchievements[factionKey].morePowerful = true;
      store.factions[factionKey].unseenAchievements = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function nineBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (faction.grid.filter((building) => building).length >= 9 && !achievements.level3Buildings) {
      achievements.level3Buildings = true;
      faction.unseenAchievements = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function sixteenBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (faction.grid.filter((building) => building).length >= 16 && !achievements.level4Buildings) {
      achievements.level4Buildings = true;
      faction.unseenAchievements = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function twentyFiveBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (faction.grid.filter((building) => building).length >= 25 && !achievements.level5Buildings) {
      achievements.level5Buildings = true;
      faction.unseenAchievements = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function offtimeBuilding(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasBuilding(faction, factionKey, 'other-1') && !milestone.offTimeBuilding) {
      if (factionKey === 'sun') {
        addLore(faction, sunOffTimeBuilding);
      } else {
        addLore(faction, moonOffTimeBuilding);
      }
      milestone.offTimeBuilding = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function offtimeProgress(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasBuilding(faction, factionKey, 'other-3') && !milestone.offTimeProgress) {
      if (factionKey === 'sun') {
        addLore(faction, sunOffTimeProgress);
      } else {
        addLore(faction, moonOffTimeProgress);
      }
      milestone.offTimeProgress = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function firstEndgameBuildingBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasBuilding(faction, factionKey, 'endgame-1') && !milestone.endgame1) {
      if (factionKey === 'sun') {
        addLore(faction, sunFirstEndgameBuilt);
      } else {
        addLore(faction, moonFirstEndgameBuilt);
      }
      milestone.endgame1 = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function secondEndgameBuildingBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasBuilding(faction, factionKey, 'endgame-2') && !milestone.endgame2) {
      if (factionKey === 'sun') {
        addLore(faction, sunSecondEndgameBuilt);
      } else {
        addLore(faction, moonSecondEndgameBuilt);
      }
      milestone.endgame2 = true;
      newLoreAndMilestone(factionKey);
    }
  }

  function perihelionBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasEnded(milestone)) {
      return;
    }
  
    if (hasBuilding(faction, factionKey, 'endgame-3')) {
      const perihelionBuilt = factionKey === 'sun'? sunPerihelionBuilt : moonPerihelionBuilt;
  
      addLore(faction, perihelionBuilt);
      addLore(otherFaction, perihelionBuilt);
  
      milestone.wonEnding = true;
      otherMilestone.lostEnding = true;

      achievements.wonEnding = true;
      otherAchievements.lostEnding = true;
      
      faction.unseenAchievements = true;
      otherFaction.unseenAchievements = true;
  
      createNotification(perihelionBuilt, factionKey, false, false);
    }
  }
  
  function aphelionBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievement: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasEnded(milestone) || milestone.endgame4) {
      return;
    }
  
    if (hasBuilding(faction, factionKey, 'endgame-4')) {
      const aphelionBuilt = factionKey === 'sun'? sunAphelionBuilt : moonAphelionBuilt;
  
      milestone.endgame4 = true;
      addLore(faction, aphelionBuilt);
    }
  }
  
  function bothAphelionBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasEnded(milestone)) {
      return;
    }
  
    if (hasBuilding(faction, factionKey, 'endgame-4') && hasBuilding(otherFaction, otherFactionKey, 'endgame-4')) {
      const aphelionBuilt = factionKey === 'sun'? sunAphelionBuilt : moonAphelionBuilt;
  
      addLore(faction, aphelionBuilt);
  
      milestone.endgame4 = true;
      
      milestone.cooperativeEnding = true;
      otherMilestone.cooperativeEnding = true;
  
      achievements.cooperativeEnding = true;
      otherAchievements.cooperativeEnding = true;
  
      faction.unseenAchievements = true;
      otherFaction.unseenAchievements = true;
  
      createNotification(aphelionBuilt, factionKey, true, false);
    }
  }
  
  function neitherEnding(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievements: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasEnded(milestone)) {
      return;
    }
  
    if (store.calendar.days > 1000) {
      addLore(faction, neitherEndingText);
      addLore(otherFaction, neitherEndingText);
  
      milestone.neitherEnding = true;
      otherMilestone.neitherEnding = true;
  
      achievements.neitherEnding = true;
      otherAchievements.neitherEnding = true;
  
      faction.unseenAchievements = true;
      otherFaction.unseenAchievements = true;
  
      createNotification(neitherEndingText, factionKey, false, true);
    }
  }
  
  function hasBuilding(faction: Faction, factionKey: FactionKey, buildingSuffix: string) {
    return faction.grid.some((building) => building === `${factionKey}-${buildingSuffix}`);
  }
  
  function hasEnded(milestone: Milestones) {
    return milestone.cooperativeEnding || milestone.lostEnding || milestone.wonEnding || milestone.neitherEnding;
  }
  
  function addLore(faction: Faction, description: string) {
    faction.lore.push({
      description: description,
      time: store.calendar,
    });
  }  

  return { computeMilestones };
}
