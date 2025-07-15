import React, { useReducer } from "react";
import axios from '../../api/index'
import OrderContext from "./ordersContext";
import OrderReducer from "./ordersReducer";

import { list_orders } from '../../api/otogas'

import {
    ADD_ORDER,
    DELETE_ORDER,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ORDER,
    FILTER_ORDERS,
    CLEAR_FILTER,
    ORDER_ERROR,
    GET_ORDERS,
    CLEAR_ORDERS
} from "../types";

const OrderState = props => {
    const initialState = {
        orders: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    const getOrders = async () => {

        const res = await list_orders()

        if (res.responseCode === 1) {
            dispatch({
                type: GET_ORDERS,
                payload: res.responseObject
            })
        }
    };

    // Add Contact
    const addOrder = async order => {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        try {
            const res = await axios.post("/orders", order, config);
            // payload = new contact in the db
            dispatch({ type: ADD_ORDER, payload: res.data });
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error.response.msg
            });
        }
    };

    // Delete Contact
    const deleteOrder = async id => {
        try {
            await axios.delete(`/api/orders/${id}`);
            // payload = new contact in the db
            dispatch({ type: DELETE_ORDER, payload: id });
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error.response.msg
            });
        }
    };

    // Set Current Contact
    const setCurrent = order => {
        dispatch({ type: SET_CURRENT, payload: order });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update Contact
    const updateOrder = async order => {
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        try {
            const res = await axios.put(
                `/api/orders/${order._id}`,
                order,
                config
            );
            // payload = new contact in the db
            dispatch({ type: UPDATE_ORDER, payload: res.data });
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error.response.msg
            });
        }
        dispatch({ type: UPDATE_ORDER, payload: order });
    };

    // Filter orders
    const filterorders = text => {
        dispatch({ type: FILTER_ORDERS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    // Clear orders
    const clearorders = () => {
        dispatch({ type: CLEAR_ORDERS });
    };
    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addOrder,
                getOrders,
                deleteOrder,
                setCurrent,
                clearCurrent,
                updateOrder,
                filterorders,
                clearFilter,
                clearorders
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderState;