import React, {Component, useState} from 'react';
import styled from 'styled-components';
import background from './bg.jpg';


const Container = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
`;

const Bg = styled.img`
object-fit: cover;
position: fixed;
width: 100%;
height: 100%;
overflow: hiddden;
`;

const Home = (props) => {
    const [results, setResults] = useState([])

    const updateData = (value) => {
        setResults(value)
        this.setData();
    }

    const setData = () => {
        props.setResults(results)
    }

    return(
        <>
        <Container>
            <Bg src={background} alt='background' />
        </Container>
        
        </>
    )

}


export default Home;