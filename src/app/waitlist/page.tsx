import { Waitlist } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function WaitlistPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Waitlist appearance={{ baseTheme: dark }} />
    </div>
  );
} 