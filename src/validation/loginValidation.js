import { object, string } from "yup";

const loginValidation = object({
  email: string()
    .email("Por favor, ingresa un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: string().required("La contraseña es obligatoria"),
});

export default loginValidation;
