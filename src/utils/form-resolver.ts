import {
  initActualizacionDatosContratante,
  initActualizacionDatosContratanteForm,
} from 'src/models/forms/solicitudes/model.solicitudes.actualizacionDatosContratante';
import {
  initCambioVigenciaContrato,
  initCambioVigenciaContratoForm,
} from 'src/models/forms/solicitudes/model.solicitudes.cambioVigenciaContrato';
import {
  initCancelacionContrato,
  initCancelacionContratoForm,
} from 'src/models/forms/solicitudes/model.solicitudes.cancelacionContrato';
import {
  initCancelacionPrecertificacion,
  initCancelacionPrecertificacionForm,
} from 'src/models/forms/solicitudes/model.solicitudes.cancelacionPrecertificacion';
import {
  initCartaImpuestoPromotorIntermediario,
  initCartaImpuestoPromotorIntermediarioForm,
} from 'src/models/forms/solicitudes/model.solicitudes.cartaImpuestoPromotorIntermediario';
import {
  initCrearPromotor,
  initCrearPromotorForm,
} from 'src/models/forms/solicitudes/model.solicitudes.crearPromotor';
import {
  initElaboracionCarnet,
  initElaboracionCarnetForm,
} from 'src/models/forms/solicitudes/model.solicitudes.elaboracionCarnet';
import {
  initExclusionAfiliado,
  initExclusionAfiliadoForm,
} from 'src/models/forms/solicitudes/model.solicitudes.exclusionAfiliado';
import {
  initInclusionProveedorAdicional,
  initInclusionProveedorAdicionalForm,
} from 'src/models/forms/solicitudes/model.solicitudes.inclusionProveedorAdicional';
import {
  initLocalizacionCarnet,
  initLocalizacionCarnetForm,
} from 'src/models/forms/solicitudes/model.solicitudes.localizacionCarnet';
import {
  initPrecertificacion,
  initPrecertificacionForm,
} from 'src/models/forms/solicitudes/model.solicitudes.precertificacion';
import {
  initReembolso,
  initReembolsoForm,
} from 'src/models/forms/solicitudes/model.solicitudes.reembolso';
import {
  initRevisionBeneficiosContratos,
  initRevisionBeneficiosContratosForm,
} from 'src/models/forms/solicitudes/model.solicitudes.revisionBeneficiosContratos';

export const formSetter = (selectedForm: number, model?: string) => {
  switch (selectedForm) {
    case 1:
      return {
        model: initCancelacionContrato(model),
        schema: initCancelacionContratoForm().form,
        files: initCancelacionContratoForm().files,
        sections: initCancelacionContratoForm().sections,
      };
    case 2:
      return {
        model: initPrecertificacion(model),
        schema: initPrecertificacionForm().form,
        files: initPrecertificacionForm().files,
        sections: initPrecertificacionForm().sections,
      };
    case 3:
      return {
        model: initCancelacionPrecertificacion(model),
        schema: initCancelacionPrecertificacionForm().form,
        files: initCancelacionPrecertificacionForm().files,
        sections: initCancelacionPrecertificacionForm().sections,
      };
    case 4:
      return {
        model: initCambioVigenciaContrato(model),
        schema: initCambioVigenciaContratoForm().form,
        files: initCambioVigenciaContratoForm().files,
        sections: initCambioVigenciaContratoForm().sections,
      };
    case 5:
      return {
        model: initExclusionAfiliado(model),
        schema: initExclusionAfiliadoForm().form,
        files: initExclusionAfiliadoForm().files,
        sections: initExclusionAfiliadoForm().sections,
      };
    case 6:
      return {
        model: initCrearPromotor(model),
        schema: initCrearPromotorForm().form,
        files: initCrearPromotorForm().files,
        sections: initCrearPromotorForm().sections,
      };
    case 7:
      return {
        model: initElaboracionCarnet(model),
        schema: initElaboracionCarnetForm().form,
        files: initElaboracionCarnetForm().files,
        sections: initElaboracionCarnetForm().sections,
      };
    case 8:
      return {
        model: initCartaImpuestoPromotorIntermediario(model),
        schema: initCartaImpuestoPromotorIntermediarioForm().form,
        files: initCartaImpuestoPromotorIntermediarioForm().files,
        sections: initCartaImpuestoPromotorIntermediarioForm().sections,
      };
    case 9:
      return {
        model: initActualizacionDatosContratante(model),
        schema: initActualizacionDatosContratanteForm().form,
        files: initActualizacionDatosContratanteForm().files,
        sections: initActualizacionDatosContratanteForm().sections,
      };
    case 10:
      return {
        model: initLocalizacionCarnet(model),
        schema: initLocalizacionCarnetForm().form,
        files: initLocalizacionCarnetForm().files,
        sections: initLocalizacionCarnetForm().sections,
      };
    case 11:
      return {
        model: initRevisionBeneficiosContratos(model),
        schema:
          initRevisionBeneficiosContratosForm().form,
        files: initRevisionBeneficiosContratosForm().files,
        sections: initRevisionBeneficiosContratosForm().sections,
      };
    case 12:
      return {
        model: initInclusionProveedorAdicional(model),
        schema:
          initInclusionProveedorAdicionalForm().form,
        files: initInclusionProveedorAdicionalForm().files,
        sections: initInclusionProveedorAdicionalForm().sections,
      };
    case 13:
      return {
        model: initReembolso(model),
        schema: initReembolsoForm().form,
        files: initReembolsoForm().files,
        sections: initReembolsoForm().sections,
      };
    default:
      return {
        model: null,
        schema: null,
        files: false,
        sections: [],
      };
  }
};
