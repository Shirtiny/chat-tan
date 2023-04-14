import { isFn } from "@shirtiny/utils/lib/lang";
import logger from "./logger";

const once = { remFlexible: false };

interface IRemFlexibleParams {
  win: Window;
  // 720p: 1280*720   unit = 1280/16px = 80
  // 1080p: 1920*1080   unit = 1920/16px = 120
  // 以某个分辨率宽度为基准 通过baseWidth计算remRate 且低于baseWidth时不进行缩放
  baseWidth?: number;
  // 以某个fontSize的值为基准
  baseFontSize?: number;
  // baseWidth减小至minWidth
  minWidth?: number;
  baseParamsCompute?: (clientWidth: number) => {
    baseWidth: number;
    baseFontSize: number;
    minWidth?: number;
  };
  // 只进行执行一次设置
  useOnce?: boolean;
}

function remFlexible({
  win,
  baseWidth = 1920,
  baseFontSize = 100,
  minWidth,
  baseParamsCompute,
  useOnce,
}: IRemFlexibleParams) {
  if (!win || (useOnce && once.remFlexible)) return;

  logger.debug("set rem flexible");

  const { document } = win;
  const docEl = document.documentElement;

  function onResize() {
    if (isFn(baseParamsCompute)) {
      const {
        baseWidth: newBaseWidth,
        baseFontSize: newBaseFontSize,
        minWidth: newMinWidth,
      } = baseParamsCompute(docEl.clientWidth);
      baseWidth = newBaseWidth;
      baseFontSize = newBaseFontSize;
      minWidth = newMinWidth;
    }

    // 对整体基准值进行缩放
    const scale = minWidth ? minWidth / baseWidth : 1;
    const baseRemRate = (baseWidth * scale) / baseFontSize;

    
    const rem =
    Math.max(docEl.clientWidth, minWidth || baseWidth) / baseRemRate;
    
    console.log(baseWidth);
    console.log(baseRemRate);
    console.log(rem);

    docEl.style.fontSize = rem + "px";
  }

  function onPageshow(e: PageTransitionEvent) {
    if (e.persisted) {
      onResize();
    }
  }

  onResize();

  // reset rem unit on page resize
  win.addEventListener("resize", onResize);
  win.addEventListener("pageshow", onPageshow);

  function clean() {
    logger.debug("clean rem flexible");
    win.removeEventListener("resize", onResize);
    win.removeEventListener("pageshow", onPageshow);
  }

  once.remFlexible = true;
  return clean;
}

function vhProperty() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh.toFixed(3)}px`);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh.toFixed(3)}px`);
  });
}

const layout = {
  remFlexible,
  vhProperty,
};

export default layout;
