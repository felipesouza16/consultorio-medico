import * as z from "zod";

export const cpfValidator = z.string().refine(
  (data) => {
    const cleanedCpf = data.replace(/[^\d]/g, "");
    if (cleanedCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cleanedCpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCpf[i]) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf[9])) {
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCpf[i]) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf[10])) {
      return false;
    }
    return true;
  },
  { message: "CPF inválido" }
);
