import styled from "styled-components";

const LoadingOverlay = ({ masked = false, text = undefined }) => {
  return (
    <LoadingContainer $masked={masked}>
      {text && <LoadingText>{text}</LoadingText>}
      <LoadingDots />
    </LoadingContainer>
  );
};

export default LoadingOverlay;

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1001;

  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${(props) => (props.$masked ? "#f0f0f0ae" : "")};
`;

const LoadingText = styled.p`
  font-size: 14px;
  background-color: #f0f0f0eb;
  padding: 10px;
  margin: 0;
  margin-bottom: 5px;
  font-style: italic;
`;

const LoadingDots = styled.div`
  z-index: 102;
  width: 80px;
  height: 26px;
  background-color: #3444a0;
  border-radius: 50px;
  --c: no-repeat radial-gradient(farthest-side, #000 92%, #0000);
  --s: 18px 18px;
  mask: var(--c) left 4px top 50%, var(--c) center, var(--c) right 4px top 50%,
    linear-gradient(#000 0 0);
  -webkit-mask: var(--c) left 4px top 50%, var(--c) center,
    var(--c) right 4px top 50%, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: loading 2s infinite;

  @keyframes loading {
    0% {
      -webkit-mask-size: 0 0, 0 0, 0 0, auto;
    }
    16.67% {
      -webkit-mask-size: var(--s), 0 0, 0 0, auto;
    }
    33.33% {
      -webkit-mask-size: var(--s), var(--s), 0 0, auto;
    }
    50% {
      -webkit-mask-size: var(--s), var(--s), var(--s), auto;
    }
    66.67% {
      -webkit-mask-size: 0 0, var(--s), var(--s), auto;
    }
    83.33% {
      -webkit-mask-size: 0 0, 0 0, var(--s), auto;
    }
    100% {
      -webkit-mask-size: 0 0, 0 0, 0 0, auto;
    }
  }
`;
