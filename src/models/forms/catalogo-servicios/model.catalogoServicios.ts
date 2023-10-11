import {
  BusinessServiceRequestTypeEditionModel,
  BusinessServiceRequestTypeModel,
  ServiceRequestTypeCreationModel,
  ServiceRequestTypeEditionModel,
  ServiceRequestTypeModel
} from 'src/api';
import {
  IFormGenerator,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';
import { Estados, TipoEstadoSolicitud } from 'src/enums/Dictionary.enum';
import { getSelectList } from 'src/utils/array';

export const initCreateServiceModel = () => {
  const solicitud: Nullable<ServiceRequestTypeCreationModel> = {
    name: null,
    code: null,
  };
  return solicitud;
};

export const initEditServiceModel = (
  ServiceRequestType: ServiceRequestTypeModel
) => {
  const solicitud: ServiceRequestTypeEditionModel = {
    id: ServiceRequestType.id,
    name: ServiceRequestType.name,
    code: ServiceRequestType.code,
  };
  return solicitud;
};

export const initEditBusinessServiceModel = (
  BusinessServiceRequestType: BusinessServiceRequestTypeModel
) => {
  const solicitud: BusinessServiceRequestTypeEditionModel = {
    id: BusinessServiceRequestType.id,
    sendNotificationsToEmailList:
      BusinessServiceRequestType.sendNotificationsToEmailList ?? [],
    sendNotificationsByRequestStatusList:
      BusinessServiceRequestType.sendNotificationsByRequestStatusList ?? [],
    status: BusinessServiceRequestType.status,
  };
  return solicitud;
};

export const initServiceForm: IFormGenerator<ServiceRequestTypeCreationModel> = () => {
  const crearSolicitud: IFormSpecification<ServiceRequestTypeCreationModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
    },
    code: {
      label: 'Codigo',
      GetType: 'standar-input',
    },
  };
  return { form: crearSolicitud };
};

export const initBusinessServiceForm: IFormGenerator<
  BusinessServiceRequestTypeModel
> = () => {
  const crearSolicitud: IFormSpecification<BusinessServiceRequestTypeModel> = {
    sendNotificationsToEmailList: {
      label: 'Correos que reciben notificaciones de este servicio:',
      GetType: 'multiple-input',
    },
    sendNotificationsByRequestStatusList: {
      label: 'Estados de este servicio que envían notificaciones:',
      GetType: 'multiple-select',
      options: getSelectList(TipoEstadoSolicitud),
    },
    status: {
      label: 'Estado',
      GetType: 'select',
      options: getSelectList(Estados),
    },
  };
  return { form: crearSolicitud };
};
