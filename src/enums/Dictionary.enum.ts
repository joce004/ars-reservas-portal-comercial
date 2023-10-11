export const TipoTarifas = {
  Complementario: 'Complementario',
  Voluntario: 'Voluntario',
} as const;

export type TipoTarifasEnumKeys = keyof typeof TipoTarifas;
export type TipoTarifasType = (typeof TipoTarifas)[TipoTarifasEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoPlan = {
  Individual: 'Individual',
  Colectivo: 'Colectivo',
} as const;

export type TipoPlanEnumKeys = keyof typeof TipoPlan;
export type TipoPlanType = (typeof TipoPlan)[TipoPlanEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const CotizacionDistribucion = {
  Principal: 'principal',
  Dependiente: 'dependiente',
  Global: 'global',
} as const;

export type CotizacionDistribucionEnumKeys =
  keyof typeof CotizacionDistribucion;
export type CotizacionDistribucionType =
  (typeof CotizacionDistribucion)[CotizacionDistribucionEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const CotizacionTipoDistribucion = {
  Global: 'global',
  PorTarifa: 'by-fee',
} as const;

export type CotizacionTipoDistribucionEnumKeys =
  keyof typeof CotizacionTipoDistribucion;
export type CotizacionTipoDistribucionType =
  (typeof CotizacionTipoDistribucion)[CotizacionTipoDistribucionEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoExtra = {
  Incluido: 'incluido',
  Opcional: 'opcional',
} as const;

export type TipoExtraEnumKeys = keyof typeof TipoExtra;
export type TipoExtraType = (typeof TipoExtra)[TipoExtraEnumKeys];

// --- --- --- --- --- --- --- --- ---

const Inputs = {
  input: 'input',
  standarInput: 'standar-input',
  number: 'number',
  select: 'select',
  datepicker: 'date-picker',
  filepicker: 'file-picker',
  personalid: 'personal-id',
  businessid: 'business-id',
  radio: 'radio',
  multipleInput: 'multiple-input',
  multipleSelect: 'multiple-select',
  phone: 'phone',
  email: 'email',
  textArea: 'text-area',
  hidden: 'hidden',
} as const;

export type InputsEnumKeys = keyof typeof Inputs;
export type InputsType = (typeof Inputs)[InputsEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoUsuario = {
  Empresa: 'Business',
  Administrador: 'Admin',
  'Administrador del Sistema': 'SystemAdmin',
} as const;

export type TipoUsuarioEnumKeys = keyof typeof TipoUsuario;
export type TipoUsuarioType = (typeof TipoUsuario)[TipoUsuarioEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoUsuarioEmpresa = {
  //Administrador: 'Admin',
  Operador: 'Operator',
  Oficial: 'Officer',
  //Cliente: 'Client',
} as const;

export type TipoUsuarioEmpresaEnumKeys = keyof typeof TipoUsuarioEmpresa;
export type TipoUsuarioEmpresaType =
  (typeof TipoUsuarioEmpresa)[TipoUsuarioEmpresaEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const Estados = {
  Activo: 'Active',
  Inactivo: 'Inactive',
} as const;

export type EstadosEnumKeys = keyof typeof Estados;
export type EstadosType = (typeof Estados)[EstadosEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoEmpresa = {
  Empresa: 'Default',
  Intermediario: 'Intermediary',
} as const;

export type TipoEmpresaEnumKeys = keyof typeof TipoEmpresa;
export type TipoEmpresaType = (typeof TipoEmpresa)[TipoEmpresaEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoIdentificacionEmpresa = {
  Cédula: 'PersonalId',
  RNC: 'BusinessId',
} as const;

export type TipoIdentificacionEmpresaEnumKeys =
  keyof typeof TipoIdentificacionEmpresa;
export type TipoIdentificacionEmpresaType =
  (typeof TipoIdentificacionEmpresa)[TipoIdentificacionEmpresaEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoClienteIdentificacion = {
  Cédula: 'Personal',
  Pasaporte: 'Passport',
  RNC: 'Commercial',
} as const;

export type TipoClienteIdentificacionEnumKeys =
  keyof typeof TipoClienteIdentificacion;
export type TipoClienteIdentificacionType =
  (typeof TipoClienteIdentificacion)[TipoClienteIdentificacionEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoEstadoSolicitud = {
  Nueva: 'New',
  'En proceso': 'InProcess',
  Revocada: 'Revoked',
  Cancelada: 'Cancelled',
  Completada: 'Completed',
} as const;

export type TipoEstadoSolicitudEnumKeys = keyof typeof TipoEstadoSolicitud;
export type TipoEstadoSolicitudType =
  (typeof TipoEstadoSolicitud)[TipoEstadoSolicitudEnumKeys];

// --- --- --- --- --- --- --- --- ---
export const TipoEstadoMovimiento = {
  Enviado: 'Sent',
  Recivida: 'Received',
  Fallida: 'Failed',
} as const;

export type TipoEstadoMovimientoEnumKeys = keyof typeof TipoEstadoMovimiento;
export type TipoEstadoMovimientoType =
  (typeof TipoEstadoMovimiento)[TipoEstadoMovimientoEnumKeys];

// --- --- --- --- --- --- --- --- ---

export const TipoMovimientoSolicitud = {
  'E-mail': 'Email',
  Estado: 'StatusChange',
} as const;

export type TipoMovimientoSolicitudEnumKeys =
  keyof typeof TipoMovimientoSolicitud;
export type TipoMovimientoSolicitudType =
  (typeof TipoMovimientoSolicitud)[TipoMovimientoSolicitudEnumKeys];
