import CompanyForm from "@/components/dashboard/CompnayForm";
import { getRecruiterCompany } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";

export default async function RegisterCompanyPage() {
  const user = await getUserSession();
 const company= await getRecruiterCompany(user?.id)
    
  console.log("user sesion in register company page", user);
  
  return <CompanyForm mode="create" recruiter={user} recruiterCompany={company} />;
}