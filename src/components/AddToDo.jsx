import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { API } from "../constants/config"
import { useEffect, useState } from "react"

const AddToDo = ({state, updateState}) => {
    const [currentState, setCurrentState] = useState("")
    const schema = yup.object().shape({
        title: yup.string().min(8).required("Title is required"),
        description: yup.string().min(8).required("Descriptioon is required")
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        setCurrentState(
            <div className="fixed top-0 left-0 w-full h-full bg-base-100 bg-opacity-50 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
        axios.post(`${API}/api/todo/add`, {
            "todo_title": data.title,
            "todo_description": data.description,
            "user_id": JSON.parse(sessionStorage.getItem("user")).id
        }).then((response) => {
            if (response.data) {
                setCurrentState()
                document.getElementById('addToDo').close()
                updateState()
            }
        }).catch((error) => {
            if (error.response) {
                setCurrentState(
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{error.response.data.message}</span>
                    </div>
                )
            }
        })
    }

    return (
        <dialog id="addToDo" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Add ToDo</h3>
                <br />
                {currentState}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" placeholder="Title" className="input input-bordered" {...register("title")} />
                    <p className="text-error">{errors.title?.message}</p>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea placeholder="Description" className="textarea textarea-bordered" {...register("description")} />
                    <p className="text-error">{errors.description?.message}</p>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add</button>
                        &nbsp;
                        &nbsp;
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddToDo