import TicketsList from "./TicketsList";

export default function Tickets() {
    return (
        <main>
            <nav>
                <div>
                    <h2>Tickets</h2>
                    <p><small>Currently Opened Tickets.</small></p>
                    <TicketsList />
                </div>
            </nav>
        </main>
    )
}
