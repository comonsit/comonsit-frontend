import * as actionTypes from './actionTypes'

export const onChangeLocale = (lang) => {
  return {
    type: actionTypes.CHANGE_LOCALE,
    selectedLanguage: lang,
  }
}
