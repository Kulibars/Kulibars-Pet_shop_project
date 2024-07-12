import styled from "styled-components";

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="loaderEl"></div>
    </div>
  );
};

export const Loader = styled(LoaderContainer)`
  display: flex;
  height: ${({ ContainerHeight = "1374px" }) => ContainerHeight};
  flex-direction: column;
  justify-content: center;
  & > .loaderEl {
    margin: 10px auto;
    border: ${({ borderSize = "30px" }) => borderSize} solid #f3f3f3;
    border-radius: 50%;
    border-top: ${({ borderSize = "30px" }) => borderSize} solid #3498db;
    width: ${({ ringSize = "220px" }) => ringSize};
    height: ${({ ringSize = "220px" }) => ringSize};
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

// </code >
