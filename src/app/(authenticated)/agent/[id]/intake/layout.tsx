// No need for AgentProvider in the intake flow
export default function IntakeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="intake-flow">
        {children}
      </div>
    );
  }