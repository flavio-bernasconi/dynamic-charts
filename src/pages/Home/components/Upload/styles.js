import styled, { keyframes, css } from "styled-components";

const scaleUp = keyframes`
  0% {
      transform: scale(1) translate(-50%, -50%);
  }
  100% {
      transform: scale(7) translate(-50%, -50%);
  }
`;
const progressCircleAnimation = keyframes`
  0% {
    stroke-dashoffset: 100
  }
  100% {
    stroke-dashoffset: 0
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

const circleStyle = css`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${(props) => props.color};
  box-shadow: -12px -12px 12px 0 #f7f7f7, 12px 12px 12px 0 rgba(0, 0, 0, 0.03);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: scale(1) translate(-50%, -50%);
`;

export const CircleAnimated = styled.div`
  ${circleStyle}
  transform-origin: 0px 0px;
  animation: ${scaleUp} 4s infinite;
  animation-delay: ${(props) => `${props.index / 4}s`};
  opacity: 0.3;
`;

export const LoadCircleWrapper = styled.svg`
  position: absolute;
  z-index: 10;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoadCircle = styled.circle`
  stroke-dasharray: 100;
  /* animation: ${progressCircleAnimation} 2s forwards; */
  fill: none;
  stroke: #f77a52;
  stroke-width: 5;

  stroke-dashoffset: ${(props) => `calc(100 - ${props.progress})`};
`;
