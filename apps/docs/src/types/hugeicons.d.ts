declare module '@hugeicons/react' {
  import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

  export type IconSvgElement = any;

  export interface HugeiconsProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    altIcon?: IconSvgElement;
    showAlt?: boolean;
    icon?: IconSvgElement;
    primaryColor?: string;
    secondaryColor?: string;
    disableSecondaryOpacity?: boolean;
  }

  export interface HugeiconsIconProps extends Omit<HugeiconsProps, 'ref' | 'altIcon'> {
    icon: IconSvgElement;
    altIcon?: IconSvgElement;
  }

  export const HugeiconsIcon: ForwardRefExoticComponent<
    HugeiconsIconProps & RefAttributes<SVGSVGElement>
  >;
}
