import { DefineComponent } from "vue";
import { SunnyOutline, CloudOutline, MoonOutline, StarOutline } from '@vicons/ionicons5';

export const useBuildings = () => {
    const buildings = {
        sun: [
            {
                id: 'sun-1',
                name: 'Sun Building 1',
                description: 'Sun Building 1 description',
                faction: 'sun',
                icon: SunnyOutline as DefineComponent,
                unlocked: false,
                prerequisites: [
                    0,
                    [],
                    0,
                ],
            },
            {
                id: 'sun-2',
                name: 'Sun Building 2',
                description: 'Sun Building 2 description',
                faction: 'sun',
                icon: CloudOutline as DefineComponent,
                unlocked: false,
                prerequisites: [
                    0,
                    [],
                    0,
                ],
            },        
        ],
        moon: [
            {
                id: 'moon-1',
                name: 'Moon Building 1',
                description: 'Moon Building 1 description',
                faction: 'moon',
                icon: MoonOutline as DefineComponent,
                unlocked: false,
                prerequisites: [
                    0,
                    [],
                    0,
                ],
            },
            {
                id: 'moon-2',
                name: 'Moon Building 2',
                description: 'Moon Building 2 description',
                faction: 'moon',
                icon: StarOutline as DefineComponent,
                unlocked: false,
                prerequisites: [
                    0,
                    [],
                    0,
                ],
            },
        ],
    }

    return { buildings };
}
