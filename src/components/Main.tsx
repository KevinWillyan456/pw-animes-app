import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'

export function Main() {
    const [animes, setAnimes] = useState([])

    const getAnimes = async (url: any) => {
        const res = await fetch(url)
        const data = await res.json()

        data.sort((a: any, b: any) => {
            const nomeA = a.nome.toUpperCase()
            const nomeB = b.nome.toUpperCase()

            if (nomeA < nomeB) {
                return -1
            }
            if (nomeA > nomeB) {
                return 1
            }
            return 0
        })

        setAnimes(data)
    }

    useEffect(() => {
        const url =
            'https://pw-animes-react-database.kevinsouza456.repl.co/animes'
        getAnimes(url)
    }, [])

    return (
        <>
            <section className="container-animes">
                <div className="content-animes">
                    {animes.length > 0 &&
                        animes.map((anime: any) => (
                            <Card key={anime.id} anime={anime} />
                        ))}
                </div>
            </section>
        </>
    )
}
