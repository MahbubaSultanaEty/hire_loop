import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";

export const getCompanies = async () => {
  return protectedFetch(`/api/companies`)
}

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
} 

export const getCompanyById = async (id) => {
  return serverFetch(`/api/companies/${id}`);
};

export const updateCompany = async (id, companyData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my/companies/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(companyData),
  });
  return res.json();
};


export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id)
}