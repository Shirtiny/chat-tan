import { isFn } from "@shirtiny/utils/lib/lang";
import logger from "./logger";

const once = { remFlexible: false };

interface IRemFlexibleParams {
  win: Window;
  // 720p: 1280*720   unit = 1280/16px = 80
  // 1080p: 1920*1080   unit = 1920/16px = 120
  // 以某个分辨率宽度为基准 通过baseWidth计算remRate 且低于baseWidth时不进行缩放
  baseWidth: number;
  // 以某个fontSize的值为基准
  baseFontSize: number;
  // baseWidth减小至minWidth
  minWidth: number;
  // 移动端临界
  mobileWidth?: number;
  // 移动端基准
  mobileBaseWidth?: number;
  // 只进行执行一次设置
  useOnce?: boolean;
}

function remFlexible({
  win,
  baseWidth: baseWidthParam = 1920,
  baseFontSize: baseFontSizeParam = 100,
  minWidth: minWidthParam,
  mobileWidth,
  mobileBaseWidth,
  useOnce,
}: IRemFlexibleParams) {
  if (!win || (useOnce && once.remFlexible)) return;

  logger.debug("set rem flexible");

  const { document } = win;
  const docEl = document.documentElement;

  function baseParamsCompute(clientWidth: number) {
    const flag = clientWidth <= mobileWidth!;
    const newBaseWidth = flag ? mobileBaseWidth! : baseWidthParam;
    const newBaseFontSize = (baseWidthParam / newBaseWidth) * baseFontSizeParam;
    const newMinWidth = flag ? 0 : minWidthParam;
    logger.debug("rem baseParamsCompute:", {
      newBaseWidth,
      newBaseFontSize,
      newMinWidth,
    });
    return { newBaseWidth, newBaseFontSize, newMinWidth };
  }

  function onResize() {
    let baseWidth = baseWidthParam;
    let baseFontSize = baseFontSizeParam;
    let minWidth = minWidthParam;

    if (mobileWidth && mobileBaseWidth) {
      const { newBaseWidth, newBaseFontSize, newMinWidth } = baseParamsCompute(
        docEl.clientWidth
      );
      baseWidth = newBaseWidth;
      baseFontSize = newBaseFontSize;
      minWidth = newMinWidth;
    }

    const baseRemRate = baseWidth / baseFontSize;
    
    const rem =
    Math.max(docEl.clientWidth, minWidth || baseWidth) / baseRemRate;
    
    // 对整体进行二次缩放
    const scale = minWidth ? baseWidth / minWidth : 1;
    docEl.style.fontSize = scale * rem + "px";
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
