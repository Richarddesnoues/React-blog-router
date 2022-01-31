import React from 'react';

import './footer.scss';

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="footer">
      DevOfThrones, le blog du développeur React - {year} ©
    </footer>
  );
};

export default Footer;
