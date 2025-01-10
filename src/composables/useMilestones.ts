import { useStore } from './useStore';
import { FactionKey } from '../utilities/types';

function sendMessage(message: string) {
  window.$message.info(message);
}

function newLore(factionKey: FactionKey) {
  factionKey === 'sun' ? sendMessage('New Revelation') : sendMessage('New Mysterium');
}

function newMilestone() {
  sendMessage('New Milestone');
}

function newLoreAndMilestone(factionKey: FactionKey) {
  factionKey === 'sun' ? sendMessage('New Revelation and Milestone') : sendMessage('New Mysterium and Milestone');
}

export function computeMilestones() {
  const store = useStore();
  const { factions, milestones } = store;

  const milestoneLevels = [
    { power: 10000, levelKey: 'level4', level: 4 },
    { power: 100000, levelKey: 'level5', level: 5 },
  ];

  const factionsToCheck: { factionKey: FactionKey; milestonesKey: FactionKey }[] = [
    { factionKey: 'sun', milestonesKey: 'sun' },
    { factionKey: 'moon', milestonesKey: 'moon' },
  ];

  factionsToCheck.forEach(({ factionKey, milestonesKey }) => {
    const faction = factions[factionKey];
    const factionMilestones = milestones[milestonesKey];

    if (faction.power > 0 && !factionMilestones.unlocked) {
      factionMilestones.unlocked = true;
      if (factionKey === 'sun') {
        faction.lore.push({
          description: `O Lady, why did you leave me in darkness?

Nay, child - it was then that I watched over you, scattering myself across the darkness in twinkling pieces of my greatness

Look now to the east, my children, and witness again my rise in conquering glory ‘gainst the cold and deceptive Night, and the Moon its guardian. Bask once more in my glory; turn thy face to me as does every painted flower.

For without me your crops shall wither, and you shall know only darkness.
`,
          time: store.calendar,
        });
      } else {
        faction.lore.push({
          description: `Breathe deep the gathering dark
Sun’s harsh light has left its mark
Now in purple-black embrace
Silver shines - your Lord’s true face

Cold and clear, bright and keen
What in my pale light is seen?
What twinkles there, beyond My Eye?
In Sky you Lie, if Mine you Die
`,
          time: store.calendar,
        });
      }

      if (store.factionAchievements[factionKey].met) {
        newLore(factionKey);
      } else {
        newLoreAndMilestone(factionKey);
        store.factionAchievements[factionKey].met = true;
        store.factions[factionKey].unseenAchievements = true;
      }      
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
      newMilestone();
    }

    //if 25 buildings in grid
    if (faction.grid.filter((cell) => cell).length >= 25 && !store.factionAchievements[factionKey].level5Buildings) {
      store.factionAchievements[factionKey].level5Buildings = true;
      store.factions[factionKey].unseenAchievements = true;
      newMilestone();
    }

    //if offtime building built
    if (faction.grid.some((cell) => cell === `${factionKey}-other-1`) && !factionMilestones.offTimeBuilding) {
      faction.lore.push({
        description: `Can now build during off-time`,
        time: store.calendar,
      });
      factionMilestones.offTimeBuilding = true;
      newLoreAndMilestone(factionKey);
    }

    //if offtime progress built
    if (faction.grid.some((cell) => cell === `${factionKey}-other-1`) && !factionMilestones.offTimeProgress) {
      faction.lore.push({
        description: `Can now progress during off-time`,
        time: store.calendar,
      });
      factionMilestones.offTimeProgress = true;
      newLoreAndMilestone(factionKey);
    }

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
