'use client'

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, LucideProps } from 'lucide-react';
import { IconProps } from '../types/components';

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}: IconProps & Omit<LucideProps, keyof IconProps>) {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;