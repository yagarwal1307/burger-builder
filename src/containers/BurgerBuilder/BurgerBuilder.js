import React, { Component } from 'react';

import Aux from '../../hoc/Auxx/Auxx';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        axios.get('https://my-burger-60cd1.firebaseio.com/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch(error => {
            this.setState({error: true})
        })
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    };

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        })
    };

    updatePurchaseStateHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    ingredientHandler = (ingredientLabel, componentLabel) => {

        const newIngredients = { ...this.state.ingredients };
        const ingr = newIngredients[ingredientLabel];
        let newPrice = this.state.totalPrice;

        if (componentLabel === 'Less' & ingr > 0) {
            newIngredients[ingredientLabel] = ingr - 1;
            newPrice -= INGREDIENT_PRICES[ingredientLabel];
        }

        if (componentLabel === 'More') {
            newIngredients[ingredientLabel] = ingr + 1;
            newPrice += INGREDIENT_PRICES[ingredientLabel];
        }

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.updatePurchaseStateHandler(newIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> :<Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        disabled={disabledInfo}
                        click={this.ingredientHandler} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients} />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);