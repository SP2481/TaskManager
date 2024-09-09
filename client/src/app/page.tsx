import HomePage from "@/page-section/home";
import { getAllProjects } from "@/utils/projects";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const accesstoken = cookieStore?.get("accesstoken")?.value;

  let data = null;
  if (accesstoken) {
    data = await getAllProjects(accesstoken);
  }

  return <HomePage initialProjects={data} />;
}
