import React from 'react'
import axios from 'axios'
import { API } from '../constants/config'

const DeleteToDo = ({id, updateCollection}) => {

    const deleteCollection = () => {
        axios.post(`${API}/api/todo/delete`, {
            "todo_id": id
        }).then((response) => {
            if (response.data) {
                document.getElementById(domID).close()
                updateCollection()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const RandomIdGenerator = () => {
        let ids = 'id_';
        let random = Math.random().toString(36).substr(2, 9);
        ids += random;
        if (document.getElementById(ids)) {
            ids = RandomIdGenerator();
        }
        return ids;
    }

    const domID = RandomIdGenerator();

    return (
        <>
            <button className="btn btn-sm btn-error" onClick={() => document.getElementById(domID).showModal()}>Delete</button>
            <dialog id={domID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Record</h3>
                    <p className="py-4">Are you sure you want to delete the collection record {id}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-success" onClick={() => deleteCollection()}>Delete</button>
                            &nbsp;
                            &nbsp;
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteToDo