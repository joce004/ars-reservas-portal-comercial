import { RoleCreationModel, RoleEditionModel, RoleModel } from 'src/api';
import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';
import { validators } from 'src/utils/validations';

export const initCrearRolModel = () => {
  const actualizacionDatosContratante: RoleCreationModel = {
    name: '',
  };
  return actualizacionDatosContratante;
};

export const initEditarRolModel = (profile: RoleModel) => {
  const actualizacionDatosContratante: RoleEditionModel = {
    id: profile.id,
    name: profile.name,
    status: profile.status
  };
  return actualizacionDatosContratante;
};

export const initCreateRolForm: IFormGenerator<RoleCreationModel> = () => {
  const crearRol: IFormSpecification<RoleCreationModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
      section: 'default'
    },
  };
  return { form: crearRol, sections: [] };
};

export const initEditarRolForm: IFormGenerator<RoleEditionModel> = () => {
  const editarRol: IFormSpecification<RoleEditionModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
      rules: [validators.Required],
      section: 'default'
    },
  };
  return { form: editarRol, sections: []};
};
