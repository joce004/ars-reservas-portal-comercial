import {
  BusinessModel,
  ServiceRequestModel
} from 'src/api';
import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';
import { mapSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

export type IColectiveQuotePlan = Nullable<{
  identification: string;
  client: string;
  contactName: string;
  EMail: string;
  businessOwnerId: number;
  responsibleUserId: string;
}>;

export const initColectiveQuotePlan = (quote?: ServiceRequestModel) => {
  const colectiveQuotePlan: IColectiveQuotePlan = {
    identification: quote?.clientIdentification?.value ?? null,
    client: quote?.client?.firstName ?? null,
    contactName: quote?.client?.firstLastName ?? null,
    EMail:
      quote?.clientContactInfo?.find((contact) => contact.type == 'Email')
        ?.value ?? null,
    businessOwnerId: quote?.businessOwnerId ?? null,
    responsibleUserId: quote?.responsibleUserId ?? null,
  };
  return colectiveQuotePlan;
};

export const initColectiveQuotePlanForm: IFormGenerator<IColectiveQuotePlan> = (
  businessList: BusinessModel[],
  adminOrOficer?: boolean
) => {
  const ColectiveQuotePlan: IFormSpecification<IColectiveQuotePlan> = {
    identification: {
      label: 'RNC',
      GetType: 'business-id',
      rules: [validators.Required],
      section: 'default'
    },
    client: {
      label: 'Cliente',
      GetType: 'input',
      rules: [validators.Required],
      section: 'default'
    },
    contactName: {
      label: 'Persona de Contacto',
      GetType: 'input',
      rules: [validators.Required],
      section: 'default'
    },
    EMail: {
      label: 'Correo Electrónico',
      GetType: 'email',
      rules: [validators.email],
      section: 'default'
    },
    businessOwnerId: {
      label: 'Intermediario',
      GetType: 'hidden',
      options: [],
      section: 'default'
    },
    responsibleUserId: {
      label: 'Representante',
      GetType: 'hidden',
      options: [],
      section: 'default'
    },
  };

  if (adminOrOficer) {
    ColectiveQuotePlan.businessOwnerId = {
      label: 'Intermediario',
      GetType: 'select',
      options: mapSelectList(businessList ?? [], 'name', 'id'),
      section: 'default'
    };
    ColectiveQuotePlan.responsibleUserId = {
      label: 'Representante',
      GetType: 'hidden',
      options: [],
      section: 'default'
    }
  }

  return { form: ColectiveQuotePlan, sections: [] };
};
