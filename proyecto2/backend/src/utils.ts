export function validarQueryParams(value: any): boolean {
  if (!value) {
    return false;
  }
  if (value === "undefined") {
    return false;
  }
  return true;
}