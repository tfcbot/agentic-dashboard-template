import { ButtonHTMLAttributes } from 'react';
import { AgentConfig } from './agent';

export interface AgentCardProps {
    id: string;
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    startingPrice: number;
    available?: boolean;
    keyDeliverables: string[];
}

export interface AgentServiceViewProps {
    agent: AgentConfig;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
}

export interface OrderFormProps {
    agentId: string;
    initialPackage: string;
}

export interface StarRatingProps {
    rating: number;
}

export interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

export interface PackageTiersProps {
    agentId: string;
} 