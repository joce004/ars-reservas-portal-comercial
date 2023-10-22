import { IFormGenerator, IFormSpecification } from 'src/models/schemas/IFormSpecification';

export type CancelacionContrato = Nullable<{
  Ramo: string;
  Secuencial: string;
  _File_Comunicacion: File;
}>;

export const initCancelacionContrato = (model?: string) => {
  if (model) {
    const data: CancelacionContrato = JSON.parse(model);

    const cancelacionContrato: CancelacionContrato = {
      Ramo: data.Ramo,
      Secuencial: data.Secuencial,
      _File_Comunicacion: data._File_Comunicacion,
    };
    return cancelacionContrato;
  } else {
    const cancelacionContrato: CancelacionContrato = {
      Ramo: '',
      Secuencial: '',
      _File_Comunicacion: null,
    };
    return cancelacionContrato;
  }
};

export const initCancelacionContratoForm: IFormGenerator<CancelacionContrato> = () => {
  const cancelacionContratoForm: IFormSpecification<CancelacionContrato> = {
    Ramo: {
      label: 'Ramo',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    Secuencial: {
      label: 'Secuencial',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    _File_Comunicacion: {
      label: 'Comunicación del Cliente o Intermediario',
      GetType: 'file-picker',
      section: 'Documentos'
    },
  };
  return {
    form: cancelacionContratoForm,
    sections: ['Datos de la Solicitud', 'Documentos'],
    files: true,
  };
};
