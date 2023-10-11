import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type CrearPromotor = Nullable<{
  _File_Solicitud: File;
}>;

export const initCrearPromotor = (model?: string) => {
  if (model) {
    const data: CrearPromotor = JSON.parse(model);

    const crearPromotor: CrearPromotor = {
      _File_Solicitud: data._File_Solicitud,
    };
    return crearPromotor;
  } else {
    const crearPromotor: CrearPromotor = {
      _File_Solicitud: null,
    };
    return crearPromotor;
  }
};

export const initCrearPromotorForm: IFormGenerator<CrearPromotor> = () => {
  const crearPromotorForm: IFormSpecification<CrearPromotor> = {
    _File_Solicitud: {
      label: 'Solicitud Usuario PS-promotor (F-TI-009)',
      GetType: 'file-picker',
    },
  };
  return { form: crearPromotorForm, sections: [], files: true };
};
