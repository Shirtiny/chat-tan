const isDev = () => {
  return import.meta.env.DEV;
};

const env = {
  isDev,
};

export default env;
