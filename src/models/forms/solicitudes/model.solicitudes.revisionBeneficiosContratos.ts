import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type RevisionBeneficiosContratos = Nullable<{
  Ramo: string;
  Secuencial: string;
}>;

export const initRevisionBeneficiosContratos = (model?: string) => {
  if (model) {
    const data: RevisionBeneficiosContratos = JSON.parse(model);

    const localizacionCarnet: RevisionBeneficiosContratos = {
      Ramo: data.Ramo,
      Secuencial: data.Secuencial,
    };
    return localizacionCarnet;
  } else {
    const localizacionCarnet: RevisionBeneficiosContratos = {
      Ramo: '',
      Secuencial: '',
    };
    return localizacionCarnet;
  }
};

export const initRevisionBeneficiosContratosForm: IFormGenerator<
RevisionBeneficiosContratos
> = () => {
  const revisionBeneficiosContratosForm: IFormSpecification<RevisionBeneficiosContratos> = {
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
  };
  return {
    form: revisionBeneficiosContratosForm,
    sections: ['Datos de la Solicitud'],
    files: false,
  };
};
