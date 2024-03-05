import { useEffect } from "react";
import { themeChange } from "theme-change";


const Settings = () => {

    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset"
    ]

    useEffect(() => {
        themeChange(false)
    });

    const firstLetterToUpper = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Account and System Settings</h3>
                <br />
                <label className="cursor-pointer label">
                    <span className="label-text">System Theme</span>
                    <select className="select w-full max-w-xs" data-choose-theme>
                        {themes.map((theme) => {
                            return (
                                <option key={theme} value={theme}>{firstLetterToUpper(theme)}</option>
                            )
                        })
                        }
                    </select>
                </label>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Settings