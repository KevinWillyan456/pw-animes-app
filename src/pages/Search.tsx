import { Footer } from '../components/Footer'
import Header from '../components/Header'
import { MainSearch } from '../components/MainSearch'

function Search() {
    return (
        <>
            <section className="search-container">
                <Header />
                <MainSearch />
                <Footer />
            </section>
        </>
    )
}

export default Search
