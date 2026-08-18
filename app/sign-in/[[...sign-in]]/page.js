import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-bg py-16">
      <SignIn />
    </div>
  );
}
