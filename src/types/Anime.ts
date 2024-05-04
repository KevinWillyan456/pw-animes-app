export interface IAnime {
    _id: string
    nome: string
    ano: number
    genero: string
    urlCapa: string
    urlTrailer: string
    sinopse: string
    classificacaoIndicativa: number
    dataCriacao: string
    episodios: IEpisodios[]
}

export interface IEpisodios {
    _id: string
    episodioNumero: number
    episodioUrl: string
    episodioTipo: string
}
