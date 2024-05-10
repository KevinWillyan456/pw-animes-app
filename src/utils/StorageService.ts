export default class StorageService {
    public static create(id: string, number: number) {
        const values = localStorage.getItem('history')
        if (values) {
            const history = JSON.parse(values)
            const item = history.find((item: { id: string }) => item.id === id)
            if (item) {
                item.number = number
                localStorage.setItem('history', JSON.stringify(history))
                return
            }
            history.push({ id: id, number: number })
            localStorage.setItem('history', JSON.stringify(history))
            return
        } else {
            const data = {
                id: id,
                number: number,
            }
            localStorage.setItem('history', JSON.stringify([data]))
        }
    }

    public static read(id: string) {
        const value = localStorage.getItem('history')
        if (value) {
            const history = JSON.parse(value)
            const item = history.find((item: { id: string }) => item.id === id)
            if (item) {
                return item.number
            }
        }
        return 0
    }

    public static createFavorite(id: string) {
        const values = localStorage.getItem('favorites')
        if (values) {
            const favorites = JSON.parse(values)
            if (favorites.includes(id)) {
                return
            }
            favorites.push(id)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            return
        } else {
            localStorage.setItem('favorites', JSON.stringify([id]))
        }
    }

    public static readFavorites() {
        const value = localStorage.getItem('favorites')
        if (value) {
            return JSON.parse(value)
        }
        return []
    }

    public static removeFavorite(id: string) {
        const values = localStorage.getItem('favorites')
        if (values) {
            const favorites = JSON.parse(values)
            const index = favorites.indexOf(id)
            if (index !== -1) {
                favorites.splice(index, 1)
                localStorage.setItem('favorites', JSON.stringify(favorites))
            }
        }
    }
}
