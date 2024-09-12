// import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useStateValue } from './StateProvider';
import {auth} from './firebase'
function Header(){
    const [{basket,user}]=useStateValue()

    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <Link to ='/'>
                <img className='header_image' src="https://mui.com/static/branding/companies/amazon-dark.svg"/>
            </Link>
            
            <div className='header_search'>
                <input type='text' className='header_searchInput' placeholder='Search'  />
                <FaSearch className='header_searchIcon' />
            </div>
            <div className='header_nav'>
                <Link to={!user &&'/LogIn'}>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className='header_optionLineOne'>{user ? `Hello ${user.email}`:'Hello Guest'}</span>
                        <span className='header_optionLineTwo'>{user ? "Sign Out": "Sign In"}</span>
                    </div>
                </Link>
                
                <div className='header_option'>
                    <span className='header_optionLineOne'>Returns</span>
                    <span className='header_optionLineTwo'>&Orders</span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>You</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>
                <Link to='/checkout'>
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionBasketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;