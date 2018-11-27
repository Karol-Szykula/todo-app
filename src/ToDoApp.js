import React from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { IconButton } from 'material-ui';

const style = {
    margin: 20,
    textAlign: 'center',
}

const API_URL = 'https://test-backend-98861.firebaseio.com'

class ToDoApp extends React.Component {

    state = {
        tasks: [],
        taskName: ''
    }

    handleChange = (event) => {
        this.setState({ taskName: event.target.value })
    }

    onEnter = (e) => {
        if (e.keyCode === 13) {
            this.addTask()
        }
    }

    handleClick = () => {
        this.addTask()
    }

    addTask = () => {
        if (this.state.taskName !== '') {

            let tasks = this.state.tasks
            let newTask = { taskName: this.state.taskName, completed: false }

            fetch(`${API_URL}/todo-tasks/.json`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newTask)
            }).then(response => response.json())
                .then(data => {
                    newTask.id = data.name
                    tasks.push(newTask)
                    this.setState({ tasks, taskName: '' })
                })
                .catch(error => console.error('Error:', error));
        }
    }

    loadData() {
        fetch(`${API_URL}/todo-tasks/.json`)
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    this.setState({ tasks: [] })
                    return
                }
                const array = Object.entries(data)
                const tasksList = array.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ tasks: tasksList })
            })
    }

    componentWillMount() {
        this.loadData()
    }

    handleDelete = (id) => {
        fetch(`${API_URL}/todo-tasks/${id}.json`, {
            method: 'DELETE'
        })
            .then(() => {
                this.loadData()
            })
    }


    render() {
        return (
            <Paper
                style={style}
            >
                <div>
                    <TextField
                        hintText="Enter your task here"
                        fullWidth={true}
                        onChange={this.handleChange}
                        value={this.state.taskName}
                        onKeyDown={this.onEnter}
                    />
                </div>
                <div>
                    <RaisedButton
                        primary={true}
                        label={'Add task'}
                        fullWidth={true}
                        onClick={this.handleClick}
                    />
                </div>
                <List>
                    {this.state.tasks.map((task) => (
                        <ListItem
                            key={task.id}
                            primaryText={task.taskName}
                            leftCheckbox={
                                <Checkbox
                                    // onChange={}
                                />
                            }
                            rightIconButton={
                                <IconButton>
                                    <DeleteIcon
                                        onClick={() => this.handleDelete(task.id)}
                                    />
                                </IconButton>
                            }
                        />
                    ))}
                </List>
            </Paper>
        )
    }
}

export default ToDoApp