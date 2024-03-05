import { useState } from "react"
import CurrentToDo from "../components/CurrentToDo"
import Navbar from "../components/Navbar"

const Dashboard = () => {
    const [state, updateState] = useState(false)

    if (sessionStorage.getItem("user") === null) {
        window.location.href = "/"
    }

    const refreshState = () => {
        updateState(!state)
    }
    
    return (
        <div>
            <Navbar updateState={updateState} state={state} />
            <CurrentToDo state={state} updateState={refreshState} />
        </div>
    )
}

export default Dashboard