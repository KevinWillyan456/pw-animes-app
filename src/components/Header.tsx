import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { SearchInput } from './SearchInput'

import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    const [mostrarMenu, setMostrarMenu] = useState(false)

    const handleClick = () => {
        setMostrarMenu(!mostrarMenu)
    }

    return (
        <>
            <header className="cabecalho">
                <Link to="/">
                    <div className="logo">
                        <div className="part-1">Pw</div>
                        <div className="part-2">Animes</div>
                    </div>
                </Link>
                <nav className="navbar">
                    <div onClick={handleClick} className="navbar-hamburger">
                        <GiHamburgerMenu />
                    </div>

                    {mostrarMenu && (
                        <div className="menu-mobile">
                            <AiOutlineClose
                                onClick={handleClick}
                                className="navbar-hamburger-close"
                            />

                            <ul className="navbar-ul">
                                <li>
                                    <Link onClick={handleClick} to="/">
                                        Início
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">Favoritos</Link>
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
