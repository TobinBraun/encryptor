import './Input.css';

function Input(props) {
    return (
        <div className='column'>
            <label htmlFor="publicKey">{props.label}</label>
            <br/>
            <input
                id="publicKey" 
                type={props.type ?? "number"}
                value={props.value ?? ''} 
                onChange={e => props.onChange && props.onChange(e.target.value)}
            ></input>
        </div>
    )
}

export default Input;