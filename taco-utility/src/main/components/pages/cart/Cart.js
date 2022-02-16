import React,{useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import CloudTitle from '../../cloud-title/CloudTitle';
import './Cart.css'
import CartContext from './CartContext';
import axios from 'axios';

function Cart() {

    const {cart, setCart} = useContext(CartContext)

    const initialState = {
        deliveryName: '',
        deliveryStreet: '',
        deliveryState: '',
        deliveryZip: '',
        ccNumber: '',
        ccExpiration: '',
        ccCVV: '',
        deliveryCity:'',
        
    };

    const [order, setOrder] = useState(initialState);

    const [quatity, setQuatity] = useState(1);
    console.log(cart);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOrder((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(order);
    }

    useEffect(() => { 
        //setOrder({...order, tacos:cart})
        setOrder(prevState => ({...prevState, tacos:cart}))
    }, [cart])

    const handleFormSubmit = () => {
        console.log(order);
        axios.post("http://localhost:8080/orders?",order)
            .then(response => {console.log(response);setCart([])})
    }

    return (
        <div>
            <CloudTitle title="Order your taco creations"/>
            <p>You've crafted your mouthwatering taco masterpieces. Now, just imagine those
            creations appearing before you at home...or work...or wherever you are!</p>
            {cart.length===0?
                <div>
                    <p><b>There are no tacos currently in your cart. 
                        <Link to="/design">Create one now </Link>
                        or choose a <Link to="/recents">recently created taco</Link>
                    </b></p>
                </div>
                :
                <div>
                    <p>Here are your latest taco designs. Just say the
                    word and we'll set them on a cloud aloft to you!</p>

                    <div className="groupBox groupBoxFull">
                        <div className="groupBoxTitle">Here are my tacos...</div>
                        <div className="groupBoxContent">
                            <table border="1" width="90%">
                                <thead>
                                    <tr>
                                    <td>Qty</td>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => {return(
                                        <tr key={item.name}>
                                            <td>
                                                <select value={quatity} onChange={(e) => setQuatity(e.target.value)}>
                                                    <option value="0">Remove</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                            </td>
                                            <td>The "<span className="caps">{item.name}</span>"</td>
                                            <td>
                                                <ul className="commalist" key={item.name}>
                                                    {/* <li >{item.ingredients.filter(ing => ing.type!=="WRAP").map(res => res.name+" ")}</li> */}
                                                    {item.ingredients.filter(ing => ing.type!=="WRAP").map(res => {return(<li key={res.name}>{res.name}</li>)})}
                                                </ul>
                                                <div>
                                                    <span>wrapped in </span>
                                                    <ul className="commalist">
                                                        {item.ingredients.filter(ing => ing.type==="WRAP").map(res => {return(<li key={res.name}>{res.name}</li>)})}
                                                    </ul>
                                                </div>
                                            </td>
                                            <td align="right">{4.99 * quatity }</td>
                                        </tr>)})
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" align="right">Total:</td>
                                        <td align="right"><span>{4.99 * quatity}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <form>
                        <div className="groupBox groupBoxHalf">
                            <div className="groupBoxTitle">Deliver them to...</div>
                            <div className="groupBoxContent">
                                <label htmlFor="deliveryName">Name: </label>
                                <input type="text" name="deliveryName" size="30"
                                    value={order.deliveryName} 
                                    onChange={handleInputChange}
                                />
                                <br/>
                                <label htmlFor="deliveryStreet">Street address: </label>
                                <input type="text" name="deliveryStreet" size="30"
                                    value={order.deliveryStreet}
                                    onChange={handleInputChange}
                                />
                                <br/>
                                <label htmlFor="deliveryCity">City / State: </label>
                                <input type="text" name="deliveryCity" value={order.deliveryCity} onChange={handleInputChange} size="30"/>
                                <select name="deliveryState" value={order.deliveryState} onChange={handleInputChange}>
                                    <option value="">--</option>
                                    <option value="KA">KA</option>
                                    <option value="TN">TN</option>
                                    <option value="MH">MH</option>
                                </select>
                                <br/>

                                <label htmlFor="deliveryZip">Zip code: </label>
                                <input type="text" name="deliveryZip"
                                    value={order.deliveryZip}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="groupBox groupBoxHalf">
                            <div className="groupBoxTitle">Here's how I'll pay...</div>
                            <div className="groupBoxContent">
                                <label htmlFor="ccNumber">Credit Card #: </label>
                                <input type="text" name="ccNumber"
                                    value={order.ccNumber}
                                    onChange={handleInputChange}
                                />
                                <br/>
                                <label htmlFor="ccExpiration">Expiration / CVV: </label>
                                <input type="text" name="ccExpiration"
                                    value={order.ccExpiration}
                                    onChange={handleInputChange}
                                />
                                <input type="text" name="ccCVV" size="4"
                                    value={order.ccCVV}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <br/>
                    </form>
                    <button onClick={() => handleFormSubmit()}>Submit Order</button>
                </div>
            }
        </div>
    )
}

export default Cart
