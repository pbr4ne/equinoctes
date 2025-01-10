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

  const sunUnlocked = `O Lady, why did you leave me in darkness?

Nay, child - it was then that I watched over you, scattering myself across the darkness in twinkling pieces of my greatness.

Look now to the east, my children, and witness again my rise in conquering glory ‘gainst the cold and deceptive Night, and the Moon its guardian. Bask once more in my glory; turn thy face to me as does every painted flower.

For without me your crops shall wither, and you shall know only darkness.
`;

  const moonUnlocked = `Breathe deep the gathering dark
Sun’s harsh light has left its mark
Now in purple-black embrace
Silver shines - your Lord’s true face

Cold and clear, bright and keen
What in my pale light is seen?
What twinkles there, beyond My Eye?
In Sky you Lie, if Mine you Die
`;
  
  const sunPerihelionBuilt = `And the tides did still
And the SILVER LORD was as distant as the twinkling children
An Age of Bounty had begun
And the City of Cynthas did wither
`;
  
  const moonPerihelionBuilt = `Thy wan’dring gaze hath found at last
All truths of future, present, past
Beyond the stars, beyond the veil
Thy soul’s next journey hath set sail

Weep not for those still ‘neath the sun
Though certainly their time is done
& all shall wither on the vine
Eternal glory is now thine
`;
  
  const sunAphelionBuilt = `And so was built in Heliotropolis a great edifice with two faces, and under the light of the LADY did they chant her praises, and

By the light of my Eye
Under darkened Sky

We are One`;
  
  const moonAphelionBuilt = `By the light of my Eye
Under darkened Sky
In Cynthas City
A temple so pretty

And upon break of day under the light of the LADY did they chant her praises, and sing in raised voices:

We are One`;
  
  const neitherEndingText = `Heat death of the universe... great job. Next time try building more stuff?`;

  const computeMilestones = () => {
    const store = useStore();    

    const milestoneLevels = [
      { power: 10000, levelKey: 'level4', level: 4 },
      { power: 100000, levelKey: 'level5', level: 5 },
    ];

    const factionsToCheck: { factionKey: FactionKey; milestonesKey: FactionKey }[] = [
      { factionKey: 'sun', milestonesKey: 'sun' },
      { factionKey: 'moon', milestonesKey: 'moon' },
    ];

    factionsToCheck.forEach(({ factionKey, milestonesKey }) => {
      const faction = store.factions[factionKey];
      const otherFactionKey = factionKey === 'sun' ? 'moon' : 'sun';
      const otherFaction = store.factions[otherFactionKey];
      const milestones = store.milestones[factionKey];
      const otherMilestones = store.milestones[otherFactionKey];
      const achievements = store.factionAchievements[factionKey];
      const otherAchievements = store.factionAchievements[otherFactionKey];

      factionUnlocked(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      if (faction.power > 10000 && faction.power > otherFaction.power * 1.5 && !milestones.morePowerful) {
        milestones.morePowerful = true;
        store.factionAchievements[factionKey].morePowerful = true;

        if (factionKey === 'sun') {
          faction.lore.push({
            description: `You have seen the moon grow dimmer at night, and the long, hot summers and far-off smoke of the wildfires. The Lady is pleased, and the moon folks’ power wanes as she desires, but at what cost?
  `,
            time: store.calendar,
          });
        } else {
          faction.lore.push({
            description: `The harvests have been thin, but it matters not. There are truths that lie beyond life and this prison of flesh, your lord has shown you that. When the final secrets of the night are revealed…

  You close your eyes and dream of what lies beyond the sky. In the distance, you can hear the crashing of the surf. The tides are stronger than ever before…
  `,
            time: store.calendar,
          });
        }

        store.factions[factionKey].unseenAchievements = true;
        newLoreAndMilestone(factionKey);
      }

      //if 9 buildings in grid
      if (faction.grid.filter((cell) => cell).length >= 9 && !store.factionAchievements[factionKey].level3Buildings) {
        store.factionAchievements[factionKey].level3Buildings = true;
        store.factions[factionKey].unseenAchievements = true;
        newLoreAndMilestone(factionKey);
      }

      //if 16 buildings in grid
      if (faction.grid.filter((cell) => cell).length >= 16 && !store.factionAchievements[factionKey].level4Buildings) {
        store.factionAchievements[factionKey].level4Buildings = true;
        store.factions[factionKey].unseenAchievements = true;
        newMilestone(factionKey);
      }

      //if 25 buildings in grid
      if (faction.grid.filter((cell) => cell).length >= 25 && !store.factionAchievements[factionKey].level5Buildings) {
        store.factionAchievements[factionKey].level5Buildings = true;
        store.factions[factionKey].unseenAchievements = true;
        newMilestone(factionKey);
      }

      //if offtime building built
      if (faction.grid.some((cell) => cell === `${factionKey}-other-1`) && !milestones.offTimeBuilding) {
        if (factionKey === 'sun') {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        } else {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        }
        milestones.offTimeBuilding = true;
        newLoreAndMilestone(factionKey);
      }

      //if offtime progress built
      if (faction.grid.some((cell) => cell === `${factionKey}-other-3`) && !milestones.offTimeProgress) {
        if (factionKey === 'sun') {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        } else {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        }
        milestones.offTimeProgress = true;
        newLoreAndMilestone(factionKey);
      }

      //if first endgame building built
      if (faction.grid.some((cell) => cell === `${factionKey}-endgame-1`) && !milestones.endgame1) {
        if (factionKey === 'sun') {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        } else {
          faction.lore.push({
            description: `Under the LORD’s silver light, the floors of the archive suddenly glow with arcane energy and a message appears:

<i>You have grown so distant, my other half, and our people suffer. We must again be united, that bounty and truth may both belong to our children.</i>

Further instructions guide you to build a special reliquary…
`,
            time: store.calendar,
          });
        }
        milestones.endgame1 = true;
        newLoreAndMilestone(factionKey);
      }

      //if second endgame building built
      if (faction.grid.some((cell) => cell === `${factionKey}-endgame-2`) && !milestones.endgame2) {
        if (factionKey === 'sun') {
          faction.lore.push({
            description: `Can now build during off-time`,
            time: store.calendar,
          });
        } else {
          faction.lore.push({
            description: `Completing the LORD’s special reliquary, a relic appears within its hallowed halls unexpectedly: an orb which glows silver on one face and golden upon the other, representing two sides of the same deity.

Only one thing remains to reunite the people of Heliotropolis and Cynthas. Or, you could build the Perihelion and unlock the final mysteries of the moon. What effect that shall have on the Lady’s gardens, however, remains to be seen…
`,
            time: store.calendar,
          });
        }
        milestones.endgame2 = true;
        newLoreAndMilestone(factionKey);
      }

      perihelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      aphelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      bothAphelionBuilt(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);
      neitherEnding(faction, otherFaction, milestones, otherMilestones, achievements, otherAchievements, factionKey, otherFactionKey);

      milestoneLevels.forEach(({ power, levelKey, level }) => {
        if (faction.power > power && !factionMilestones[levelKey]) {
          factionMilestones[levelKey] = true;

          if (factionKey === 'sun' && level === 4) {
            faction.lore.push({
              description: `The shift is subtle at first. Summers that stretch on into autumn. Bountiful harvests. By your guidance, the Lady’s blessings and your careful shepherding has allowed Heliotropolis to thrive and grow strong.`,
              time: store.calendar,
            });  
          } else if (factionKey === 'sun' && level === 5) {
            faction.lore.push({
              description: `The people of the sun continue to thrive under your leadership. More and more folk of the hinterlands come to Heliotropolis, seeking the security of your plentiful foodstores and the Lady’s protection. The People of the Sun are ascendant.`,
              time: store.calendar,
            });  
          } else if (factionKey === 'moon' && level === 4) {
            faction.lore.push({
              description: `You gaze upon Cynthas City under the silver-kissed light of your lord. Though his messages are obtuse, the truth cannot be mistaken: he has looked upon you with favour. The People of the Moon will continue to uncover the world’s mysteries, with your guidance.`,
              time: store.calendar,
            });  
          } else if (factionKey === 'moon' && level === 5) {
            faction.lore.push({
              description: `The past few years have seen the secrets of the sky and stars unfold before you. Blessed by the wisdom of the eternally sky-gazing ancestors, you are at the Dusk of a New Age, led ever onward by the moon’s blessings.`,
              time: store.calendar,
            });  
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
  
      if (factionKey === 'sun') {
        achievements.wonEnding = true;
        otherAchievements.lostEnding = true;
      } else {
        achievements.lostEnding = true;
        otherAchievements.wonEnding = true;
      }
  
      createNotification(perihelionBuilt, factionKey, false, false);
    }
  }
  
  function aphelionBuilt(faction: Faction, otherFaction: Faction, milestone: Milestones, otherMilestone: Milestones, achievement: Achievements, otherAchievements: Achievements, factionKey: FactionKey, otherFactionKey: FactionKey) {
    if (hasEnded(milestone) || milestone.endgame4) {
      return;
    }
  
    if (hasBuilding(faction, factionKey, 'endgame-4')) {
      const aphelionBuilt = factionKey === 'sun'? sunAphelionBuilt : moonAphelionBuilt;
  
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
