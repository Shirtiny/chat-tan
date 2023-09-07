import { isNumber } from "@shirtiny/utils/lib/lang";
import { restrict } from "@shirtiny/utils/lib/math";
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
  minWidth?: number;
  maxWidth?: number;
  // 只进行执行一次设置
  useOnce?: boolean;
  handleResize?: (clientWidth: number) => void;
}

function remFlexible({
  win,
  baseWidth = 1920,
  baseFontSize = 100,
  minWidth,
  maxWidth = Infinity,
  useOnce,
}: IRemFlexibleParams) {
  if (!win || (useOnce && once.remFlexible)) return;

  logger.debug("set rem flexible");

  const { document } = win;
  const docEl = document.documentElement;

  function onResize() {
    const baseRemRate = baseWidth / baseFontSize;

    const fontSize =
      restrict(
        docEl.clientWidth,
        isNumber(minWidth) ? minWidth : baseWidth,
        maxWidth
      ) / baseRemRate;
    // 对整体进行二次缩放
    docEl.style.fontSize = fontSize + "px";
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

function vhProperty(win: Window) {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = win.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  win.document.documentElement.style.setProperty("--vh", `${vh.toFixed(3)}px`);

  function onResize() {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    win.document.documentElement.style.setProperty(
      "--vh",
      `${vh.toFixed(3)}px`
    );
  }

  // We listen to the resize event
  win.addEventListener("resize", onResize);

  function clean() {
    win.document.documentElement.style.removeProperty("--vh");
    win.removeEventListener("resize", onResize);
  }

  return clean;
}

const layout = {
  remFlexible,
  vhProperty,
};

export default layout;
