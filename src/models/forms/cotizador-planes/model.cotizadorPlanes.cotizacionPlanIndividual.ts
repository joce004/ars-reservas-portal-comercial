import {
  BusinessModel,
  ServiceRequestModel
} from 'src/api';
import { CotizacionDistribucion } from 'src/enums/Dictionary.enum';
import {
  IFormGenerator,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';
import { mapSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

export type IIndividualQuotePlan = Nullable<{
  typeIdentification: 'c' | 'p';
  identification: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  birthDate: string;
  EMail: string;
  includeSpouse: 'S' | 'N';
  spouseBirthDate: string;
  dependantAmount: number;
  businessOwnerId: number;
  responsibleUserId: string;
}>;

export const initIndividualQuotePlan = (quote?: ServiceRequestModel) => {
  const formData = quote?.formData && quote?.formData;

  let typeIdentification: 'c' | 'p' | null = null

  if (quote?.clientIdentification?.value) {
    (quote?.clientIdentification?.value?.length == 11) && (typeIdentification = 'c');
    (quote?.clientIdentification?.value?.length == 9) && (typeIdentification = 'p');
  }

  const individualQuotePlan: IIndividualQuotePlan = {
    typeIdentification: typeIdentification,
    identification: quote?.clientIdentification?.value ?? null,
    firstName: quote?.client?.firstName ?? null,
    secondName: quote?.client?.secondName ?? null,
    firstLastName: quote?.client?.firstLastName ?? null,
    secondLastName: quote?.client?.secondLastName ?? null,
    birthDate: quote?.client?.birthDate?.substring(0, 10) ?? null,
    EMail:
      quote?.clientContactInfo?.find((contact) => contact.type == 'Email')
        ?.value ?? null,
    includeSpouse: formData ? (formData?.extraData?.includeSpouse ?? 'N') : null,
    spouseBirthDate: formData ? (formData?.extraData?.spouseBirthDate ?? 'N') : null,
    dependantAmount: formData
      ? formData?.Distributions?.[0]?.values.find(
        (dist: { Group: string }) =>
          dist?.Group == CotizacionDistribucion.Dependiente
      )?.Value ?? 0
      : null,
    businessOwnerId: quote?.businessOwnerId ?? null,
    responsibleUserId: quote?.responsibleUserId ?? null,
  };

  individualQuotePlan.includeSpouse == 'S' &&
    individualQuotePlan.dependantAmount &&
    individualQuotePlan.dependantAmount - 1;
  return individualQuotePlan;
};

export const initIndividualQuotePlanForm: IFormGenerator<
  IIndividualQuotePlan
> = (businessList: BusinessModel[], adminOrOficer?: boolean) => {
  const IndividualQuotePlan: IFormSpecification<IIndividualQuotePlan> = {
    typeIdentification: {
      label: 'Tipo de Identificación',
      GetType: 'select',
      options: [{ text: 'Cédula', value: 'c' }, { text: 'Pasaporte', value: 'p' }]
    },
    identification: {
      label: 'Número de Identificación',
      GetType: 'personal-id',
      rules: [validators.Required],
    },
    firstName: {
      label: 'Primer Nombre',
      GetType: 'input',
      rules: [validators.Required],
    },
    secondName: {
      label: 'Segundo Nombre',
      GetType: 'input',
    },
    firstLastName: {
      label: 'Primer Apellido',
      GetType: 'input',
      rules: [validators.Required],
    },
    secondLastName: {
      label: 'Segundo Apellido',
      GetType: 'input',
    },
    birthDate: {
      label: 'Fecha de Nacimiento',
      GetType: 'date-picker',
      rules: [validators.Required, validators.maxAge],
    },
    EMail: {
      label: 'Correo Electrónico',
      GetType: 'email',
      rules: [validators.email],
    },
    includeSpouse: {
      label: 'Incluir Cónyuge',
      GetType: 'radio',
      options: [
        { value: 'S', text: 'Si' },
        { value: 'N', text: 'No' },
      ],
    },
    spouseBirthDate: {
      label: 'Fecha de Nacimiento Del Cónyuge',
      GetType: 'hidden',
    },
    dependantAmount: {
      label: 'Cantidad de Dependientes',
      GetType: 'number',
    },
    businessOwnerId: {
      label: 'Intermediario',
      GetType: 'hidden',
    },
    responsibleUserId: {
      label: 'Representante',
      GetType: 'hidden',
    },
  };

  if (adminOrOficer) {
    IndividualQuotePlan.businessOwnerId = {
      label: 'Intermediario',
      GetType: 'select',
      options: mapSelectList(businessList ?? [], 'name', 'id'),
    };
    IndividualQuotePlan.responsibleUserId = {
      label: 'Representante',
      GetType: 'hidden',
      options: [],
    };
  }

  return { form: IndividualQuotePlan };
};
