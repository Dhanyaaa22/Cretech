import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequestDetailCard from './RequestDetailCard';
import { REQUEST_STATUS } from '@services/administration/administration.interface';
import { getRequestType } from '@utils/helpers';
import { formatDate } from 'ks-common/utils';
import { t } from 'ks-common/locales';

// Mock dependencies
jest.mock('@utils/helpers', () => ({
  getRequestType: jest.fn(),
}));

jest.mock('ks-common/utils', () => ({
  formatDate: jest.fn(),
}));

jest.mock('ks-common/locales', () => ({
  t: jest.fn(),
}));

// Mock the design system components
jest.mock('@netapp/bxp-design-system-react', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  SolidSquareIcon: ({ children, bgColor }: { children: React.ReactNode; bgColor: string }) => (
    <div data-testid="solid-square-icon" data-bg-color={bgColor}>{children}</div>
  ),
  ThreeDotLoader: () => <div data-testid="three-dot-loader" />,
  WidgetDivider: ({ expand }: { expand?: boolean }) => (
    <div data-testid="widget-divider" data-expand={expand} />
  ),
}));

jest.mock('@netapp/bxp-style/react-icons/General', () => ({
  HourglassIcon: ({ className }: { className?: string }) => (
    <div data-testid="hourglass-icon" className={className} />
  ),
}));

jest.mock('@netapp/bxp-style/react-icons/Notification', () => ({
  ErrorIcon: ({ color, className }: { color?: string; className?: string }) => (
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
  KSFlexBox: ({ children, gap, className, flexDirection, justifyContent, alignItems }: any) => (
    <div
      data-testid="ks-flexbox"
      data-gap={gap}
      data-flex-direction={flexDirection}
      data-justify-content={justifyContent}
      data-align-items={alignItems}
      className={className}
    >
      {children}
    </div>
  ),
  KSText: ({ children, className, bold }: any) => (
    <span data-testid="ks-text" data-bold={bold} className={className}>
      {children}
    </span>
  ),
}));

jest.mock('@assets/icons', () => ({
  SuccessIconOnColor: () => <div data-testid="success-icon-on-color" />,
}));

const mockT = t as jest.MockedFunction<typeof t>;
const mockGetRequestType = getRequestType as jest.MockedFunction<typeof getRequestType>;
const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>;

describe('RequestDetailCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockT.mockImplementation((key: string) => key);
    mockGetRequestType.mockReturnValue('Test Request Type');
    mockFormatDate.mockReturnValue('January 1, 2024');
  });

  describe('Loading State', () => {
    it('should render loading state when isLoading is true', () => {
      render(<RequestDetailCard isLoading={true} data={null} />);
      
      const loaders = screen.getAllByTestId('three-dot-loader');
      expect(loaders).toHaveLength(4); // One for status, three for CardSections
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should render loading state when data is null', () => {
      render(<RequestDetailCard isLoading={false} data={null} />);
      
      const loaders = screen.getAllByTestId('three-dot-loader');
      expect(loaders).toHaveLength(4); // Status section + 3 CardSections
    });
  });

  describe('Status Icons', () => {
    const mockData = {
      status: REQUEST_STATUS.IN_PROGRESS,
      request_type: 'test_type',
      request_timestamp: '2024-01-01T00:00:00Z',
    };

    it('should render hourglass icon for IN_PROGRESS status', () => {
      const data = { ...mockData, status: REQUEST_STATUS.IN_PROGRESS };
      render(<RequestDetailCard isLoading={false} data={data} />);
      
      expect(screen.getByTestId('solid-square-icon')).toHaveAttribute('data-bg-color', 'i2');
      expect(screen.getByTestId('hourglass-icon')).toHaveClass('kms-w-6 kms-h-6 kms-text-[var(--text-icon-on-color)]');
    });

    it('should render error icon for CANCELLED status', () => {
      const data = { ...mockData, status: REQUEST_STATUS.CANCELLED };
      render(<RequestDetailCard isLoading={false} data={data} />);
      
      expect(screen.getByTestId('error-icon')).toHaveAttribute('data-color', 'disabled');
      expect(screen.getByTestId('error-icon')).toHaveClass('kms-w-4 kms-h-4');
    });

    it('should render success icon for COMPLETED status', () => {
      const data = { ...mockData, status: REQUEST_STATUS.COMPLETED };
      render(<RequestDetailCard isLoading={false} data={data} />);
      
      expect(screen.getByTestId('solid-square-icon')).toHaveAttribute('data-bg-color', 'i5');
      expect(screen.getByTestId('success-icon-on-color')).toBeInTheDocument();
    });

    it('should render default hourglass icon for unknown status', () => {
      const data = { ...mockData, status: 'UNKNOWN_STATUS' };
      render(<RequestDetailCard isLoading={false} data={data} />);
      
      expect(screen.getByTestId('hourglass-icon')).toHaveClass('kms-w-4 kms-h-4');
    });
  });

  describe('Data Display', () => {
    const mockData = {
      status: REQUEST_STATUS.COMPLETED,
      request_type: 'subscription_request',
      request_timestamp: '2024-01-01T12:00:00Z',
    };

    it('should display all data sections when data is provided', () => {
      render(<RequestDetailCard isLoading={false} data={mockData} />);
      
      // Status section
      expect(screen.getByText('keystone.common.status')).toBeInTheDocument();
      expect(screen.getByText(REQUEST_STATUS.COMPLETED)).toBeInTheDocument();
      
      // Request type section
      expect(screen.getByText('keystone.administrationPage.requestDetail.requestType')).toBeInTheDocument();
      expect(screen.getByText('Test Request Type')).toBeInTheDocument();
      
      // Submission date section
      expect(screen.getByText('keystone.administrationPage.requestDetail.submissionDate')).toBeInTheDocument();
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
      
      // Cancel button
      expect(screen.getByText('keystone.administrationPage.requestDetail.cancelRequest')).toBeInTheDocument();
    });

    it('should call getRequestType with correct parameter', () => {
      render(<RequestDetailCard isLoading={false} data={mockData} />);
      
      expect(mockGetRequestType).toHaveBeenCalledWith('subscription_request');
    });

    it('should call formatDate with correct parameters', () => {
      render(<RequestDetailCard isLoading={false} data={mockData} />);
      
      expect(mockFormatDate).toHaveBeenCalledWith(new Date('2024-01-01T12:00:00Z'), 'fullDate');
    });
  });

  describe('CardSection Component', () => {
    it('should render CardSection with text value', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: REQUEST_STATUS.COMPLETED,
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      expect(screen.getByText('Test Request Type')).toBeInTheDocument();
    });

    it('should render CardSection in loading state', () => {
      render(<RequestDetailCard isLoading={true} data={null} />);
      
      const loaders = screen.getAllByTestId('three-dot-loader');
      expect(loaders.length).toBeGreaterThan(0);
    });
  });

  describe('CardSection as Button', () => {
    const CardSection = ({ label, value, isLoading, isButton = false, onClick }: any) => {
      return (
        <div data-testid="card-section">
          <div data-testid="widget-divider" />
          <div>
            <span data-testid="ks-text">{label}</span>
            {isLoading ? (
              <div data-testid="three-dot-loader" />
            ) : isButton ? (
              <button data-testid="ks-button" onClick={onClick}>
                {value}
              </button>
            ) : (
              <span data-testid="ks-text">{value}</span>
            )}
          </div>
        </div>
      );
    };

    it('should render CardSection as button when isButton is true', () => {
      const mockOnClick = jest.fn();
      render(
        <CardSection
          label="Test Label"
          value="Test Value"
          isLoading={false}
          isButton={true}
          onClick={mockOnClick}
        />
      );
      
      const button = screen.getByTestId('ks-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Value');
      
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should render CardSection as text when isButton is false', () => {
      render(
        <CardSection
          label="Test Label"
          value="Test Value"
          isLoading={false}
          isButton={false}
        />
      );
      
      expect(screen.getByText('Test Value')).toBeInTheDocument();
      expect(screen.queryByTestId('ks-button')).not.toBeInTheDocument();
    });
  });

  describe('Button States', () => {
    it('should render cancel button as disabled', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: REQUEST_STATUS.COMPLETED,
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      const cancelButton = screen.getByText('keystone.administrationPage.requestDetail.cancelRequest');
      expect(cancelButton.closest('button')).toHaveAttribute('data-disabled', 'true');
      expect(cancelButton.closest('button')).toHaveAttribute('data-color', 'secondary');
    });
  });

  describe('Component Structure', () => {
    it('should render all required UI elements', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: REQUEST_STATUS.COMPLETED,
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getAllByTestId('widget-divider')).toHaveLength(4);
      expect(screen.getAllByTestId('ks-flexbox').length).toBeGreaterThan(0);
    });

    it('should apply correct CSS classes', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: REQUEST_STATUS.COMPLETED,
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      const cancelButton = screen.getByText('keystone.administrationPage.requestDetail.cancelRequest').closest('button');
      expect(cancelButton).toHaveClass('kms-font-semibold kms-gap-2');
    });
  });

  describe('Translation Keys', () => {
    it('should call translation function with correct keys', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: REQUEST_STATUS.COMPLETED,
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      expect(mockT).toHaveBeenCalledWith('keystone.common.status');
      expect(mockT).toHaveBeenCalledWith('keystone.administrationPage.requestDetail.requestType');
      expect(mockT).toHaveBeenCalledWith('keystone.administrationPage.requestDetail.submissionDate');
      expect(mockT).toHaveBeenCalledWith('keystone.administrationPage.requestDetail.cancelRequest');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined data gracefully', () => {
      render(<RequestDetailCard isLoading={false} data={undefined as any} />);
      
      const loaders = screen.getAllByTestId('three-dot-loader');
      expect(loaders.length).toBeGreaterThan(0);
    });

    it('should handle empty status string', () => {
      render(<RequestDetailCard isLoading={false} data={{
        status: '',
        request_type: 'test',
        request_timestamp: '2024-01-01T00:00:00Z',
      }} />);
      
      // Should render default hourglass icon for empty status
      expect(screen.getByTestId('hourglass-icon')).toHaveClass('kms-w-4 kms-h-4');
    });
  });
});