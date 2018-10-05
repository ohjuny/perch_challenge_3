import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Labs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labs: [],
        }
    }

    componentDidMount(){
        axios.get('https://perchresearch.com:3000/api/challenge_project_data')
        .then(response => response.data.result.map(lab => ({
                id: `${lab.id}`,
                title: `${lab.title}`,
                description: `${lab.description}`,
                duties: `${lab.duties}`,
                time_commitment: `${lab.time_commitment}`,
                classification: `${lab.classification}`,
            })))
        .then(newLab => this.setState({labs: newLab}))
        .catch(error => alert(error))
    }
    
    render() {
        return (
            <div>
                { this.state.labs.map(lab =>
                    <div key={lab.id} className="card card-width">
                        <div className="card-body">
                            <Link to={{ pathname: `/lab/${lab.id}`, state: { labs: this.state.labs } }}>
                                <h5 className="card-title center">{lab.id}  {lab.title}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-muted center">{lab.classification}</h6>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const Lab = (props) => {
    const labs = props.location.state.labs
    const labID = props.match.params.id
    var exists = false;
    var i;
    for (i = 0; i < labs.length; ++i) {
        if (labs[i].id === labID) {
            var lab = labs[i];
            exists = true;
            break;
        }
    }
    
    if (exists) {
        return (
            <div>
                <div className="card card-width">
                    <div className="card-body">
                        <h5 className="card-title center">{lab.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted center">{lab.classification}</h6>
                        <p className="card-text">{lab.description}</p>
                        <p className="card-text">{lab.duties}</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Time commitment: {lab.time_commitment} hours</li>
                        </ul>
                    </div>
                </div>
                <br></br>
                <Link to='/'>Go Back</Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Lab was not found.</h1>
                <br></br>
                <Link to='/'>Go Back</Link>
            </div>
        )
    }
    
}

const NotFound = () => (
    <h1>Page Not Found</h1>
)

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Labs} />
            <Route path="/lab/:id" component={Lab} />
            <Route path='*' component={NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);