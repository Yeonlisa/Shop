/*eslint-disable*/
import React, { useEffect, memo } from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Detail.scss';

function Cart(props) {

    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.reducer.map((a,i) => {
                            return (
                                <tr key={i}>
                                    <td>{ a.id }</td>
                                    <td>{ a.name }</td>
                                    <td>{ a.quan }</td>
                                    <td>
                                        <button onClick={() => { dispatch({ type : '수량증가', 데이터 : a.id }) }}>
                                        +</button>
                                        <button onClick={() => { dispatch({ type : '수량감소', 데이터 : a.id }) }}>
                                        -</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            
            { props.alert열렸니 === true
                ? (<div className="my-alert2">
                    <p>지금 구매하시면 신규할인 20%
                        <button className="close" onClick={() => { props.dispatch({ type: 'alert닫기' }) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </p>
                </div>)
                : null
            }
            <Parent 이름="리사" 나이="24"></Parent>
        </div>
    )
}

function Parent(props) {
    return (
        <div>
            <Child1 이름={props.이름}></Child1>
            <Child2 나이={props.나이}></Child2>
        </div>
    )
}

function Child1() {
    useEffect(() => { console.log('렌더링됨1') });
    return <div>이름</div>
}
let Child2 = memo(() => {
    useEffect(() => { console.log('렌더링됨2') });
    return <div>나이</div>
});


function state를props화(state) {
    return {
        state : state.reducer,
        alert열렸니 : state.reducer2
    }
}


export default connect(state를props화)(Cart)

// export default Cart;
