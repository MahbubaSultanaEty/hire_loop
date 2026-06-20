'use server'
import { serverMutation } from "../core/server"


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData)
}

export const updateCompanyStatus = async (id, data) => {
    return serverMutation(`/api/my/companies/${id}`, data, "PATCH")
}