export const checkValidity = (value, rules, additional=false) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isAlphaNumeric) {
        const pattern = /^[0-9a-zA-Z]+$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.minNumValue) {
        isValid = value >=  rules.minNumValue && isValid
    }

    if (rules.maxNumValue) {
        isValid = value <=  rules.maxNumValue && isValid
    }

    if (rules.isDecimal) {
        const pattern = /^[0-9]+([.,][0-9]{1,2})?$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isDecimalExact) {
        const pattern = /^[0-9]+([.,][0-9]{1,4})?$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.pairedWith) {
      isValid = additional || value
    }

    if (rules.todayOrOlder) {
      const someDate = new Date(value).toString() !== 'Invalid Date' ? new Date(value) : null
      if (someDate){
        const today = new Date();
        today.setHours(0,0,0,0)
        isValid = someDate <= today
      } else {
        isValid = false
      }
    }

    return isValid;
}
