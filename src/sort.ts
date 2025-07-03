import { BigNumber } from "bignumber.js";

type PackageType = "STANDARD" | "SPECIAL" | "REJECTED" | "UNKNOWN";
const BULKY_VOLUME = 1_000_000;
const HEAVY_MASS = 20;

export const sort = (
  width: number,
  height: number,
  length: number,
  mass: number,
): PackageType => {
  const widthBn = new BigNumber(width);
  const heightBn = new BigNumber(height);
  const lengthBn = new BigNumber(length);
  const massBn = new BigNumber(mass);

  const dimensions = [widthBn, heightBn, lengthBn, massBn];
  if (dimensions.some((dim) => dim.isNaN() || dim.lt(0))) {
    return "UNKNOWN";
  }

  let isBulky = false;
  let isHeavy = false;

  const volume = widthBn.times(heightBn).times(lengthBn);

  if (volume.gte(BULKY_VOLUME)) {
    isBulky = true;
  }

  if (massBn.gte(HEAVY_MASS)) {
    isHeavy = true;
  }

  if (!isBulky && !isHeavy) {
    return "STANDARD";
  }

  if (isBulky && isHeavy) {
    return "REJECTED";
  }

  return "SPECIAL";
};
