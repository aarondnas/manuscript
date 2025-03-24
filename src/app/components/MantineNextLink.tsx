"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, FC } from "react";
import { Url } from "next/dist/shared/lib/router/router";

interface MantineNextLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<LinkProps, "href"> {
  href: Url;
  children?: React.ReactNode;
}

const MantineNextLink: FC<MantineNextLinkProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} {...(props as Omit<LinkProps, "href">)}>
      {children ?? ""}
    </Link>
  );
};

export default MantineNextLink;