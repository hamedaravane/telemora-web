import {
  init as initSDK,
  initData,
  miniApp,
  mountBackButton,
  mountMiniApp,
  mountThemeParams,
  setDebug,
  themeParams,
  viewport,
} from '@telegram-apps/sdk-react';

export function init(debug: boolean): void {
  setDebug(debug);

  initSDK();

  mountBackButton();
  mountMiniApp();
  mountThemeParams();
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
