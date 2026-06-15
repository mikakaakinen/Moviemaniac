const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <header className='footer'>
      <h2>
        © {currentYear} Made with
        <span style={{ color: '#ff0000' }}> &hearts;</span> in Riihim&auml;ki,
        Finland, partly according to tutorial by Code Bless <br />
        Data provided by{' '}
        <a
          href='https://www.themoviedb.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          The Movie Database (TMDb)
        </a>
      </h2>
    </header>
  );
};

export default Footer;
