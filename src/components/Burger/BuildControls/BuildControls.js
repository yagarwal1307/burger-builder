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
                click={props.click.bind(this, control.type)} 
                label={control.label} 
                key={control.label}
                disabled={props.disabled[control.type]}/>
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);
}
export default buildControls