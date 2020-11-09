import React, {Component, useState} from 'react';
import styled from 'styled-components';
import Results from './Results';
import Home from './Home';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Searcher from './Searcher';

const ContainerSearch = styled.div`
position: absolute;
display: flex;
flex-direction: column;
width: 70%;
top: 30%;
left: 15%;
`;

const Heading = styled.h1`
color: #fff;
font-size: 40px;
`;

const HeadingTwo = styled.h1`
color: #000;
font-size: 40px;
`;

const Text = styled.p`
color: #fff;
font-size: 15px;
`;

const ContainerSearchTwo = styled.div`
width: 70%;
margin: auto;
padding-top: 20px;
`;


class SearcherApp extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            result: [],
            search: false
        }
    }

    setSearchState = (action) => {
        this.setState(prevState => {
            return({
                search: action
            });
        });
    }

    setResults = (value) => {
        this.setState({result: value})
    }

    setQuery = (value) => {
        this.setState({query: value})
    }

    render() {
        let start = this.state.search;


        return (
            <Router>
                <div>
                    
                    {!start && 
                        <>
                        <Home/>
                        <ContainerSearch>
                            <Heading>Photo Searcher</Heading>
                            <Text>The internet’s source of freely-usable images.
                                Powered by creators everywhere.
                            </Text>
                            <Searcher searchStatus={this.setSearchState} updateData={this.setResults}
                            updateValue={this.setQuery}/>
                        </ContainerSearch>
                        </>
                    }

                    {start &&
                    <ContainerSearchTwo>
                        <Searcher searchStatus={this.setSearchState} updateData={this.setResults}
                        updateValue={this.setQuery} inputValue={this.state.query}/>
                        <HeadingTwo>{this.state.query}</HeadingTwo>
                    </ContainerSearchTwo>
                    }
                </div>

                    <Switch>
                        <Route exact path="/home">

                            {start ? <Redirect to='/results' /> : <Home setSearch = {this.setSearchState} setResults={this.setResults}/> }

                        </Route>
                        
                        <Route path='/results'>

                            <Results allData={this.state.result} searchState={this.state.search}/>

                        </Route>

                    </Switch>
                
            
            </Router>
        )
    }
}

export default SearcherApp;