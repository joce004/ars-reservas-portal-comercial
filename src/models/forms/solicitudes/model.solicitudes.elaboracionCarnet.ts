import { IFormGenerator, IFormSpecification } from 'src/models/schemas/IFormSpecification';

export type ElaboracionCarnet = Nullable<{
  TipoServicio: string;
  _File_Novedades: File;
}>;

export const initElaboracionCarnet = (model?: string) => {
  if (model) {
    const data: ElaboracionCarnet = JSON.parse(model);

    const elaboracionCarnet: ElaboracionCarnet = {
      TipoServicio: data.TipoServicio,
      _File_Novedades: data._File_Novedades,
    };
    return elaboracionCarnet;
  } else {
    const elaboracionCarnet: ElaboracionCarnet = {
      TipoServicio: '',
      _File_Novedades: null,
    };
    return elaboracionCarnet;
  }
};

export const initElaboracionCarnetForm: IFormGenerator<ElaboracionCarnet> = () => {
  const elaboracionCarnetForm: IFormSpecification<ElaboracionCarnet> = {
    TipoServicio: {
      label: 'Tipo de Servicio',
      GetType: 'select',
      options: [
        { value: 'Nunca llegó', text: 'Nunca llegó' },
        { value: 'Error primera impresión', text: 'Error primera impresión' },
      ],
      section: 'Datos de la Solicitud'
    },
    _File_Novedades: {
      label: 'Formulario de Novedades',
      GetType: 'file-picker',
      section: 'Documentos'
    },
  };
  return { form: elaboracionCarnetForm, sections: ['Datos de la Solicitud', 'Documentos'],  files: true };
};
