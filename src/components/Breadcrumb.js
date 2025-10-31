import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNames = {
    gallery: "Gallery",
    contact_form: "Contatti",
  };

  const generateBreadcrumbSchema = () => {
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://serenaferraris.com/",
        },
      ],
    };

    pathnames.forEach((pathname, index) => {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        position: index + 2,
        name: breadcrumbNames[pathname] || pathname,
        item: `https://serenaferraris.com/${pathnames
          .slice(0, index + 1)
          .join("/")}`,
      });
    });

    return breadcrumbList;
  };

  if (pathnames.length === 0) return null;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbSchema())}
      </script>
      <nav className="bg-white py-2 px-8 border-b">
        <div className="container mx-auto">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-[#594c47] transition-colors">
                Home
              </Link>
            </li>
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return (
                <li key={pathname} className="flex items-center">
                  <span className="mx-2">/</span>
                  {isLast ? (
                    <span className="text-[#594c47] font-semibold">
                      {breadcrumbNames[pathname] || pathname}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="hover:text-[#594c47] transition-colors"
                    >
                      {breadcrumbNames[pathname] || pathname}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;
