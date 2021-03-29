import styled, { css } from "styled-components";
import { baseFocus } from "../../../styles/shared";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

export const StyledInput = styled.input`
  ${baseFocus}
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  box-shadow: 0 0 2px 2px rgba(51, 51, 51, 0.3);
  padding: 0.5rem 1rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: #afafaf;
  }

  ${({ theme }) =>
    theme.title === "light"
      ? css`
          background-color: #fff;
        `
      : css`
          background-color: ${theme.colors.gray};
          box-shadow: 0 0 0 2px ${theme.colors.gray};
        `}
`;
