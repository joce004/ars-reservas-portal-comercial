import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type Reembolso = Nullable<{
  TipoServicio: string;
  FechaReembolso: string;
  NumeroCuenta: string;
  TipoCuenta: string;
  Banco: string;
  MontoReclamado: string;
  CentroMedico: string;
}>;

export const initReembolso = (model?: string) => {
  if (model) {
    const data: Reembolso = JSON.parse(model);

    const reembolso: Reembolso = {
      TipoServicio: data.TipoServicio,
      FechaReembolso: data.FechaReembolso,
      NumeroCuenta: data.NumeroCuenta,
      TipoCuenta: data.TipoCuenta,
      Banco: data.Banco,
      MontoReclamado: data.MontoReclamado,
      CentroMedico: data.CentroMedico,
    };
    return reembolso;
  } else {
    const reembolso: Reembolso = {
      TipoServicio: '',
      FechaReembolso: '',
      NumeroCuenta: '',
      TipoCuenta: '',
      Banco: '',
      MontoReclamado: '',
      CentroMedico: '',
    };
    return reembolso;
  }
};

export const initReembolsoForm: IFormGenerator<Reembolso> = () => {
  const reembolsoForm: IFormSpecification<Reembolso> = {
    TipoServicio: {
      label: 'Tipo de Servicio',
      GetType: 'select',
      options: [
        { value: 'Emergencia', text: 'Emergencia' },
        { value: 'Estudio', text: 'Estudio' },
        { value: 'Internamiento', text: 'Internamiento' },
        { value: 'Laboratorio', text: 'Laboratorio' },
        { value: 'Medicamento', text: 'Medicamento' },
        { value: 'Vacuna', text: 'Vacuna' },
      ],
      section: 'Datos de la Solicitud',
    },
    FechaReembolso: {
      label: 'Fecha de Reembolso',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    NumeroCuenta: {
      label: 'Número de Cuenta',
      GetType: 'input',
    },
    TipoCuenta: {
      label: 'Tipo de Cuenta',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    Banco: {
      label: 'Banco',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    MontoReclamado: {
      label: 'Monto Reclamado',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
    CentroMedico: {
      label: 'Centro Médico',
      GetType: 'input',
      section: 'Datos de la Solicitud',
    },
  };
  return {
    form: reembolsoForm,
    sections: ['Datos de la Solicitud'],
    files: false,
  };
};
