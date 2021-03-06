export const checkValidity = (originalValue, rules, withMessage=false) => {
    let isValid = true;
    let message = ""
    let pattern
    const value = originalValue.trim()
    if (!rules) {
        return true;
    }

    if (rules.minLength) {
      if (value.length < rules.minLength ) {
        isValid &= false
        message += ` -> Deben ser al menos ${rules.minLength} caracteres `
      }
    }

    if (rules.maxLength) {
      if (value.length > rules.maxLength ) {
        isValid &= false
        message += ` -> Deben ser máximo ${rules.maxLength} caracteres `
      }
    }

    if (rules.isEmail) {
        pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value) ) {
          isValid &= false
          message += ` -> No es un formato de mail correcto `
        }
    }

    if (rules.isNumeric) {
        pattern = /^\d+$/;
        if (!pattern.test(value) ) {
          isValid &= false
          message += ` -> Debe ser un número entero `
        }
    }

    if (rules.isAlphaNumeric) {
        pattern = /^[0-9a-zA-Z]+$/;
        if (!pattern.test(value) ) {
          isValid &= false
          message += ` -> Sólo pueden ser números o letras `
        }
    }

    if (rules.minNumValue) {
      if (+value < rules.minNumValue ) {
        isValid &= false
        message += ` -> el número debe ser mayor a ${rules.minNumValue} `
      }
    }

    if (rules.maxNumValue) {
      if (+value > rules.maxNumValue ) {
        isValid &= false
        message += ` -> el número debe ser menor a ${rules.maxNumValue} `
      }
    }

    if (rules.isDecimal) {
        pattern = /^[0-9]+([.][0-9][0-9]?)?$/g;   //  /^[0-9]+([.,][0-9]{1,2})?$/;
        if (!pattern.test(value) ) {
          isValid &= false
          message += ` -> Debe ser un número con máximo 2 decimales `
        }
    }

    if (rules.isDecimalExact) {
        // pattern =  /^[0-9]+([,.][0-9])?$/g;
        pattern = /^[0-9]+([.][0-9]{1,4})?$/g;
        if (!pattern.test(value) ) {
          isValid &= false
          message += ` -> Debe ser un número con máximo 4 decimales `
        }
    }

    // if (rules.pairedWith) {
    //   isValid = additional || value
    // }

    if (rules.todayOrOlder) {
      const someDate = new Date(value).toString() !== 'Invalid Date' ? new Date(value) : null
      if (someDate){
        const today = new Date();
        today.setHours(0,0,0,0)
        if (someDate > today) {
          isValid &= false
          message += ` -> La fecha debe ser hoy o anterior a hoy `
        }
      } else if(value) {
        isValid &= false
        message += ` -> Fecha inválida `
      }
    }

    if (rules.required) {
      if (value === '' ) {
        isValid &= false
        message = (rules.isDecimalExact || rules.isDecimal || rules.isNumeric)
          ? `-> Se requiere un número ${value} `
          : `-> Campo requerido ${value} `
      }
    }

    if (withMessage) {
      return {valid: isValid, errorMessage: message}
    }
    return isValid;
}
