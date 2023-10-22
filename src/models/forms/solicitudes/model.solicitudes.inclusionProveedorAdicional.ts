import {
  IFieldSpecification,
  IFormGenerator,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';

export type InclusionProveedorAdicional = Nullable<{
  _File_Comunicacion: File;
}>;

export type InclusionProveedorAdicionalForm = {
  [Key in keyof InclusionProveedorAdicional]: IFieldSpecification;
};

export const initInclusionProveedorAdicional = (model?: string) => {
  if (model) {
    const data: InclusionProveedorAdicional = JSON.parse(model);

    const inclusionProveedorAdicional: InclusionProveedorAdicional = {
      _File_Comunicacion: data._File_Comunicacion,
    };
    return inclusionProveedorAdicional;
  } else {
    const inclusionProveedorAdicional: InclusionProveedorAdicional = {
      _File_Comunicacion: null,
    };
    return inclusionProveedorAdicional;
  }
};

export const initInclusionProveedorAdicionalForm: IFormGenerator<
  InclusionProveedorAdicional
> = () => {
  const inclusionProveedorAdicionalForm: IFormSpecification<InclusionProveedorAdicional> =
    {
      _File_Comunicacion: {
        label: 'Formulario de Proveedor Adicional/Comunicación',
        GetType: 'file-picker',
        section: 'Documentos'
      },
    };
  return { form: inclusionProveedorAdicionalForm, sections: ['Documentos'], files: true };
};
