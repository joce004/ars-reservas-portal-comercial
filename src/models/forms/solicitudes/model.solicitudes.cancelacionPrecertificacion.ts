import {
  IFormGenerator,
  IFieldSpecification,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';

export type CancelacionPrecertificacion = Nullable<{
  Year: string;
  Ramo: string;
}>;

export type CancelacionPrecertificacionForm = {
  [Key in keyof CancelacionPrecertificacion]: IFieldSpecification;
};

export const initCancelacionPrecertificacion = (model?: string) => {
  if (model) {
    const data: CancelacionPrecertificacion = JSON.parse(model);

    const cancelacionPrecertificacion: CancelacionPrecertificacion = {
      Year: data.Year,
      Ramo: data.Ramo,
    };
    return cancelacionPrecertificacion;
  } else {
    const cancelacionPrecertificacion: CancelacionPrecertificacion = {
      Year: '',
      Ramo: '',
    };
    return cancelacionPrecertificacion;
  }
};

export const initCancelacionPrecertificacionForm: IFormGenerator<
  CancelacionPrecertificacion
> = () => {
  const cancelacionPrecertificacionForm: IFormSpecification<CancelacionPrecertificacion> =
    {
      Year: {
        label: 'Año',
        GetType: 'input',
        section: 'Datos de la Solicitud',
      },
      Ramo: {
        label: 'Ramo',
        GetType: 'input',
        section: 'Datos de la Solicitud',
      },
    };
  return {
    form: cancelacionPrecertificacionForm,
    sections: ['Datos de la Solicitud'],
    files: false,
  };
};
