import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import expect from 'expect';

import './addCounter';
import './todoListReducer';


// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const Counter = ({value, onIncrement, onDecrement }) => (
    <div>
        <h1>Counter</h1>
        <h2>{value}</h2>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() =>
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('counter')
    );
};
render();

store.subscribe(render);


// Tests
expect(
    counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
    counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
    counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
    counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect(
    counter(undefined, {})
).toEqual(0);

console.log('Tests passed!');
