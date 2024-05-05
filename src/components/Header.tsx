import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
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
                <a href="/">
                    <div className="logo">
                        <div className="part-1">Pw</div>
                        <div className="part-2">Animes</div>
                    </div>
                </a>
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
                                    <a onClick={handleClick} href="/">
                                        Início
                                    </a>
                                </li>
                                <li>
                                    <a href="#">Favoritos</a>
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
