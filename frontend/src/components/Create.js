// Create.js

import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.onChangeSupportType = this.onChangeSupportType.bind(this);
        this.onChangeService = this.onChangeService.bind(this);
        this.onChangeRequestor = this.onChangeRequestor.bind(this);
        this.onChangeShortDesc = this.onChangeShortDesc.bind(this);
        this.onChangeEETech = this.onChangeEETech.bind(this);
        this.onChangeOnHold = this.onChangeOnHold.bind(this);
        this.onChangeRejected = this.onChangeRejected.bind(this);
        this.onChangeDone = this.onChangeDone.bind(this);
        this.onChangeEENotes = this.onChangeEENotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            support_type: '',
            service: '',
            requestor: '',
            short_description: '',
            ee_tech: '',
            on_hold: '',
            rejected: '',
            done: '',
            ee_notes: ''
        }
    }


    onChangeSupportType(e) {
        this.setState({
            support_type: e.target.value
        });
    }
    onChangeService(e) {
        this.setState({
            service: e.target.value
        });
    }

    onChangeRequestor(e) {
        this.setState({
            requestor: e.target.value
        });
    }
    onChangeShortDesc(e) {
        this.setState({
            short_description: e.target.value
        });
    }
    onChangeEETech(e) {
        this.setState({
            ee_tech: e.target.value
        });
    }
    onChangeOnHold(e) {
        this.setState({
            on_hold: e.target.value
        });
    }
    onChangeRejected(e) {
        this.setState({
            rejected: e.target.value
        });
    }
    onChangeDone(e) {
        this.setState({
            done: e.target.value
        });
    }
    onChangeEENotes(e) {
        this.setState({
            ee_notes: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const design_rec = {
            support_type: this.state.support_type,
            service: this.state.service,
            requestor: this.state.requestor,
            short_description: this.state.short_description,
            ee_tech: this.state.ee_tech,
            on_hold: this.state.on_hold,
            rejected: this.state.rejected,
            done: this.state.done,
            ee_notes: this.state.ee_notes
        }
        let token = cookie.load('token');
        axios.post('http://localhost:3200/design', design_rec, { headers: {"Authorization" : `${token}`} })
        .then(res => console.log(res.data));
        
        this.setState({
            support_type: '',
            service: '',
            requestor: '',
            short_description: '',
            ee_tech: '',
            on_hold: '',
            rejected: '',
            done: '',
            ee_notes: ''
        });
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Add New Design Record</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Support Type:  </label>
                        <input type="text" className="form-control" value={this.state.support_type}  onChange={this.onChangeSupportType}/>
                    </div>
                    <div className="form-group">
                        <label>Service: </label>
                        <input type="text" className="form-control" value={this.state.service}  onChange={this.onChangeService}/>
                    </div>
                    <div className="form-group">
                        <label>Requestor: </label>
                        <input type="text" className="form-control" value={this.state.requestor}  onChange={this.onChangeRequestor}/>
                    </div>
                    <div className="form-group">
                        <label>Short Description: </label>
                        <input type="text" className="form-control" value={this.state.short_description}  onChange={this.onChangeShortDesc}/>
                    </div>
                    <div className="form-group">
                        <label>EE Tech: </label>
                        <input type="text" className="form-control" value={this.state.ee_tech}  onChange={this.onChangeEETech}/>
                    </div>
                    <div className="form-group">
                        <label>On Hold: </label>
                        <input type="text" className="form-control" value={this.state.on_hold}  onChange={this.onChangeOnHold}/>
                    </div>
                    <div className="form-group">
                        <label>Rejected: </label>
                        <input type="text" className="form-control" value={this.state.rejected}  onChange={this.onChangeRejected}/>
                    </div>
                    <div className="form-group">
                        <label>Done: </label>
                        <input type="text" className="form-control" value={this.state.done}  onChange={this.onChangeDone}/>
                    </div>
                    <div className="form-group">
                        <label>EE Notes: </label>
                        <input type="text" className="form-control" value={this.state.ee_notes}  onChange={this.onChangeEENotes}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Design Record" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}


