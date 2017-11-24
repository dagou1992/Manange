import baseConfig from './base';

const config = {
  appEnv: 'dev',
  useProxy: true
};

export default Object.freeze(Object.assign({}, baseConfig, config));
