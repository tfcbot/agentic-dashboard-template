// No need for AgentProvider in the intake flow
export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="agent-flow">
      {children}
    </div>
  );
}