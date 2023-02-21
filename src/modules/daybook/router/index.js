export default {
    name : 'daybook',
    component : () => import('@/modules/daybook/layout/DayBookLayout.vue'),
    children : [
        {
            path : '',
            name : 'no-entry',
            component :() => import('@/modules/daybook/views/NoEntrySelected.vue'),
        },
        {
            path : ':id',
            name : 'entry-enter',
            component :() => import('@/modules/daybook/views/Entry.vue'),
            props : ( route ) => {
                return {
                    id : route.params.id
                }
            }
        },
    ],
}