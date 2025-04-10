// import { getUserById } from "@/actions/users";
// import VerifyTokenForm from "@/components/VerifyTokenForm";

import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyAccount({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get a User from DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Verify Token</CardTitle>
          <CardDescription>
            Please enter the 6-figure pass code sent to your email -{" "}
            {user?.email}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyTokenForm role={role} userToken={userToken} id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
