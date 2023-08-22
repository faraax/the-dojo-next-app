import { notFound } from 'next/navigation'

export const dynamicParams = true

export async function generateStaticParams() {
    const res = await fetch(`http://localhost:4000/tickets/`)
    const tickets = await res.json()
    return tickets.map((ticket) => ({ id: ticket.id }))
}

async function getTickets(id) {
    const res = await fetch(`http://localhost:4000/tickets/${id}`,
        {
            next: {
                revalidate: 60
            }
        }
    )

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

export default async function TicketDetails({ params }) {
    const ticket = await getTickets(params.id)


    // if (Object.keys(ticket).length === 0) return <h3>No Tickets found</h3>;
    return (
        <main>
            <nav>
                <h2>Tickets Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Create By: {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {
                        ticket.priority
                    } priority
                </div>
            </div>
        </main>
    )
}
