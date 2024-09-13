import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const params = useParams();

  const NavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: false },
    { name: "Login", slug: "/login", active: !authStatus },
    {
      name: "Logout",
      slug: "/logout",
      active: authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-red-600">
      <Container>
        <nav>
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {NavItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug, { replace: true })}
                    className={`${
                      params.slug === item.slug ? "bg-white" : ""
                    } inline-flex items-center py-2 px-4 text-sm font-medium`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

