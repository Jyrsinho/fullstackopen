import {useState, useImperativeHandle} from "react";

export function Togglable(props) {
    console.log('Togglable', props);
    console.log('Togglable ref', props.ref)
    
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display : visible ? 'none' : ''};
    const showWhenVisible = {display : visible ? '' : 'none'};

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonlabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable;