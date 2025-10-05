// Lista de contraseñas comunes (puedes ampliarla)
export const contraseñasComunes = [
  "12345678", "password", "qwerty", "abc123", "11111111", 
  "123456789", "1234567890"
];

/**
 * Valida si una contraseña cumple las reglas de seguridad.
 * @param contraseña La contraseña a validar
 * @returns null si es segura, o un mensaje de error si no lo es
 */
export function esContraseñaSegura(contraseña: string): string | null {
  if (contraseña.length < 8 || contraseña.length > 20) {
    return "La contraseña debe tener entre 8 y 20 caracteres.";
  }
  if (!/[A-Z]/.test(contraseña)) {
    return "Debe contener al menos una letra mayúscula.";
  }
  if (!/[a-z]/.test(contraseña)) {
    return "Debe contener al menos una letra minúscula.";
  }
  if (!/[0-9]/.test(contraseña)) {
    return "Debe contener al menos un número.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(contraseña)) {
    return "Debe contener al menos un carácter especial.";
  }
  if (contraseñasComunes.includes(contraseña.toLowerCase())) {
    return "La contraseña es demasiado común o trivial.";
  }
  return null;
}