import React, { SVGProps, FC } from "react";
import Green1 from "./green_1.svg?react";
import Green2 from "./green_2.svg?react";
import Green3 from "./green_3.svg?react";
import Green4 from "./green_4.svg?react";
import Green5 from "./green_5.svg?react";
import Green6 from "./green_6.svg?react";
import Green7 from "./green_7.svg?react";
import Green8 from "./green_8.svg?react";
import Green9 from "./green_9.svg?react";
import Green10 from "./green_10.svg?react";
import Green11 from "./green_11.svg?react";
import Green12 from "./green_12.svg?react";
import Green13 from "./green_13.svg?react";
import Green14 from "./green_14.svg?react";
import Green15 from "./green_15.svg?react";
import Green16 from "./green_16.svg?react";
import Green17 from "./green_17.svg?react";
import Green18 from "./green_18.svg?react";

export type GreenSvgComponent = FC<SVGProps<SVGSVGElement>>;
export const greenSvgs: Record<number, React.FC<React.SVGProps<SVGSVGElement>>> = {
  1: Green1,
  2: Green2,
  3: Green3,
  4: Green4,
  5: Green5,
  6: Green6,
  7: Green7,
  8: Green8,
  9: Green9,
  10: Green10,
  11: Green11,
  12: Green12,
  13: Green13,
  14: Green14,
  15: Green15,
  16: Green16,
  17: Green17,
  18: Green18
};