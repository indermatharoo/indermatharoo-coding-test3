import React, { Component } from 'react';
import ls from 'local-storage'
import { List } from 'semantic-ui-react'

export default class Detail extends Component {

    constructor(props) {
        super(props)
        this.api_key = ls.get('api_key');
        this.state = {
            user:{}
        };
        this.getUser();
    }

    capitalize(str){
        if(str) {
            str = str.replace(/[-]/gi, ' ');
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }

    async getUser() {
        fetch(global.apiUrl+'user/'+this.api_key)
        .then(res => res.json())
        .then(data => {
            this.setState({
                user:data,
            })
        })
        .catch(function(error){
            console.log(error);
        })
        ;
    }

    render() {
        return (    
            <div>
                <List>
                    <List.Item>
                        <List.Content>
                            <List.Header>First Name:</List.Header>
                            <List.Description>
                            {this.capitalize(this.state.user.first_name)}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Last Name:</List.Header>
                            <List.Description>
                            {this.capitalize(this.state.user.last_name)}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Gender:</List.Header>
                            <List.Description>
                            {this.capitalize(this.state.user.gender)}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Age:</List.Header>
                            <List.Description>
                            {this.state.user.age}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Blood Group:</List.Header>
                            <List.Description>
                            {this.capitalize(this.state.user.blood_group)}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>Services:</List.Header>
                            <List.Description>
                            {this.capitalize(this.state.user.services)}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </div>
        );
    }    

}
  