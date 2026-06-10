import CompanyForm from "@/components/dashboard/CompnayForm";
import { getCompanyById } from "@/lib/api/companies";

export default async function EditCompanyPage({ params }) {
  const { id } = await params;
  const company = await getCompanyById(id);

  return <CompanyForm mode="edit" company={company} />;
}