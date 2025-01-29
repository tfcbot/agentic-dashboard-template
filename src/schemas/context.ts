import { AgentConfig, OrderFormData, OrderFormStatus, IntakeSubmissionResponse } from './agent';

export interface SidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export interface AgentContextType {
    agent: AgentConfig | null;
    loading: boolean;
    error: Error | null;
    status: OrderFormStatus;
    submitIntake: (formData: OrderFormData) => Promise<IntakeSubmissionResponse>;
    resetError: () => void;
    loadAgent: (id: string) => Promise<void>;
}

export interface AgentProviderProps {
    children: React.ReactNode;
    initialAgentId: string;
} 