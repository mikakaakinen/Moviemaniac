import './Navbar.css';
import DarkMode from '../DarkMode/DarkMode';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Leffahullu</h1>
      <Link to='/search'>Haku</Link>
      <div className='navbar_links'>
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
