import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequestDetailCard from './RequestDetailCard';
import { REQUEST_STATUS } from '@services/administration/administration.interface';

// Mock all external dependencies
jest.mock('@netapp/bxp-design-system-react', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  SolidSquareIcon: ({ children, bgColor }: any) => (
    <div data-testid="solid-square-icon" data-bg-color={bgColor}>{children}</div>
  ),
  ThreeDotLoader: () => <div data-testid="three-dot-loader" />,
  WidgetDivider: ({ expand }: any) => <div data-testid="widget-divider" data-expand={expand} />,
}));

jest.mock('@netapp/bxp-style/react-icons/General', () => ({
  HourglassIcon: ({ className }: any) => <div data-testid="hourglass-icon" className={className} />,
}));

jest.mock('@netapp/bxp-style/react-icons/Notification', () => ({
  ErrorIcon: ({ color, className }: any) => (
    <div data-testid="error-icon" data-color={color} className={className} />
  ),
}));

jest.mock('ks-common', () => ({
  KSButton: ({ children, variant, className, onClick, isDisabled, color }: any) => (
    <button
      data-testid="ks-button"
      data-variant={variant}
      data-disabled={isDisabled}
      data-color={color}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
  KSFlexBox: ({ children, ...props }: any) => (
    <div data-testid="ks-flexbox" {...props}>{children}</div>
  ),
  KSText: ({ children, className, bold }: any) => (
    <span data-testid="ks-text" data-bold={bold} className={className}>{children}</span>
  ),
}));

jest.mock('ks-common/locales', () => ({
  t: (key: string) => key,
}));

jest.mock('ks-common/utils', () => ({
  formatDate: () => 'January 1, 2024',
}));

jest.mock('@utils/helpers', () => ({
  getRequestType: () => 'Test Request Type',
}));

jest.mock('@assets/icons', () => ({
  SuccessIconOnColor: () => <div data-testid="success-icon" />,
}));

const mockData = {
  status: REQUEST_STATUS.COMPLETED,
  request_type: 'test_type',
  request_timestamp: '2024-01-01T00:00:00Z',
};

describe('RequestDetailCard', () => {
  describe('Loading state', () => {
    it('renders loading when isLoading is true', () => {
      render(<RequestDetailCard isLoading={true} data={undefined} />);
      expect(screen.getAllByTestId('three-dot-loader')).toHaveLength(4);
    });

    it('renders loading when data is undefined', () => {
      render(<RequestDetailCard isLoading={false} data={undefined} />);
      expect(screen.getAllByTestId('three-dot-loader')).toHaveLength(4);
    });
  });

  describe('Status icons', () => {
    it('renders IN_PROGRESS icon', () => {
      const data = { ...mockData, status: REQUEST_STATUS.IN_PROGRESS };
      render(<RequestDetailCard isLoading={false} data={data} />);
      expect(screen.getByTestId('solid-square-icon')).toHaveAttribute('data-bg-color', 'i2');
      expect(screen.getByTestId('hourglass-icon')).toHaveClass('kms-w-6');
    });

    it('renders CANCELLED icon', () => {
      const data = { ...mockData, status: REQUEST_STATUS.CANCELLED };
      render(<RequestDetailCard isLoading={false} data={data} />);
      expect(screen.getByTestId('error-icon')).toHaveAttribute('data-color', 'disabled');
    });

    it('renders COMPLETED icon', () => {
      const data = { ...mockData, status: REQUEST_STATUS.COMPLETED };
      render(<RequestDetailCard isLoading={false} data={data} />);
      expect(screen.getByTestId('solid-square-icon')).toHaveAttribute('data-bg-color', 'i5');
      expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    });

    it('renders default icon for unknown status', () => {
      const data = { ...mockData, status: 'UNKNOWN' };
      render(<RequestDetailCard isLoading={false} data={data} />);
      expect(screen.getByTestId('hourglass-icon')).toHaveClass('kms-w-4');
    });
  });

  describe('Data display', () => {
    it('displays all data sections when data is provided', () => {
      render(<RequestDetailCard isLoading={false} data={mockData} />);
      
      expect(screen.getByText('keystone.common.status')).toBeInTheDocument();
      expect(screen.getByText(REQUEST_STATUS.COMPLETED)).toBeInTheDocument();
      expect(screen.getByText('keystone.administrationPage.requestDetail.requestType')).toBeInTheDocument();
      expect(screen.getByText('Test Request Type')).toBeInTheDocument();
      expect(screen.getByText('keystone.administrationPage.requestDetail.submissionDate')).toBeInTheDocument();
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
      expect(screen.getByText('keystone.administrationPage.requestDetail.cancelRequest')).toBeInTheDocument();
    });
  });

  describe('CardSection as button', () => {
    it('renders button when isButton is true and handles click', () => {
      const mockOnClick = jest.fn();
      const CardSection = ({ label, value, isLoading, isButton, onClick }: any) => (
        <div>
          <span>{label}</span>
          {isLoading ? (
            <div data-testid="three-dot-loader" />
          ) : isButton ? (
            <button data-testid="card-button" onClick={onClick}>{value}</button>
          ) : (
            <span>{value}</span>
          )}
        </div>
      );

      render(
        <CardSection
          label="Test"
          value="Click me"
          isLoading={false}
          isButton={true}
          onClick={mockOnClick}
        />
      );

      const button = screen.getByTestId('card-button');
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe('Button states', () => {
    it('renders cancel button as disabled', () => {
      render(<RequestDetailCard isLoading={false} data={mockData} />);
      const button = screen.getByText('keystone.administrationPage.requestDetail.cancelRequest').closest('button');
      expect(button).toHaveAttribute('data-disabled', 'true');
      expect(button).toHaveAttribute('data-color', 'secondary');
    });
  });
});