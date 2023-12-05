import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SearchInput } from './SearchInput'

import './Header.css'

export default function Header() {
    const [mostrarMenu, setMostrarMenu] = useState(false)

    const handleClick = () => {
        setMostrarMenu(!mostrarMenu)
    }

    return (
        <>
            <header className="cabecalho">
                <Link to={'/'}>
                    <div className="logo">
                        <div className="part-1">Pw</div>
                        <div className="part-2">Animes</div>
                    </div>
                </Link>
                <nav className="navbar">
                    <ul className="navbar-ul">
                        <li>
                            <Link to={'/'}>Início</Link>
                        </li>
                        <li>
                            <a href="#">Lista de Animes</a>
                        </li>
                        <li>
                            <a href="#">Favoritos</a>
                        </li>
                        <li>
                            <a href="#">Mangás</a>
                        </li>
                        <li>
                            <a href="#">Calendário</a>
                        </li>
                        <li>
                            <a href="#">Como assistir?</a>
                        </li>
                    </ul>

                    <div onClick={handleClick} className="navbar-hamburger">
                        <GiHamburgerMenu />
                    </div>

                    {mostrarMenu && (
                        <div className="menu-mobile">
                            <AiOutlineClose
                                onClick={handleClick}
                                className="navbar-hamburger-close"
                            />

                            <ul className="navbar-ul-mobile">
                                <li>
                                    <Link onClick={handleClick} to={'/'}>
                                        Início
                                    </Link>
                                </li>
                                <li>
                                    <a href="#">Lista de Animes</a>
                                </li>
                                <li>
                                    <a href="#">Favoritos</a>
                                </li>
                                <li>
                                    <a href="#">Mangás</a>
                                </li>
                                <li>
                                    <a href="#">Calendário</a>
                                </li>
                                <li>
                                    <a href="#">Como assistir?</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
            <SearchInput />
        </>
    )
}
