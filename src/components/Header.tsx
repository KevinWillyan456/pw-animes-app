import './Header.css'
import SearchInput from './SearchInput'

export default function Header() {
    return (
        <>
            <header className="cabecalho">
                <div>
                    <div className="logo">
                        <div className="part-1">Pw</div>
                        <div className="part-2">Animes</div>
                    </div>
                </div>
            </header>
            <SearchInput />
        </>
    )
}
