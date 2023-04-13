const once = { remFlexible: false };

function remFlexible(
  win: Window,
  // 720p: 1280*720   unit = 1280/16px = 80
  // 1080p: 1920*1080   unit = 1920/16px = 120
  // 以某个分辨率宽度为基准 通过baseWidth计算remRate 且低于baseWidth时不进行缩放
  baseWidth: number = 1920,
  // 以某个fontSize的值为基准
  baseFontSize: number = 100,
  // baseWidth减小至minWidth
  minWidth?: number
) {
  if (once.remFlexible || !win) return;
  const { document } = win;
  const docEl = document.documentElement;
  const dpr = win.devicePixelRatio || 1;

  // 对整体基准值进行缩放
  const scale = minWidth ? minWidth / baseWidth : 1;
  const baseRemRate = (baseWidth * scale) / baseFontSize;

  function setRemUnit() {
    let rem = Math.max(docEl.clientWidth, minWidth || baseWidth) / baseRemRate;
    if (docEl.clientWidth <= 550) {
      rem *= 2;
    }
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  win.addEventListener("resize", setRemUnit);
  win.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  once.remFlexible = true;
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
    console.log(vh);
    document.documentElement.style.setProperty("--vh", `${vh.toFixed(3)}px`);
  });
}

const layout = {
  remFlexible,
  vhProperty,
};

export default layout;
