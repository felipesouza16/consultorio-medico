import { Logo } from "@/src/assets/logo";
import { User } from "@/src/assets/user";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand mb-1" href="">
          <Logo />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/agendamentos">
                Agendamentos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/consultas">
                Consultas
              </a>
            </li>
          </ul>

          <div className="d-flex" role="search">
            <User />
          </div>
        </div>
      </div>
    </nav>
  );
};
