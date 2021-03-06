import React, {Component} from 'react';
import Results from './Results';
import Searcher from './Searcher';
import './SearcherApp.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



class SearcherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                            <h1 className={className}>Photo Searcher</h1>
                            <p className={className} style={{fontSize: "15px"}}>Project made with Unsplash API
                            </p>
                            <Searcher
                            updateData={this.setData}
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