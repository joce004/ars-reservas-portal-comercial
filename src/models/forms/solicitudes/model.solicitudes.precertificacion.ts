import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type Precertificacion = Nullable<{
  _File_IndicacionMedica: File;
  _File_CanetAfiliado: File;
  _File_Identificacion: File;
  _File_EstudiosPrevios: File;
  _File_InformeMedico: File;
}>;

export const initPrecertificacion = (model?: string) => {
  if (model) {
    const data: Precertificacion = JSON.parse(model);

    const precertificacion: Precertificacion = {
      _File_IndicacionMedica: data._File_IndicacionMedica,
      _File_CanetAfiliado: data._File_CanetAfiliado,
      _File_Identificacion: data._File_Identificacion,
      _File_EstudiosPrevios: data._File_EstudiosPrevios,
      _File_InformeMedico: data._File_InformeMedico,
    };
    return precertificacion;
  } else {
    const precertificacion: Precertificacion = {
      _File_IndicacionMedica: null,
      _File_CanetAfiliado: null,
      _File_Identificacion: null,
      _File_EstudiosPrevios: null,
      _File_InformeMedico: null,
    };
    return precertificacion;
  }
};

export const initPrecertificacionForm: IFormGenerator<Precertificacion> = () => {
  const precertificacionForm: IFormSpecification<Precertificacion> = {
    _File_IndicacionMedica: {
      label: 'Indicación Médica',
      GetType: 'file-picker',
      section: 'Documentos'
    },
    _File_CanetAfiliado: {
      label: 'Carné Afiliado',
      GetType: 'file-picker',
      section: 'Documentos'
    },
    _File_Identificacion: {
      label: 'Número de Identificación',
      GetType: 'file-picker',
      section: 'Documentos'
    },
    _File_EstudiosPrevios: {
      label: 'Estudios previos realizados',
      GetType: 'file-picker',
      section: 'Documentos'
    },
    _File_InformeMedico: {
      label: 'Informe médico',
      GetType: 'file-picker',
      section: 'Documentos'
    },
  };
  return { form: precertificacionForm, sections: ['Documentos'], files: true };
};
