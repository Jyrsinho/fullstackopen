import {useState} from "react";

export function Togglable(props) {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display : visible ? 'none' : ''};
    const showWhenVisible = {display : visible ? '' : 'none'};

    const toggleVisible = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>create a blog</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable;