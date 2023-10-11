import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type CambioVigenciaContrato = Nullable<{
  TipoServicio: string;
  Ramo: string;
  Secuencial: string;
  _File_Comunicacion: File;
}>;

export const initCambioVigenciaContrato = (model?: string) => {
  if (model) {
    const data: CambioVigenciaContrato = JSON.parse(model);

    const cambioVigenciaContrato: CambioVigenciaContrato = {
      TipoServicio: data.TipoServicio,
      Ramo: data.Ramo,
      Secuencial: data.Secuencial,
      _File_Comunicacion: data._File_Comunicacion,
    };
    return cambioVigenciaContrato;
  } else {
    const cambioVigenciaContrato: CambioVigenciaContrato = {
      TipoServicio: '',
      Ramo: '',
      Secuencial: '',
      _File_Comunicacion: null,
    };
    return cambioVigenciaContrato;
  }
};

export const initCambioVigenciaContratoForm: IFormGenerator<CambioVigenciaContrato> = () => {
  const cambioVigenciaContratoForm: IFormSpecification<CambioVigenciaContrato>  = {
    TipoServicio: {
      label: 'Tipo de Servicio',
      GetType: 'select',
      options: [
        { value: 'Cambio Vigencia Contrato', text: 'Cambio Vigencia Contrato' },
        {
          value: 'Cambio Frecuencia de Pago',
          text: 'Cambio Frecuencia de Pago',
        },
      ],
      section: 'Datos de la Solicitud',
    },
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
    },
  };
  return {
    form: cambioVigenciaContratoForm,
    sections: ['Datos de la Solicitud'],
    files: true,
  };
};
