import {
  IFormGenerator,
  IFormSpecification
} from 'src/models/schemas/IFormSpecification';

export type CartaImpuestoPromotorIntermediario = Nullable<{
  Intermediario: string;
}>;

export const initCartaImpuestoPromotorIntermediario = (model?: string) => {
  if (model) {
    const data: CartaImpuestoPromotorIntermediario = JSON.parse(model);

    const cartaImpuestoPromotorIntermediario: CartaImpuestoPromotorIntermediario =
      {
        Intermediario: data.Intermediario,
      };
    return cartaImpuestoPromotorIntermediario;
  } else {
    const cartaImpuestoPromotorIntermediario: CartaImpuestoPromotorIntermediario =
      {
        Intermediario: '',
      };
    return cartaImpuestoPromotorIntermediario;
  }
};

export const initCartaImpuestoPromotorIntermediarioForm: IFormGenerator<
CartaImpuestoPromotorIntermediario
> = () => {
  const cartaImpuestoPromotorIntermediarioForm: IFormSpecification<CartaImpuestoPromotorIntermediario> =
    {
      Intermediario: {
        label: 'Intermediario',
        GetType: 'select',
        section: 'Datos de la Solicitud',
      },
    };
  return {
    form: cartaImpuestoPromotorIntermediarioForm,
    sections: ['Datos de la Solicitud'],
    files: false,
  };
};
