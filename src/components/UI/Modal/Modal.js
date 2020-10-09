import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxx/Auxx';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {

    shouldComponentUpdate(newProps, newState) {
        return this.props.show !== newProps.show || newProps.children !== this.props.children
    }

    // componentDidUpdate() {
    //     console.log('[Modal.js] component updated!')
    // }

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 
    
    

export default Modal;