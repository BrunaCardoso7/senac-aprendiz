import { ContratoSchema } from "../schema/contrato-schema";

async function createContrato(data: ContratoSchema) {
  const res = await fetch("/api/contrato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(response));
  }

  return response;
}

export default createContrato;