/*eslint-disable*/
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from './App.js';
import { CSSTransition } from 'react-transition-group';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';


const 박스 = styled.div`
    padding: 20px;
`;

const 제목 = styled.h4`
    font-size: 25px;
    color: ${ props => props.색상 }
`;


function Detail(props) {
    
    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);


    let 재고 = useContext(재고context);

    useEffect(() => {
        
        let 타이머 = setTimeout(() => {
            alert변경(false)
        }, 2000);
        return () => { clearTimeout(타이머) }
    },[]);
    
    let { id } = useParams();
    let history = useHistory();
    let 찾은상품 = props.shoes.find(x => x.id == id);
    let [탭, 탭변경] = useState(0);
    let [click, setClick] = useState(false);



/* 1. 누가 Detail 페이지 들어가면
2. localStorage에 있는 항목을 꺼낸다.
3. null이 나오거나 []가 나오는 두가지 경우가 있을 것이다.
4. []가 나오면 거기에 URL파라미터의 id부분을 push()한다.(추가)
5. 중복 처리한다.
6. 그러면 다시 []를 localStorage에 따옴표 쳐서 저장한다. */

    useEffect(() => {
        let arr = localStorage.getItem('watched');
        if(arr == null) {
            arr = [];
        } else {
            arr = JSON.parse(arr);
        }

        arr.push(id);
        arr = new Set(arr);
        arr = [...arr];

        localStorage.setItem('watched', JSON.stringify(arr));

    },[]);


    return(
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>

            {
                alert === true 
                ? (<div className="my-alert2">
                    <p>재고가 얼마 남지 않았습니다</p>
                </div>)
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-2">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>

                    <Info 재고={props.재고}></Info>


                    <button className="btn btn-danger" onClick={() => {
                        props.재고변경([9,11,12])
                        props.dispatch({ type: '항목추가', 데이터 : { id : 찾은상품.id, name : 찾은상품.title, quan : 1 } });
                        history.push('/cart');
                    }}>주문하기</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => { 
                        history.push('/')
                    }}>뒤로가기</button> 
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={ () => { 스위치변경(false); 누른탭변경(0) }}>상품설명</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ () => { 스위치변경(false); 누른탭변경(1) }}>배송정보</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={스위치} classNames="wow" timeout={500}>
                <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
            </CSSTransition>


        </div>
    )
}

function TabContent(props) {

    useEffect(() => {
        props.스위치변경(true);
    });

    if(props.누른탭 === 0) {
        return <div>0번째 내용입니다</div>
    } else if(props.누른탭 === 1) {
        return <div>1번째 내용입니다</div>
    } else if(props.누른탭 === 2) {
        return <div>2번째 내용입니다</div>
    }

} 

function Info(props) {
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

function state를props화(state) {
    return {
        state : state.reducer,
        alert열렸니 : state.reducer2
    }
}


export default connect(state를props화)(Detail)

/* export default Detail; */