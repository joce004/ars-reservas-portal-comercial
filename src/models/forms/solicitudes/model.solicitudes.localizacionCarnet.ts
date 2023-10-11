import {
  IFormGenerator,
  IFieldSpecification,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';

export type LocalizacionCarnet = Nullable<{
  PuntoEntrega: string;
  FormaEntrega: string;
}>;

export type LocalizacionCarnetForm = {
  [Key in keyof LocalizacionCarnet]: IFieldSpecification;
};

export const initLocalizacionCarnet = (model?: string) => {
  if (model) {
    const data: LocalizacionCarnet = JSON.parse(model);

    const localizacionCarnet: LocalizacionCarnet = {
      PuntoEntrega: data.PuntoEntrega,
      FormaEntrega: data.FormaEntrega,
    };
    return localizacionCarnet;
  } else {
    const localizacionCarnet: LocalizacionCarnet = {
      PuntoEntrega: '',
      FormaEntrega: '',
    };
    return localizacionCarnet;
  }
};

export const initLocalizacionCarnetForm: IFormGenerator<
LocalizacionCarnet
> = () => {
  const localizacionCarnetForm: IFormSpecification<LocalizacionCarnet> = {
    PuntoEntrega: {
      label: 'Tipo de Servicio',
      GetType: 'select',
      options: [
        { value: 'Servicios generales', text: 'Servicios generales' },
        { value: 'Negocios o Plataforma', text: 'Negocios o Plataforma' },
      ],
      section: 'Datos de la Solicitud',
    },
    FormaEntrega: {
      label: 'Ramo',
      GetType: 'select',
      options: [
        {
          value: 'Cliente pasará a recogerlo',
          text: 'Cliente pasará a recogerlo',
        },
        { value: 'Envío por mensajería', text: 'Envío por mensajería' },
      ],
      section: 'Datos de la Solicitud',
    },
  };
  return {
    form: localizacionCarnetForm,
    sections: ['Datos de la Solicitud'],
    files: false,
  };
};
