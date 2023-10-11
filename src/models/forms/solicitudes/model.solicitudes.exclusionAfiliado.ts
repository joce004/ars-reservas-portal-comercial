import {
  IFormGenerator,
  IFieldSpecification,
  IFormSpecification,
} from 'src/models/schemas/IFormSpecification';

export type ExclusionAfiliado = Nullable<{
  _File_Novedades: File;
}>;

export type ExclusionAfiliadoForm = {
  [Key in keyof ExclusionAfiliado]: IFieldSpecification;
};

export const initExclusionAfiliado = (model?: string) => {
  if (model) {
    const data: ExclusionAfiliado = JSON.parse(model);

    const ExclusionAfiliado: ExclusionAfiliado = {
      _File_Novedades: data._File_Novedades,
    };
    return ExclusionAfiliado;
  } else {
    const ExclusionAfiliado: ExclusionAfiliado = {
      _File_Novedades: null,
    };
    return ExclusionAfiliado;
  }
};

export const initExclusionAfiliadoForm: IFormGenerator<
  ExclusionAfiliado
> = () => {
  const exclusionAfiliadoForm: IFormSpecification<ExclusionAfiliado> = {
    _File_Novedades: {
      label: 'Formulario de Novedades',
      GetType: 'file-picker',
      section: 'Datos de la Solicitud',
    },
  };
  return { form: exclusionAfiliadoForm, sections: [], files: true };
};
