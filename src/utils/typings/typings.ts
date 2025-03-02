import { ChangeEvent } from 'react';

export interface IGlobetrotterApiResponse {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
  options: string[];
}

export interface IRadioButtonProps {
  name: string;
  id: string;
  value: string;
  label: string;
  selectedOption: string | null;
  disabled: boolean;
  handleRadioButtonSelection: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IQuestionCardProps
  extends Pick<IRadioButtonProps, 'selectedOption' | 'handleRadioButtonSelection'> {
  countryQuestion: IGlobetrotterApiResponse[] | undefined;
  currentQuestion: number;
}
