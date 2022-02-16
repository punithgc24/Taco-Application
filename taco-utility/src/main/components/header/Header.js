import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../pages/cart/CartContext';
import './header.css'

function Header() {

    const {cart} = useContext(CartContext)
    
    return (
        <>
            <div className="header">
                <div className="logo">
                    <Link to="/home">
                        <img src={require("../assets/TacoCloud.png")} />
                    </Link>
                </div>
                <div className="topbar">
                    <div className="topbaritems">
                        <div className="topbaritem" style={{  fontSize: "17pt" }}>
                            <Link to="/design" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="plainlink caps">Design a Taco</span>    
                            </Link>
                        </div>
                        <div className="topbaritem">
                            <a href="signin" className="plainlink">
                                <img src={require("../assets/down-triangle.png")} style={{float: "right", marginRight:"15px", marginTop: "12px"}} />
                                <span className="caps small">Sign in</span><br />
                                <span className="smaller">or Create an Account</span>
                            </a>
                        </div>
                        <div className="topbaritem" style={{fontSize: "17pt"}}>
                            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={require("../assets/cart.png")} align="center" />
                                {cart.length * 4.99}
                            </Link>
                        </div>
                    </div>
                </div >
                <div className="bottombar">
                    <div className="bottombaritems">
                        <div className="bottombaritem">
                            <Link to="/recents" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="plainlink">Latest designs</span>
                            </Link>
                        </div>
                        <div className="bottombaritem">
                            <Link to="/specials" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="plainlink">
                                    Specials
                                </span>
                            </Link>
                        </div>
                        <div className="bottombaritem">
                            <Link to="/locations" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="plainlink">Locations</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default Header;
