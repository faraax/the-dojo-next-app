import Link from "next/link"

async function getTickets() {
    const res = await fetch('http://localhost:4000/tickets',
        {
            // cache: "no-cache",
            next: {
                revalidate: 0
            }
        }
    )
    return res.json()
}

export default async function TicketsList() {
    const ticket = await getTickets()
    return (
        <>
            {
                ticket.map((data) => (
                    <div key={data.id} className="card my-5">
                        <Link href={`tickets/${data.id}`}>
                            <h3>{data.title}</h3>
                            <p>{data.body.slice(0, 200)}...</p>
                            <div className={`pill ${data.priority}`}>
                                {
                                    data.priority
                                } priority
                            </div>
                        </Link>
                    </div>
                ))
            }
            {
                ticket.length === 0 && (
                    <p className="text-center">There are no tickets to sales..</p>
                )
            }
        </>
    )
}
