import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src="/images/logo.png" alt="CNAM Logo" className="w-full h-full object-contain" />
    );
}
