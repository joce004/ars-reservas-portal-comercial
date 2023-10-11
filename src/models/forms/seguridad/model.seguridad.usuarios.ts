import { BusinessUserEditionModel, BusinessUserModel, UserCreationModel, UserEditionModel, UserModel } from 'src/api';
import { IFormGenerator, IFieldSpecification, IFormSpecification } from 'src/models/schemas/IFormSpecification';
import { TipoUsuarioEmpresa, Estados } from 'src/enums/Dictionary.enum';
import { getSelectList, mapSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';

export const initCreateUserModel = () => {
  const actualizacionDatosContratante: Nullable<UserCreationModel> = {
    firstName: null,
    secondName: null,
    firstLastName: null,
    secondLastName: null,
    userName: null,
    password: null,
    phoneNumber: null,
    email: null,
    businessId: null,
    businessType: null,
  };
  return actualizacionDatosContratante;
};

export const initEditUserModel = (user: UserModel) => {
  const actualizacionDatosContratante: UserEditionModel = {
    firstName: user.firstName,
    secondName: user.secondName,
    firstLastName: user.firstLastName,
    secondLastName: user.secondLastName,
    phoneNumber: null,
    status: user.status,
    id: user.id,
  };
  return actualizacionDatosContratante;
};

export const initEditAcess = (businessUser: BusinessUserModel) => {
  const actualizacionDatosContratante: Partial<
    Nullable<{
      [Key in keyof BusinessUserEditionModel]: string | number;
    }>
  > = {
    id: businessUser.id,
    type: businessUser.type?.type ?? null,
    responsibleBusinessUserId: businessUser.responsibleBusinessUserId ?? null,
    status: businessUser.status,
  };
  return actualizacionDatosContratante;
};

export const initEditUserPass = (id: string) => {
  const actualizacionDatosContratante = {
    userId: id,
    newPassword: null,
    confirmPassword: null,
  };
  return actualizacionDatosContratante;
};

export const initCreateUserForm: IFormGenerator<UserCreationModel> = (listBussiness: object[]) => {
  const crearUsuario: IFormSpecification<UserCreationModel> = {
    firstName: {
      label: 'Primer Nombre',
      GetType: 'input',
      rules: [validators.Required],
      section: 'default'
    },
    secondName: {
      label: 'Segundo Nombre',
      GetType: 'input',
      section: 'default'
    },
    firstLastName: {
      label: 'Primer Apellido',
      GetType: 'input',
      rules: [validators.Required],
      section: 'default'
    },
    secondLastName: {
      label: 'Segundo Apellido',
      GetType: 'input',
      section: 'default'
    },
    userName: {
      label: 'Nombre de Usuario',
      GetType: 'standar-input',
      rules: [validators.Required],
      section: 'Credenciales'
    },
    password: {
      label: 'Contraseña',
      GetType: 'standar-input',
      rules: [validators.Required],
      section: 'Credenciales'
    },
    phoneNumber: {
      label: 'Número de Teléfono',
      GetType: 'phone',
      section: 'Contacto'
    },
    email: {
      label: 'Correo Electrónico',
      GetType: 'email',
      rules: [validators.Required],
      section: 'Contacto'
    },
    businessId: {
      label: 'Intermediario',
      GetType: 'select',
      options: mapSelectList(listBussiness, 'name', 'id'),
      rules: [validators.Required],
      section: 'Intermediario'
    },
    businessType: {
      label: 'Tipo Usuario',
      GetType: 'select',
      options: getSelectList(TipoUsuarioEmpresa),
      rules: [validators.Required],
      section: 'Intermediario'
    },
  };
  return { form: crearUsuario, sections: ['default', 'Credenciales', 'Contacto', 'Intermediario'] };
};

export const initEditUserPassForm = () => {
  const crearUsuario: {
    [key: string]: IFieldSpecification;
  } = {
    newPassword: {
      label: 'Nueva Contraseña',
      GetType: 'standar-input',
      rules: [validators.Required],
    },
    confirmPassword: {
      label: 'Confirmar Contraseña',
      GetType: 'standar-input',
      rules: [validators.Required],
    },
  };
  return crearUsuario;
};

export const initEditUserForm = () => {
  const editarUsuario: IFormSpecification<UserEditionModel> = {
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
    phoneNumber: {
      label: 'Número de Teléfono',
      GetType: 'phone',
    },
    status: {
      label: 'Estado',
      GetType: 'select',
      options: getSelectList(Estados),
      rules: [validators.Required],
    },
  };
  return editarUsuario;
};

export const initEditAcessForm = (oficers: BusinessUserModel[]) => {
  const crearUsuario: IFormSpecification<BusinessUserEditionModel> = {
    responsibleBusinessUserId: {
      label: 'Supervisor',
      GetType: 'select',
      options: oficers.map((oficer) => ({
        text: oficer.user?.fullName ?? '',
        value: oficer.id,
      })),
      rules: [validators.Required],
    },
    type: {
      label: 'Cargo',
      GetType: 'select',
      options: getSelectList(TipoUsuarioEmpresa),
      rules: [validators.Required],
    },
  };
  return crearUsuario;
};
