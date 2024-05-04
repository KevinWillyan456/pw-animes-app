import { useEffect, useState } from 'react'
import { Card } from './Card'
import './Main.css'
import api from '../services/Api'

export function Main() {
    const [animes, setAnimes] = useState([])

    const getAnimes = async (url: any) => {
        const res = await api.get(url)
        const data = await res.data

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
        getAnimes('/animes')
    }, [])

    return (
        <>
            <section className="container-animes">
                <div className="content-animes">
                    {animes.length > 0 &&
                        animes.map((anime: any) => (
                            <Card key={anime._id} anime={anime} />
                        ))}
                </div>
            </section>
        </>
    )
}
