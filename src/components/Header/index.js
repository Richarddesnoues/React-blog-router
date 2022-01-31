import React from 'react';
import PropTypes from 'prop-types';
// On importe le composant Link
import { NavLink } from 'react-router-dom';

// = import style
import './header.scss';

const Header = ({ categories }) => (
  <header className="header">
    <nav className="header__nav">
      {
        // exemple avec utilisation d'une fléchée à return explicite
        // pour mieux comprendre les rouages
        categories.map((category) => {
          const jsxCategory = (
            <NavLink
              key={category.route}
              className="header__nav__link"
              to={category.route}
              activeClassName="header__nav__link--active"
              exact
            >
              {category.label}
            </NavLink>
          );

          return jsxCategory;
        })
      }
    </nav>
  </header>
);

// Je valide mes props : categories est un tableau
// d'objet possédant une route : string et un lable : string
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
