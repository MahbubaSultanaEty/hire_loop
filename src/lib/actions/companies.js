'use server'
import { serverMutation } from "../core/server"


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData)
}

export const updateCompanyStatus = async (id, status) => {
  return serverMutation(
    `/api/companies/${id}/status`,
    { status },
    "PATCH"
  );
};