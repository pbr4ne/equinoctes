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
            name: 'Achievement 0',
            description: 'Unlock the faction',
        },
        {
            id: 'level3Buildings',
            name: 'Achievement 1',
            description: 'Unlock all level 3 buildings',
        },
        {
            id: 'level4Buildings',
            name: 'Achievement 2',
            description: 'Unlock all level 4 buildings',
        },
        {
            id: 'level5Buildings',
            name: 'Achievement 3',
            description: 'Unlock all level 5 buildings',
        },
        {
            id: 'morePowerful',
            name: 'Achievement 4',
            description: 'Be more powerful',
        },
        {
            id: 'cooperativeEnding',
            name: 'Achievement 4',
            description: 'Achieve the cooperative ending',
        },
        {
            id: 'wonEnding',
            name: 'Achievement 5',
            description: 'Achieve the won ending',
        },
        {
            id: 'lostEnding',
            name: 'Achievement 6',
            description: 'Achieve the lost ending',
        },
        {
            id: 'neitherEnding',
            name: 'Achievement 7',
            description: 'Achieve the neither ending',
        },
    ];
}

const moonAchievementMetadata = () => {
    return [
        {
            id: 'met',
            name: 'Achievement 0',
            description: 'Unlock the faction',
        },
        {
            id: 'level3Buildings',
            name: 'Achievement 1',
            description: 'Unlock all level 3 buildings',
        },
        {
            id: 'level4Buildings',
            name: 'Achievement 2',
            description: 'Unlock all level 4 buildings',
        },
        {
            id: 'level5Buildings',
            name: 'Achievement 3',
            description: 'Unlock all level 5 buildings',
        },
        {
            id: 'morePowerful',
            name: 'Achievement 4',
            description: 'Be more powerful',
        },
        {
            id: 'cooperativeEnding',
            name: 'Achievement 4',
            description: 'Achieve the cooperative ending',
        },
        {
            id: 'wonEnding',
            name: 'Achievement 5',
            description: 'Achieve the won ending',
        },
        {
            id: 'lostEnding',
            name: 'Achievement 6',
            description: 'Achieve the lost ending',
        },
        {
            id: 'neitherEnding',
            name: 'Achievement 7',
            description: 'Achieve the neither ending',
        },
    ];
}
