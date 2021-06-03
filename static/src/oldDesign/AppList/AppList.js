import React, {Component} from 'react';

import CheckBox from '../CheckBox/CheckBox';
import {AppConfig} from "../../config";
import {getUserEmail} from "../../utils/AuthService";


class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        };
        this.handleCallback = this.handleCallback.bind(this);
    }

    refreshPage() {
        window.location.reload();
    }

    handleDeleteKey = (event) => {
        let key_to_delete = this.state.checked;
        let token = localStorage.getItem("access_token");
        key_to_delete.forEach((ele) => {
            fetch(AppConfig.avenueUrl + "/v4/delete_app", {
                method: 'post',
                body: JSON.stringify({"client_id": ele,
                                      "useremail": getUserEmail()}),
                headers: {'Content-Type': 'application/json',
                          'authorization': 'Bearer ' + token}
            })
            .then(res => res.json());
        });
        this.setState({checked: []});
        this.refreshPage();
    }

    handleCallback(client_id) {
        let new_checked = this.state.checked;

        if (new_checked.includes(client_id)) {
            new_checked = new_checked.filter(m => {
                return (m !== client_id);
            });
        } else {
            new_checked.push(client_id);
        }
        this.setState({checked: new_checked});
    }

    render () {
        const apps = this.props.apps.map((app) =>
            <CheckBox key={app.client_id} txt={app.client_id} handler={this.handleCallback}/>
        );

        return (
            <div className="client-key-list">
                <div><h4 className="description">Client Id List:</h4></div>
                {this.props.apps.length > 0 ? <ul>{apps}</ul> : <p>No Key</p>}
                {this.props.apps.length > 0 ? <button className="api-instruction-button"
                                                      onClick={this.handleDeleteKey}
                                                      disabled={this.state.checked.length === 0}>Delete Selected Client Id(s)
                                              </button> : null}
            </div>
        );
    }


}

export default AppList;
