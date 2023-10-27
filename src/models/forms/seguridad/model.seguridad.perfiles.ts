import {
  RoleProfileCreationModel,
  RoleProfileEditionModel,
  Status
} from 'src/api';
import { IFormGenerator, IFieldSpecification, IFormSpecification } from 'src/models/schemas/IFormSpecification';
import { getSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

export type ProfileCreationForm = {
  [Key in keyof RoleProfileCreationModel]: IFieldSpecification;
}
export const initCreateProfileModel = () => {
  const actualizacionDatosContratante: RoleProfileCreationModel = {
    name: null,
    code: null,
  };
  return actualizacionDatosContratante;
};

export const initCrearPerfilForm: IFormGenerator<ProfileCreationForm> = () => {
  const crearPerfil: IFormSpecification<RoleProfileCreationModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
    },
    code: {
      label: 'Código',
      GetType: 'standar-input',
    },
  };
  return { form: crearPerfil, sections: []};
};

export const initEditProfileForm: IFormGenerator<RoleProfileEditionModel> = () => {
  const crearPerfil: IFormSpecification<RoleProfileEditionModel> = {
    name: {
      label: 'Nombre',
      GetType: 'standar-input',
      rules: [validators.Required],
      section: 'default'
    },
    code: {
      label: 'Código',
      GetType: 'standar-input',
      section: 'default'
    },
    status: {
      label: 'Estado',
      GetType: 'select',
      options: getSelectList(Status),
      rules: [validators.Required],
      section: 'default'
    },
    description: {
      label: 'Descripción',
      GetType: 'text-area',
      rules: [validators.Required],
      section: 'default'
    },
  };
  return { form: crearPerfil, sections: []};
};
