import './Header.css'
import SearchInput from './SearchInput'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header className="cabecalho">
                <Link to="/">
                    <div className="logo">
                        <div className="part-1">Pw</div>
                        <div className="part-2">Animes</div>
                    </div>
                </Link>
            </header>
            <SearchInput />
        </>
    )
}
