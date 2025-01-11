import { object, string, ref } from "yup";
export const sigNupValidation = object({
    email: string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
    password: string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña no puede superar los 12 caracteres')
    .required('La contraseña es obligatoria'),
    confirmPassword: string()
    .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar la contraseña'),
  });