import { object, string } from 'yup';

export const loginValidation = object({
  password: string().required('La contraseña es obligatoria'),
  email: string()
    .email('Por favor, ingresa un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
});

export default loginValidation;
