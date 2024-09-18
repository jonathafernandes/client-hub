export const getClients =  async () => {
    try {
        const clients = await fetch('/api/clients')
        return clients.json()
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error)
        return []
    }
}
