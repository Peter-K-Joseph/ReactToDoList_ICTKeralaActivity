import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { API } from "../constants/config"
import { useState } from "react"

const LoginPage = () => {
    const [currentState, setCurrentState] = useState("")
    const schema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().min(8).required("Password is required")
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
        axios.post(`${API}/api/auth/signin`, data).then((response) => {
            if (response.data) {
                sessionStorage.setItem("token", response.data.accessToken)
                sessionStorage.setItem("user", JSON.stringify(response.data))
                setCurrentState(
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Logged in.. Redirecting in 2 seconds</span>
                    </div>
                )
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 2000)
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
        <div className="flex justify-center items-center">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left m-9">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsum exercitationem corporis adipisci eos, sed cum, modi laboriosam similique quibusdam quisquam doloribus aliquid aperiam harum ratione? Omnis mollitia error officiis.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            {currentState}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                                <p className="text-red-500 text-xs">{errors.email?.message}</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
                                <p className="text-red-500 text-xs">{errors.password?.message}</p>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
