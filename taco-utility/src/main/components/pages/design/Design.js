import React, {useEffect, useState, useContext} from 'react'
import CloudTitle from '../../cloud-title/CloudTitle'
import GroupBox from '../../group-box/GroupBox'
import axios from 'axios'
import './Design.css'
import { useHistory } from 'react-router-dom';
import CartContext from '../cart/CartContext'

function Design() {

    const history = useHistory();

    const {cart, setCart} = useContext(CartContext)

    const taco = {
        name:'',
        ingredients:[]
    }

    const [ingredients, setIngredients] = useState(null)
    const [selectedIng, setSelectedIng] = useState(taco);

    useEffect(() => {
        axios.get("http://localhost:8080/api/ingredients")
            .then(response => {setIngredients(response.data._embedded.ingredients);console.log(response)} )
    }, [])

    const handleSelectChange = (e, res) => {
        console.log(res);
        let ingredient = [...selectedIng.ingredients]
        if(e.target.checked){
            ingredient.push({"id":res.id, "name":res.name, "type":res.type});
        }else{
            ingredient.splice(ingredient.findIndex(i => i.id === res.id), 1);
        }
        console.log(ingredient);
        setSelectedIng(prevState => ({...prevState, ingredients:ingredient}))
        console.log(selectedIng);
    }

    const handleFormSubmit = () => {
        console.log(selectedIng);
        axios.post("http://localhost:8080/design?",{"name":selectedIng.name, "ingredients":selectedIng.ingredients})
            .then(response => {
                console.log(response)
                let currentCart = [...cart]
                currentCart.push(response.data)
                setCart(currentCart)
            })
            .then(history.push('/cart'))
    }


    return (
        <div>
            <CloudTitle title="Design your taco masterpiece"/>
            <p>
                We provide a palette of fresh ingredients...you provide the inspiration! Select the
                components that will come together as your crowning achievement of taco workmanship.
            </p>
            {ingredients!=null? 
                <div>
                    <form >
                        <div className="ingredientsblock" style={{textAlign: "center", width: "100%"}}>
                            <GroupBox title="Record your wrap" content= 
                                {ingredients.filter(ing => ing.type === "WRAP").map(res => {
                                    return (
                                        <span key={res.id}>
                                            <input type="checkbox" name={res.name} key={res.id} value={res.id} onChange={(e) => {handleSelectChange(e, res)}}/>
                                            {res.name}<br/>
                                        </span>
                                    )
                                })}
                            />
                            <GroupBox title="Pick your proteins" content= 
                                {ingredients.filter(ing => ing.type === "PROTEIN").map(res => {
                                    return (<span key={res.id}><input type="checkbox" name={res.name} key={res.id} onChange={(e) => {handleSelectChange(e, res)}}/>{res.name}<br/></span>)
                                })}
                            />
                            <GroupBox title="Choose your cheeses" content= 
                                {ingredients.filter(ing => ing.type === "CHEESE").map(res => {
                                    return (<span key={res.id}><input type="checkbox" name={res.name} key={res.id} onChange={(e) => {handleSelectChange(e, res)}}/>{res.name}<br/></span>)
                                })}
                            />
                            <GroupBox title="Vouch for your veggies" content= 
                                {ingredients.filter(ing => ing.type === "VEGGIES").map(res => {
                                    return (<span key={res.id}><input type="checkbox" name={res.name} key={res.id} onChange={(e) => {handleSelectChange(e, res)}}/>{res.name}<br/></span>)
                                })}
                            />
                            <GroupBox title="Select your sauces" content= 
                                {ingredients.filter(ing => ing.type === "SAUCE").map(res => {
                                    return (<span key={res.id}><input type="checkbox" name={res.name} key={res.id} onChange={(e) => {handleSelectChange(e, res)}}/>{res.name}<br/></span>)
                                })}
                            />
                            <GroupBox title="Name your taco creation" content=
                                {<span>My taco magnum opus shall be called<br/>the "
                                    <input  type="text" name="name" className="nameField" value={selectedIng.name}
                                        onChange={e => setSelectedIng({...selectedIng, name:e.target.value})}
                                    />"!
                                </span>}
                            />
                        </div>
                        
                    </form>
                    <div style={{textAlign:"center", width:"100%"}}>
                        <button onClick={() => handleFormSubmit()}>Construct this taco</button>
                    </div>
                </div>
                : <span>Loading..</span>
            }
        </div>
    )
}

export default Design
