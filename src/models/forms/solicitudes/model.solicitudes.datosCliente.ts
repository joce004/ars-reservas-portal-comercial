import { ServiceRequestClientIdentificationType, ServiceRequestModel } from 'src/api';
import {
  IFormGenerator,
  IFieldSpecification,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';
import { TipoClienteIdentificacion } from 'src/enums/Dictionary.enum';
import { getSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

export type ClientData = Nullable<{
  identificationType: ServiceRequestClientIdentificationType;
  identification: string;
  birthDate: string;
  firstName: string;
  firstLastName: string;
  secondName: string;
  secondLastName: string;
  eMail: string;
}>;

export type ClientDataForm = {
  [Key in keyof ClientData]: IFieldSpecification;
};

export const initRequestClientData = (model?: ServiceRequestModel) => {
  const datosCliente: ClientData = {
    identificationType: model?.clientIdentification?.type ?? null,
    identification: model?.clientIdentification?.value ?? null,
    birthDate: null,
    firstName: model?.client?.firstName ?? null,
    firstLastName: model?.client?.firstLastName ?? null,
    secondName: model?.client?.secondLastName ?? null,
    secondLastName: model?.client?.secondLastName ?? null,
    eMail:
      model?.clientContactInfo?.find((x) => x.type == 'Email')?.value ?? null,
  };
  return datosCliente;
};

export const initRequestClientDataForm: IFormGenerator<ClientDataForm> = () => {
  const datosClienteForm: ClientDataForm = {
    identificationType: {
      label: 'Tipo de Identificación',
      GetType: 'select',
      options: getSelectList(TipoClienteIdentificacion),
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    identification: {
      label: 'Identificación',
      GetType: 'personal-id',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    birthDate: {
      label: 'Fecha Nacimiento',
      GetType: 'date-picker',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    firstName: {
      label: 'Primer Nombre',
      GetType: 'input',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    secondName: {
      label: 'Segundo Nombre',
      GetType: 'input',
      section: 'Datos del Cliente',
    },
    firstLastName: {
      label: 'Primer Apellido',
      GetType: 'input',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    secondLastName: {
      label: 'Segundo Apellido',
      GetType: 'input',
      section: 'Datos del Cliente',
    },
    eMail: {
      label: 'Correo Electrónico',
      GetType: 'email',
      section: 'Datos del Cliente',
    },
  };
  return { form: datosClienteForm, sections: ['Datos del Cliente'] };
};

export const initRequestBusinessDataForm: IFormGenerator<Partial<ClientDataForm>> = () => {
  const datosClienteForm: IFormSpecification<Partial<ClientDataForm>> = {
    identificationType: {
      label: 'Tipo de Identificación',
      GetType: 'select',
      options: getSelectList(TipoClienteIdentificacion),
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    identification: {
      label: 'Identificación',
      GetType: 'business-id',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    firstName: {
      label: 'Intermediario',
      GetType: 'input',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    firstLastName: {
      label: 'Persona de Contacto',
      GetType: 'input',
      rules: [validators.Required],
      section: 'Datos del Cliente',
    },
    eMail: {
      label: 'Correo Electrónico',
      GetType: 'email',
      section: 'Datos del Cliente',
    },
  };
  return { form: datosClienteForm, sections: ['Datos del Cliente'] };
};
