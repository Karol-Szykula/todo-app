import React from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    margin: 20,
    textAlign: 'center',
}

class ToDoApp extends React.Component {

    state = {
        tasks: [{ taskName: 'Odkurzando', completed: false },
        { taskName: 'Nakarmić kota', completed: false }
        ],
        taskName: ''
    }

    handleChange = (event) => {
        this.setState({ taskName: event.target.value })
    }

    handleClick = () => {
        let tasks = this.state.tasks
        tasks.push({ taskName: this.state.taskName, completed: false })
        this.setState({ tasks }) //{ tasks: tasks }
    }

    render() {
        return (
            <Paper
                style={style}
            >
                <div>

                    <TextField
                        hintText="Ente your task here"
                        fullWidth={true}
                        onChange={this.handleChange}
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
                    {this.state.tasks.map((task, index) => (
                        <div>{task.taskName}</div>
                    ))}
                </div>
            </Paper>
        )
    }
}

export default ToDoApp