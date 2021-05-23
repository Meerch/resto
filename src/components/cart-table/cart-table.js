import React, {useEffect} from 'react';
import './cart-table.scss';
import {connect} from 'react-redux'
import {deleteFromCart, getAmountItems, getSumSelectItems} from "../../actions";

const CartTable = ({items, deleteFromCart, amountItems, getAmountItems, getSumSelectItems}) => {

    useEffect(() => {
        getAmountItems()
    })

    return (
        <>
            <div className="cart__title">Выбрано товаров: {amountItems}</div>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, amount} = item
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart_item-amount">x{amount}</div>
                                <div onClick={() => {
                                    deleteFromCart(id)
                                    getSumSelectItems()
                                }} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = ({items, amountItems}) => {
    return {
        items,
        amountItems
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    getAmountItems,
    getSumSelectItems
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable)