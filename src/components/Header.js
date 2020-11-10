import React from 'react';

const Header = (props) => (
    <header className="header">
      <a href="https://markbryginskii.github.io/mesto-react/index.html"><img className="header__logo" src={props.logo} alt="Место" /></a>
    </header>
  );

export default Header;
