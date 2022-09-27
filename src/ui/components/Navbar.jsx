import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    HeroesApp
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink className="nav-item nav-link"
                            to="/marvel"
                        >
                            Marvel
                        </NavLink>

                        <NavLink className="nav-item nav-link"
                            to="/dc"
                        >
                            DC
                        </NavLink>

                        <NavLink className="nav-item nav-link"
                            to="/search"
                        >
                            Search
                        </NavLink>
                    </ul>
                    <div className="btn-group">
                        <span type="button" className="nav-link dropdown-toggle text-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            {user?.name}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-lg-end">
                            <li className='dropdown-item'
                                onClick={onLogout}
                                aria-label='logout' >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}