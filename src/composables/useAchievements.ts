import { useStore } from './useStore';

export const useAchievements = () => {
    const store = useStore();

    //combine sun achiemvents from store with achievement metadata
    const sunAchievements = sunAchievementMetadata().map((metadata) => {
        return {
            ...metadata,
            met: store.factionAchievements.sun[metadata.id],
        };
    });

    //combine moon achiemvents from store with achievement metadata
    const moonAchievements = moonAchievementMetadata().map((metadata) => {
        return {
            ...metadata,
            met: store.factionAchievements.moon[metadata.id],
        };
    });

    return { sunAchievements, moonAchievements };
}

const sunAchievementMetadata = () => {
    return [
        {
            id: 'met',
            name: 'Behold the Dawn',
            description: 'Meet the RADIANT LADY',
        },
        {
            id: 'level3Buildings',
            name: 'Sun\'s Bounty',
            description: 'Fill Heliotropolis with 9 buildings',
        },
        {
            id: 'level4Buildings',
            name: 'Soak up the Sun',
            description: 'Fill Heliotropolis with 16 buildings',
        },
        {
            id: 'level5Buildings',
            name: 'Her Full Spectrum',
            description: 'Fill Heliotropolis with 25 buildings',
        },
        {
            id: 'morePowerful',
            name: 'An End to Darkness?',
            description: 'Be twice as strong as the SILVER LORD',
        },
        {
            id: 'cooperativeEnding',
            name: 'Two Peoples, One Sky',
            description: 'Embrace duality and reconcile to warring faiths',
        },
        {
            id: 'wonEnding',
            name: 'The Unconquered Sun',
            description: 'Banish the SILVER LORD from the sky and leave no shadow for him to hide in',
        },
        {
            id: 'lostEnding',
            name: 'A Dwindling Flame',
            description: 'The torch of the sun has been snuffed out',
        },
        {
            id: 'neitherEnding',
            name: 'Strife with No End',
            description: 'Doomed to lonely nights and loveless days',
        },
    ];
}

const moonAchievementMetadata = () => {
    return [
        {
            id: 'met',
            name: 'New Moon Rising',
            description: 'Meet the SILVER LORD',
        },
        {
            id: 'level3Buildings',
            name: 'Rising Tides',
            description: 'Fill Cynthas City with 9 buildings',
        },
        {
            id: 'level4Buildings',
            name: 'Harvest Moon',
            description: 'Fill Cynthas City with 16 buildings',
        },
        {
            id: 'level5Buildings',
            name: 'A Full Firmament',
            description: 'Fill Cynthas City with 25 buildings',
        },
        {
            id: 'morePowerful',
            name: 'The Dying of the Light?',
            description: 'Be twice as strong as the RADIANT LADY',
        },
        {
            id: 'cooperativeEnding',
            name: 'Two Peoples, One Sky',
            description: 'Embrace duality and reconcile to warring faiths',
        },
        {
            id: 'wonEnding',
            name: 'Night Everlasting',
            description: 'Banish the RADIANT LADY and snuff out the torch of the sun',
        },
        {
            id: 'lostEnding',
            name: 'Forever Waned',
            description: 'Banished from the night sky',
        },
        {
            id: 'neitherEnding',
            name: 'A Dance with No End',
            description: 'Doomed to loveless nights and lonely days',
        },
    ];
}
