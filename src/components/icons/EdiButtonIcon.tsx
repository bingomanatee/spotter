import * as React from "react";

const EditButtonIcon = () => <svg width="100%" height="100%" viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  xmlSpace="preserve"
                                  style={{
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                    strokeLinejoin: "round",
                                    strokeMiterlimit: 2
                                  }}>
  <rect id="edit-button" x={0} y={0} width={24} height={24} style={{
    fill: "none"
  }}/>
  <g id="edit-button1">
    <circle cx={12} cy={12} r={12} style={{
      fill: "currentColor"
    }}/>
    <g>
      <path
        d="M8.376,3.133C8.008,2.766 7.51,2.559 6.99,2.559C6.47,2.559 5.971,2.766 5.603,3.133C5.213,3.524 4.785,3.952 4.381,4.355C3.948,4.789 3.704,5.377 3.704,5.99C3.704,6.603 3.948,7.19 4.381,7.624C7.515,10.757 14.061,17.303 14.061,17.303L18.303,13.061C18.303,13.061 11.396,6.154 8.376,3.133Z"/>
      <path d="M14.768,18.01L19.01,13.768L19.01,22.253L14.768,18.01Z"/>
    </g>
  </g>
</svg>;
export default EditButtonIcon;
