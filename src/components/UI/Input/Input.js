import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let label = null
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    let validationError = null
    if (props.label) {
      label = <label className={classes.Label}>{props.label}</label>
    }
    // esta lógica ajustará el estilo cuando el input sea inválido
    // if (props.invalid && props.shouldValidate && props.touched) {
    //     inputClasses.push(classes.Invalid)
    //     // aquí habría que tunear a partir del state
    //     validationError = (<p className={classes.InvalidMessage}>Please add a valid value!</p>)
    // }

    switch (props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                 className={inputClasses.join(' ')}
                 {...props.elementConfig}
                 value={props.value}
                 onChange={props.changed} />
            break
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props}
                value={props.value}
                onChange={props.changed} />
            break
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>)
            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props}
                value={props.value}
                onChange={props.changed} />
    }


    return (
        <div className={classes.Input}>
            {label}
            {inputElement}
            {validationError}
        </div>
    )
}

export default input
