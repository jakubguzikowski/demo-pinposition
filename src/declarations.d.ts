declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}