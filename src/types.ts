export type VodScreen = 'VOD-1' | 'VOD-2' | 'VOD-3' | 'VOD-4';

export type SlotTimming = '2:30' | '3:30' | '4:30' | '5:30' | '6:30';

export type Slot = {
    id: string;
    vodScreen: VodScreen;
    bookedForDate: string;
    timeSlot: SlotTimming;
}

export type Ticket = {
    id: string;
    bookedOnDate: string;
    slot: Slot[];
}