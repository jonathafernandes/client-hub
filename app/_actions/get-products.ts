export const getProducts =  async () => {
    try {
        const products = await fetch('/api/products', {
            cache: 'no-store',
           })
        return products.json()
    }
    catch (error) {
        console.error('Erro ao buscar produtos:', error)
        return []
    }
}
