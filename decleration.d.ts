// src/declaration.d.ts

declare module "*.svg" {
    import { FC, SVGProps } from "react"; // React und FC (Function Component) aus react importieren
    const ReactComponent: FC<SVGProps<SVGSVGElement>>; // SVG als React-Komponente deklarieren
    export { ReactComponent };
    const content: string;
    export default content;
  }
  