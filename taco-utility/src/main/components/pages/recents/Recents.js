import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import CloudTitle from '../../cloud-title/CloudTitle';
import './recents.css'
import CartContext from '../cart/CartContext';
import { useHistory } from 'react-router-dom';

function Recents() {

    const history = useHistory();

    const [recentTacos, setRecentTacos] = useState(null)

    const {cart, setCart} = useContext(CartContext)

    useEffect(() => {
        axios.get("http://localhost:8080/design/recent")
            .then(response => {setRecentTacos(response.data); console.log(response)} )
    }, [])

    const onOrderClick = (taco) => {
        let currentCart = [...cart]
        currentCart.push(taco)
        setCart(currentCart)
        history.push('/cart')
    }

    const formTacoBlock = (taco) => {
        let tacoBlock =
            <div className="tacoblock" key={taco.name}>
                <div className="tacoName" >
                    <span className="small" >The</span><br/>{taco.name}
                </div>
                <div className="tacoDesc">
                    <ul className="commalist" key={taco.name}>
                        {taco.ingredients.filter(ing => ing.type!=="WRAP").map(res => {return(<li key={res.name}>{res.name}</li>)})}
                    </ul>
                    <div>
                        <span>wrapped in </span>
                        <ul className="commalist">
                            {taco.ingredients.filter(ing => ing.type==="WRAP").map(res => {return(<li key={res.name}>{res.name}</li>)})}
                        </ul>
                    </div>
                </div>
                <button onClick={() => onOrderClick(taco)}>Order this taco</button>
            </div>
        return tacoBlock;
    }

    return (
        <div>
            <CloudTitle title="Admire some recently created taco masterpieces"/>
            {recentTacos!=null ? 
                <div className="recentsblock">
                    {recentTacos.map(taco => {
                        return formTacoBlock(taco)
                    })}
                </div>
                :  <span>Loading..</span>
            }
        </div>
    )
}

export default Recents
