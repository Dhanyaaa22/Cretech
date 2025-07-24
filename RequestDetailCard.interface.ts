export interface CardSectionProps {
  label: string;
  value: string | null;
  isLoading: boolean;
  isButton?: boolean;
  onClick?: () => void;
}

export interface RequestData {
  status: string;
  request_type: string;
  request_timestamp: string;
}

export interface RequestDetailCardProps {
  data: RequestData | null;
  isLoading: boolean;
}