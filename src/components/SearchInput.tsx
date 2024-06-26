import { useState } from 'react'
import './SearchInput.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { useLocation, useHistory } from 'react-router-dom'

function SearchInput() {
    const [search, setSearch] = useState('')
    const location = useLocation()
    const history = useHistory()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!search) return

        const queryParams = new URLSearchParams(location.search)

        queryParams.set('q', search)

        history.push(`/search?${queryParams.toString()}`)

        setSearch('')
    }
    return (
        <div className="pesquisa">
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <AiOutlineSearch className="icon" />
                </button>
                <input
                    type="text"
                    placeholder="Digite o nome do anime..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>
        </div>
    )
}

export default SearchInput
