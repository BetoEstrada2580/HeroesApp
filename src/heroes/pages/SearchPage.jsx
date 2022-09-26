import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks"
import queryString from "query-string";
import { getHeroesByName } from "../helpers/getHeroesByName";
import { useMemo } from "react";
import { HeroCard } from "../components/HeroCard";

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    const { searchText, onInputChange, onResetForm } = useForm({
        searchText: q
    })
    const heroes = useMemo(() => getHeroesByName(q), [q]);
    const showSearh = (q.length === 0);
    const showError = (q.length > 0) && heroes.length === 0;

    const onSearchSubmit = (e) => {
        e.preventDefault();
        // if (searchText.trim().length <= 1) return;
        navigate(`?q=${searchText.toLowerCase().trim()}`);
    }

    const onReset = () => {
        onResetForm({
            searchText: ''
        });
    }

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-5 mt-1">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                        <button className="btn btn-outline-secondary mt-1 ms-1"
                            onClick={onReset}>
                            Clear
                        </button>
                    </form>
                </div>
                <div className="col-sm-12 col-md-7 mt-1">
                    <h4>Results</h4>
                    <hr />
                    <div
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{ display: showSearh ? '' : 'none' }}>
                        Search a hero
                    </div>
                    <div
                        className="alert alert-danger animate__animated animate__fadeIn"
                        style={{ display: showError ? '' : 'none' }}>
                        No hero with <b>{q}</b>
                    </div>
                    {
                        heroes.map(hero =>
                            <HeroCard key={hero.id} {...hero} />
                        )
                    }
                </div>
            </div>
        </>
    )
}
