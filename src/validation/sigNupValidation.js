import { object, string, ref } from "yup";

export const sigNupValidation = object({
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar la contraseña'),
  password: string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(12, 'La contraseña no puede superar los 12 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
    )
    .required('La contraseña es obligatoria'),
    email: string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
});
