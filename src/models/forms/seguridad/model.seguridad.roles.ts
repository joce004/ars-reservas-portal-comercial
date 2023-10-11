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
    name: profile.name,
  };
  return actualizacionDatosContratante;
};

export const initCreateRolForm: IFormGenerator<RoleCreationModel> = () => {
  const crearRol: IFormSpecification<RoleCreationModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
    },
  };
  return { form: crearRol };
};

export const initEditarRolForm: IFormGenerator<RoleEditionModel> = () => {
  const editarRol: IFormSpecification<RoleEditionModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
      rules: [validators.Required],
    },
  };
  return { form: editarRol };
};
