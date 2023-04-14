const isDev = () => {
  return import.meta.env.DEV;
};

const isMobile = (win: Window, width?: number) => {
  const isMobileAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      win.navigator.userAgent
    );

  if (width) {
    const isNarrow = win.document.documentElement.clientWidth <= width;
    return isMobileAgent || isNarrow;
  }

  return isMobileAgent;
};

const env = {
  isDev,
  isMobile,
};

export default env;
