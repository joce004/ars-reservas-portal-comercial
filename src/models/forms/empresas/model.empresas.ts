import {
  BusinessCreationModel,
  BusinessEditionModel,
  BusinessIntermediaryDataModel,
  BusinessModel,
  UserType
} from 'src/api';
import {
  TipoEmpresa,
  TipoIdentificacionEmpresa,
} from 'src/enums/Dictionary.enum';
import {
  IFieldSpecification,
  IForm
} from 'src/models/schemas/IFormSpecification';
import { getSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

interface CustomBusinessCreationModelInterface extends Required<BusinessCreationModel> {
  email: string
  phone: string
  celPhone: string
  cantidadMaximaAsegurados: number;
}

export type CustomBusinessCreationModel = Nullable<Omit<
  CustomBusinessCreationModelInterface,
  'contactInfo' | 'inheritServiceRequestTypesFromOwner' | 'ownerId' | 'assignAllServiceRequestTypes' | 'dataByType'
>>

interface CustomBusinessEditionModelInterface extends BusinessEditionModel {
  email: string;
  phone: string;
  celPhone: string;
  cantidadMaximaAsegurados: string;
}

export type CustomBusinessEditionModel = Nullable<Omit<
  CustomBusinessEditionModelInterface,
  'contactInfo'
>>

export type BusinessForm = {
  [Key in keyof CustomBusinessCreationModel]: IFieldSpecification;
};

export const initCreateBusinessModel = (userTpe?: UserType) => {
  const empresa: Nullable<CustomBusinessCreationModel> = {
    name: null,
    code: null,
    identificationType: null,
    identification: null,
    type: userTpe == 'Business' ? 'Intermediary' : null,
    responsibleUserId: null,
    email: null,
    phone: null,
    celPhone: null,
    addressLine1: null,
    addressLine2: null,
    cantidadMaximaAsegurados: 25
  };
  return empresa;
};

export const initEditBusinessModel = (business: BusinessModel) => {
  const empresa: CustomBusinessEditionModel = {
    id: business.id ?? null,
    name: business.name,
    code: business.code,
    identificationType: business.identificationType,
    identification: business.identification,
    type: business.type,
    responsibleUserId: business.responsibleUserId,
    status: business.status,
    email: business.contactInfo?.find((contact) => contact.type == 'Email')
      ?.value ?? null,
    phone: business.contactInfo?.find((contact) => contact.type == 'Phone')
      ?.value ?? null,
    celPhone: business.contactInfo?.find(
      (contact) => contact.type == 'Cellphone'
    )?.value ?? null,
    addressLine1: business.addressLine1,
    addressLine2: business.addressLine2,
    cantidadMaximaAsegurados: (business?.dataByType as BusinessIntermediaryDataModel)?.cantidadMaximaAsegurados?.toString() ?? '25'

  };
  return empresa;
};

export const initBusinessForm = (userTpe?: UserType): IForm<BusinessForm> => {
  const form: BusinessForm = {
    identificationType: {
      label: 'Tipo de Identificación',
      GetType: 'select',
      options: getSelectList(TipoIdentificacionEmpresa),
      section: 'default',
      rules: [validators.Required],
    },
    identification: {
      label: 'Identificación',
      GetType: 'business-id',
      section: 'default',
      rules: [validators.Required],
    },
    name: {
      label: 'Nombre',
      GetType: 'input',
      section: 'default',
      rules: [validators.Required],
    },
    code: {
      label: 'Codigo',
      GetType: 'input',
      section: 'default',
    },
    type: {
      label: 'Tipo',
      GetType: 'hidden',
      options: undefined,
      section: 'default',
      rules: [validators.Required],
    },
    responsibleUserId: {
      label: 'Representante',
      GetType: 'select',
      section: 'default',
    },
    cantidadMaximaAsegurados: {
      label: 'Cantidad Máxima de Asegurados',
      GetType: 'number',
      section: 'default',
    },
    email: {
      label: 'Correo Electrónico',
      GetType: 'email',
      section: 'Contacto',
    },
    phone: {
      label: 'Teléfono',
      GetType: 'phone',
      section: 'Contacto',
    },
    celPhone: {
      label: 'Celular',
      GetType: 'phone',
      section: 'Contacto',
    },
    addressLine1: {
      label: 'Dirección (Línea 1)',
      GetType: 'text-area',
      section: 'Contacto',
    },
    addressLine2: {
      label: 'Dirección (Línea 2)',
      GetType: 'text-area',
      section: 'Contacto',
    },
  };

  if (userTpe != 'Business') {
    form.type = {
      label: 'Tipo',
      GetType: 'select',
      options: getSelectList(TipoEmpresa),
      section: 'default',
      rules: [validators.Required],
    };
  }

  const obj: IForm<BusinessForm> = {
    form: form,
    sections: ['default', 'Contacto'],
    methods: {
      setResponsibleUserToRequired: () => form.responsibleUserId.rules = [validators.Required],
      setResponsibleUserToUnRequired: () => form.responsibleUserId.rules = [],
    },
  };
  return obj;
};
