import React from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import ListView from './ListView'

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

    handleClick = () => {
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

    componentWillMount() {
        fetch(`${API_URL}/todo-tasks/.json`)
            .then(response => response.json())
            .then(data => {
                const array = Object.entries(data)
                const tasksList = array.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ tasks: tasksList })
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
                <div>
                    {this.state.tasks.map((task) => (
                        <div
                            key={task.id}
                        >
                            {task.taskName}
                        </div>
                    ))}
                </div>
                <div>
                    <ListView>

                    </ListView>
                </div>
            </Paper>
        )
    }
}

export default ToDoApp