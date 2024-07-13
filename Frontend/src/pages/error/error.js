import styled from "styled-components";

export const ErrorContainer = ({ className, error }) =>
  error && (
    <div className={className}>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </div>
  );

export const Error = styled(ErrorContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 44px;
`;
