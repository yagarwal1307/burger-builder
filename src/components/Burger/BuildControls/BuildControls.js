import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {type: 'salad', label: 'Salad'},
    {type: 'meat', label: 'Meat'},
    {type: 'bacon', label: 'Bacon'},
    {type: 'cheese', label: 'Cheese'},
];

const buildControls = (props) => {
    return (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
            return <BuildControl
                added = {() => props.ingredientAdded(control.type)}
                removed = {() => props.ingredientRemoved(control.type)}
                label={control.label} 
                key={control.label}
                disabled={props.disabled[control.type]}/>
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);
}
export default buildControls