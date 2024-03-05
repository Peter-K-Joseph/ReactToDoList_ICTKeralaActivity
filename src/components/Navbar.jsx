import AddToDo from "./AddToDo"
import Settings from "./Settings"

const sessionLogout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    window.location.href = "/"
}

const Navbar = ({state, updateState}) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">ToDo ListApp</a>
            </div>
            <div className="flex-none">
                <button className="btn btn-ghost btn-circle avatar" onClick={() => document.getElementById('addToDo').showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a>
                                <p className="ml-3">Welcome back, {JSON.parse(sessionStorage.getItem("user"))["username"]}</p>
                            </a>
                        </li>
                        <li className="divider" />
                        <li className="menu-title">
                            <a>
                                <p className="ml-3">Actions</p>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => document.getElementById('my_modal_5').showModal()}>
                                <p className="ml-3">Settings</p>
                            </a>
                        </li>
                        <li>
                            <a onClick={sessionLogout}>
                                <p className="ml-3">Logout</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Settings />
            <AddToDo updateState={updateState} state={state} />
        </div>
    )
}

export default Navbar