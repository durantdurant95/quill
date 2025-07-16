"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BreadcrumbNav() {
  const pathname = usePathname();

  // Split pathname into segments and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment: string, index: number) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    // Format segment for display (capitalize and replace hyphens with spaces)
    const displayName = segment
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      name: displayName,
      path,
      isLast,
    };
  });

  // Don't render if no segments (root path)
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="pl-1.5 sm:pl-2.5">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <>
            {index > 0 && <BreadcrumbSeparator key={`separator-${index}`} />}
            <BreadcrumbItem key={item.path}>
              {item.isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
