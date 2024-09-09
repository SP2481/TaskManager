/* eslint-disable @typescript-eslint/no-explicit-any */
import LogIn from "@/page-section/login";
import Tasks from "@/page-section/tasks";
import { getTasks } from "@/utils/tasks";
import { cookies } from "next/headers";

interface Props {
  params: { projectId: string };
}

const PAGE_MAPPER = {
  login: LogIn,
  default: Tasks,
};

export default async function Page({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("accesstoken")?.value;

  const data = await getTasks(token as string, params?.projectId as string);
  const isTaskPage = params?.projectId !== "login";
  const PageToRender = isTaskPage ? PAGE_MAPPER.default : PAGE_MAPPER.login;

  return <PageToRender initialtasks={data} projectId={params?.projectId} />;
}
