import { useState } from 'react'
import './SearchInput.css'
import { AiOutlineSearch } from 'react-icons/ai'

export function SearchInput() {
    const [search, setSearch] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!search) return

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
