import { Ticket } from "@/types"

const bookings: Ticket[] = [
    {
        id: '123',
        bookedOnDate: '2024-02-12T17:16:31.898Z',
        bookedForDate: '2024-03-18T17:16:31.898Z',
        slot: [
            {
                id: '1',
                vodScreen: 'VOD-1',
                timeSlot: '3:30'
            },
            {
                id: '2',
                vodScreen: 'VOD-1',
                timeSlot: '3:30'
            }
        ]
    },
    {
        id: '124',
        bookedOnDate: '2024-02-12T17:16:31.898Z',
        bookedForDate: '2024-03-20T17:16:31.898Z',
        slot: [
            {
                id: '6',
                vodScreen: 'VOD-2',
                timeSlot: '3:30'
            },
            {
                id: '8',
                vodScreen: 'VOD-2',
                timeSlot: '3:30'
            }
        ]
    },
];

export default bookings;