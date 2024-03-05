import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../constants/config'
import UpdateToDo from './ModifyToDo'
import DeleteToDo from './DeleteToDo'

const CurrentToDo = ({state, updateState}) => {

    const [data, setData] = useState(
        <tr className="bg-base-200">
            <th colSpan={4}>Loading...</th>
        </tr>
    )

    useEffect(() => {
        setData(
            <tr className="bg-base-200">
                <th colSpan={4}>Loading...</th>
            </tr>
        )
        axios.post(`${API}/api/todo/find/user`, {
            "user_id": JSON.parse(sessionStorage.getItem("user")).id
        }).then((response) => {
            console.log(response.data)
            let arr = []
            response.data.map((todo, index) => {
                arr.push(
                    <tr key={todo.id}>
                        <td>{index+1}</td>
                        <td>{todo.todo_title}</td>
                        <td>{todo.todo_description}</td>
                        <td>
                            <UpdateToDo state={state} id={todo.id} updateState={updateState} />
                            &nbsp;
                            &nbsp;
                            <DeleteToDo id={todo.id} updateCollection={updateState} />
                        </td>
                    </tr>
                )
            })
            setData(arr)
        }).catch((error) => {
            console.log(error)
        })
    }, [state])

    return (
        <div className="overflow-x-auto ml-5">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        </div>
    )
}

export default CurrentToDo