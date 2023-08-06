import * as React from "react";

const SvgComponent = () => <svg width="100%" height="100%" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
                             style={{
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinejoin: "round",
  strokeMiterlimit: 2
}}>
  <rect id="go" x={0} y={0} width={20} height={24} style={{
    fill: "none"
  }}/>
  <g>
    <path
      d="M0.625,16.454C1.763,17.573 3.304,18.261 5,18.261C8.496,18.261 11.334,15.339 11.334,11.739C11.334,8.14 8.496,5.217 5,5.217C3.304,5.217 1.763,5.905 0.625,7.025L0.625,0L19.375,11.478L0.625,24L0.625,16.454Z"
      style={{
        fill: "currentcolor"
      }}/>
  </g>
</svg>;
export default SvgComponent;
