import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full">
      <div className="hidden md:flex relative md:w-1/2">
        <Image
          src="/auth-image.jpeg"
          alt="Auth illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-center p-6 md:p-10 md:w-1/2">
        {children}
      </div>
    </div>
  );
}
