export const getClients = async () => {
    const timestamp = new Date().getTime()

    try {
        const clients = await fetch(`/api/clients?tid=${timestamp}`, { next: { revalidate: 0 } })
        return clients.json()
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error)
        return []
    }
}
