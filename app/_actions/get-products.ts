export const getProducts =  async () => {
    try {
        const products = await fetch('/api/products')
        return products.json()
    }
    catch (error) {
        console.error('Erro ao buscar produtos:', error)
        return []
    }
}
