import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderForm } from '../OrderForm';
import { useAgent } from '@/context/AgentContext';
import { useRouter } from 'next/navigation';

// Mock the hooks
jest.mock('@/context/AgentContext');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('OrderForm', () => {
  const mockSubmitIntake = jest.fn();
  const mockRouter = { push: jest.fn() };
  
  beforeEach(() => {
    // Setup mocks
    (useAgent as jest.Mock).mockReturnValue({
      submitIntake: mockSubmitIntake,
      status: 'idle',
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits form data and shows success state', async () => {
    // Arrange
    render(
      <OrderForm 
        agentId="test-id" 
        initialPackage="basic" 
      />
    );

    // Fill out form
    fireEvent.change(screen.getByPlaceholderText(/project requirements/i), {
      target: { value: 'Test project description that is long enough' },
    });
    fireEvent.change(screen.getByPlaceholderText(/schedule/i), {
      target: { value: 'Next week' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'read' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /purchase/i }));

    // Assert
    await waitFor(() => {
      expect(mockSubmitIntake).toHaveBeenCalledWith({
        description: 'Test project description that is long enough',
        schedule: 'Next week',
        access: ['read'],
        packageType: 'basic',
        agentId: 'test-id',
      });
    });

    // Check loading state
    expect(screen.getByText(/processing/i)).toBeInTheDocument();

    // Mock success response
    (useAgent as jest.Mock).mockReturnValue({
      submitIntake: mockSubmitIntake,
      status: 'success',
    });

    // Check success state and redirect
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    }, { timeout: 5000 });
  });

  it('shows validation errors for empty fields', async () => {
    // Arrange
    render(
      <OrderForm 
        agentId="test-id" 
        initialPackage="basic" 
      />
    );

    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /purchase/i }));

    // Assert validation errors
    await waitFor(() => {
      expect(screen.getByText(/description must be at least/i)).toBeInTheDocument();
      expect(screen.getByText(/schedule must be at least/i)).toBeInTheDocument();
      expect(screen.getByText(/select at least one access level/i)).toBeInTheDocument();
    });

    // Verify submit was not called
    expect(mockSubmitIntake).not.toHaveBeenCalled();
  });
}); 