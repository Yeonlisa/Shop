/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

const 박스 = styled.div`
    padding: 20px;
`;

const 제목 = styled.h4`
    font-size: 25px;
    color: ${ props => props.색상 }
`;

// Lifecycle Hook(class 컴포넌트)
/* class Detail2 extends React.Component {

    componentDidMount() {
        // Detail2 컴포넌트가 Mount(등장) 되었을 때 실행할 코드
        // Ajax 같은 것도 이런 곳에 자주 사용된다
    }

    componentWillUnmount() {
        // Detail2 컴포넌트가 Unmount(해제) 되기 직전에 실행할 코드
    }

} */

function Detail(props) {

    // useEffect 훅 : 컴포넌트가 mount 되었을 때, 컴포넌트가 update 될 때 특정 코드를 실행할 수 있음
    useEffect(() => {
        /* let 타이머 = setTimeout(() => {
            // alert 창을 안보이게
        }, 2000) */
        /* return function 어쩌구(){ 실행할코드 } // Unmount될때 실행됨 */
    });
    
    let { id } = useParams();
    let 찾은상품 = props.shoes.find((상품) =>{
        return 상품.id == id
    });
    let history = useHistory();

    return(
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
                <div className="my-alert2">
                    <p>재고가 얼마 남지 않았습니다</p>
                </div>
            </박스>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>&nbsp;
                    <button className="btn btn-danger" onClick={() => { 
                        history.push('/')
                    }}>뒤로가기</button> 
                </div>
            </div>
        </div>
    )
}

export default Detail;