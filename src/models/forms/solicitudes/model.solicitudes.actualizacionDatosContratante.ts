import { IFormGenerator, IFormSpecification } from 'src/models/schemas/IFormSpecification';

export type ActualizacionDatosContratante = Nullable<{
  _File_AvalaCambio: File;
  _File_ComunicacionContratante: File;
}>;

export const initActualizacionDatosContratante = (model?: string) => {
  if (model) {
    const data: ActualizacionDatosContratante = JSON.parse(model);

    const actualizacionDatosContratante: ActualizacionDatosContratante = {
      _File_AvalaCambio: data._File_AvalaCambio,
      _File_ComunicacionContratante: data._File_ComunicacionContratante,
    };
    return actualizacionDatosContratante;
  } else {
    const actualizacionDatosContratante: ActualizacionDatosContratante = {
      _File_AvalaCambio: null,
      _File_ComunicacionContratante: null,
    };
    return actualizacionDatosContratante;
  }
};

export const initActualizacionDatosContratanteForm : IFormGenerator<ActualizacionDatosContratante> = () => {
  const actualizacionDatosContratanteForm: IFormSpecification<ActualizacionDatosContratante> = {
    _File_AvalaCambio: {
      label: 'Documento que Avale el Cambio',
      GetType: 'file-picker',
    },
    _File_ComunicacionContratante: {
      label: 'Comunicación por parte del Contratante',
      GetType: 'file-picker',
    },
  };
  return {
    form: actualizacionDatosContratanteForm,
    sections: [],
    files: true,
  };
};
