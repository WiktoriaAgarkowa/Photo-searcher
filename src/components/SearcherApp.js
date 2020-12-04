import React, {Component} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import styled from 'styled-components';
import Results from './Results';
import Searcher from './Searcher';
import './SearcherApp.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



const unsplash = new Unsplash({
    accessKey:'UE8mvlx_kxyz0FC7DWfOD9lJTdT6qUdG0PicnuM_rqc',
})


const Heading = styled.h1`
color: #f08080;
font-size: 40px;
`;


const Text = styled.p`
color: #f08080;
font-size: 15px;
`;


class SearcherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            result: [],
            search: false,
            referrer: null,
        }
    }

    setStatus = (action) => {
        this.setState(prevState => {
          return({
            search: action
          }); 
        });
    }

  
    setData = (data) => {
        this.setState(prevState => {
          return({
            result: data
          }); 
        });
    }

    setQuery = (value) => {
        this.setState({query: value})
    }

    render() {
        let start = this.state.search;
        let className = 'heading';
        let searcher = 'searcher'
        if (start) {
            className += ' hidding';
            searcher += ' start'
        }

        return (
            <Router>
                <div>
                    <div className="container">
                    <div className="decor one"></div>
                    <div className="decor two"></div>
                    </div>
                    <Link className="logo" onClick={() => {this.setStatus(false)}} to='/'>Inspirator |</Link>
                    <>
                        <div className = {searcher}>
                            <Heading className={className}>Photo Searcher</Heading>
                            <Text className={className}>Project made with Unsplash API
                            </Text>
                            <Searcher
                            updateData={this.setData}
                            updateValue={this.setQuery}
                            updateStatus = {this.setStatus}
                            searchStatus = {this.state.search}/>
                        </div>
                    </>

                </div>

                    <Switch>
                        
                        <Route path='/results' >

                            <Results allData={this.state.result} searchState={this.state.search}/>

                        </Route>

                    </Switch>
                
            
            </Router>
        )
    }
}

export default SearcherApp;