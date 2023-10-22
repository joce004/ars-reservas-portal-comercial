import { BusinessModel, ServiceRequestClientIdentificationType, ServiceRequestModel } from 'src/api';
import {
  IFormGenerator,
  IFieldSpecification,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';
import { TipoClienteIdentificacion } from 'src/enums/Dictionary.enum';
import { getSelectList, mapSelectList } from 'src/utils/array';
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
  businessOwnerId: number;
  responsibleUserId: string;
}>;

export type ClientDataForm = {
  [Key in keyof ClientData]?: IFieldSpecification;
};

export const initRequestClientData = (model?: ServiceRequestModel) => {
  const datosCliente: ClientData = {
    identificationType: model?.clientIdentification?.type ?? null,
    identification: model?.clientIdentification?.value ?? null,
    birthDate: model?.client?.birthDate?.substring(0, 10)?? null,
    firstName: model?.client?.firstName ?? null,
    firstLastName: model?.client?.firstLastName ?? null,
    secondName: model?.client?.secondLastName ?? null,
    secondLastName: model?.client?.secondLastName ?? null,
    eMail:
    model?.clientContactInfo?.find((x) => x.type == 'Email')?.value ?? null,
    businessOwnerId: model?.businessOwnerId ?? null,
    responsibleUserId: model?.responsibleUserId ?? null,
  };
  return datosCliente;
};

export const initRequestClientDataForm = ( {businessList, adminOrOficer}: {businessList?: BusinessModel[], adminOrOficer?: boolean} = {}) => {
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

  if (adminOrOficer) {
    datosClienteForm.businessOwnerId = {
      label: 'Intermediario',
      GetType: 'select',
      options: mapSelectList(businessList ?? [], 'name', 'id'),
      section: 'Datos del Cliente',
    };
    datosClienteForm.responsibleUserId = {
      label: 'Representante',
      GetType: 'hidden',
      options: [],
      section: 'Datos del Cliente',
    };
  }

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
