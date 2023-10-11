export const Errors = {
  PasswordMismatch: 'La contraseña actual es incorrecta',
  unknownError: 'Error desconocido',
  problem: 'Hubo un problema al procesar la información'
};

export type ErrorsEnumKeys = keyof typeof Errors;
export type ErrorsType =
  (typeof Errors)[ErrorsEnumKeys];
