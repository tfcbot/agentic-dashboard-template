import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <SignUp appearance={{ baseTheme: "dark" }} />
    </div>
  );
} 