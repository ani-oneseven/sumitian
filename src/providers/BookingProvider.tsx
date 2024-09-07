import { Ticket } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type BookingType = {
    tickets: Ticket[],
    addTicket: (ticket: Ticket) => void;
}

const BookingContext = createContext<BookingType>({
    tickets: [],
    addTicket: () => {},
});

const BookingProvider = ({children}: PropsWithChildren) => {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    
    const addTicket = (ticket: Ticket) => {
        setTickets([ticket, ...tickets]);
    };

    return (
        <BookingContext.Provider value={{ tickets, addTicket }}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;

export const useBooking = () => useContext(BookingContext);