import React from 'react';

import Button from 'react-bootstrap/Button';

function TodoItem(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            {props.completed ? <td><Button variant="success">Completed</Button></td> : <td><Button variant="danger">Uncompleted</Button></td>}
        </tr>
    );
}

export default TodoItem;