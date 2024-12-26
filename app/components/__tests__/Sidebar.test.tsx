import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('should render in expanded state by default', () => {
    render(<Sidebar />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-64');
    expect(sidebar).not.toHaveClass('w-20');
  });

  it('should collapse when toggle button is clicked', () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole('button');
    const sidebar = screen.getByRole('complementary');
    
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass('w-20');
    expect(sidebar).not.toHaveClass('w-64');
  });

  it('should add sidebar-collapsed class to html element when collapsed', () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole('button');
    
    fireEvent.click(toggleButton);
    expect(document.documentElement).toHaveClass('sidebar-collapsed');
    
    fireEvent.click(toggleButton);
    expect(document.documentElement).not.toHaveClass('sidebar-collapsed');
  });

  it('should hide text content when collapsed', () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole('button');
    const homeText = screen.getByText('Home');
    
    expect(homeText).toBeVisible();
    fireEvent.click(toggleButton);
    expect(homeText).not.toBeVisible();
  });

  it('should maintain icons visible in both states', () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole('button');
    const icons = screen.getAllByRole('img', { hidden: true });
    
    icons.forEach(icon => expect(icon).toBeVisible());
    fireEvent.click(toggleButton);
    icons.forEach(icon => expect(icon).toBeVisible());
  });
}); 