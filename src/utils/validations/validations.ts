
import { getAppConfig } from '../aplication-config';
export const Required = (val: string | number | undefined) =>
  (val && String(val).length > 0) || 'Es requerido.';

export const maxAge = (val: string | number | undefined) => {
  if(val){
    const dateToEvaluate = new Date(val)
    const maxAge = getAppConfig().maxAgeForQuote


    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < dateToEvaluate.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == dateToEvaluate.getMonth()) && today.getDate() < dateToEvaluate.getDate()) {
        thisYear = 1;
    }
    const age = today.getFullYear() - dateToEvaluate.getFullYear() - thisYear;


    if(maxAge){
      console.log(age);
      return (age < maxAge ) || `La edad del beneficiario no puede ser mayor a ${maxAge}`;
    }
    return true
  }
  return 'Es requerido.'
}

export const email = (val: string | number | undefined) =>
  (!val || !!(`${val}`?.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi))) || 'El correo no es valido.'

