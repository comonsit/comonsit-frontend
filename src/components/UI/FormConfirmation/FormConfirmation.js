import React from 'react'
import { FormattedMessage } from 'react-intl';
import classes from './FormConfirmation.module.css'
import Button from '../Button/Button'
import Input from '../Input/Input'


const formConfirmation = props => {
  const data = props.formOrder.map(id => {
    return (
      (<div
        key= {id}
        >
        <div className={classes.Inputs}>
          <Input
            label={props.formData[id].label}
            key= {id}
            elementType={props.formData[id].elementType }
            elementConfig={props.formData[id].elementConfig }
            value={props.formData[id].value}
            shouldValidate={false}
            invalid={false}
            touched={false}
            disabled={true}
            hide={false}
            changed={() => {}}
            supportData={props.formData[id].supportData}
            />
        </div>
      </div>)
    )
  })

  return (
    <div className={classes.Container}>
      <h3><FormattedMessage id='confirmacionInfo'/></h3>
      {props.children}
      <div className={classes.data}>
        {data}
      </div>
      <div
        className={classes.ButtonsGroup}
        >
        <Button
          clicked={props.onSubmitAction}
          btnType="Success"
          >
          <FormattedMessage id='enviar'/>
        </Button>
        <Button
          clicked={props.onCancelAction}
          >
          <FormattedMessage id='cancelButton'/>
        </Button>
      </div>
    </div>
  )
}

export default formConfirmation
