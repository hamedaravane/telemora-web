import {
  init as initSDK,
  initData,
  miniApp,
  mountBackButton,
  mountMiniAppSync,
  mountThemeParamsSync,
  setDebug,
  themeParams,
  viewport,
} from '@telegram-apps/sdk-react';

export function init(debug: boolean): void {
  if (typeof window === 'undefined') return;
  setDebug(debug);

  initSDK();

  mountBackButton();
  mountMiniAppSync();
  mountThemeParamsSync();
  initData.restore();
  void viewport
    .mount()
    .then(() => {
      viewport.bindCssVars();
    })
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e);
    });

  miniApp.bindCssVars();
  themeParams.bindCssVars();

  if (debug) {
    import('eruda').then((lib) => lib.default.init()).catch(console.error);
  }
}
