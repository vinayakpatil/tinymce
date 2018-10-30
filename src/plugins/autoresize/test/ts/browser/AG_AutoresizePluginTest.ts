import { Assertions, Logger, Pipeline, RawAssertions, Step, Waiter, Log } from '@ephox/agar';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import AutoresizePlugin from 'tinymce/plugins/autoresize/Plugin';
import FullscreenPlugin from 'tinymce/plugins/fullscreen/Plugin';
import 'tinymce/themes/silver/Theme';
import { UnitTest } from '@ephox/bedrock';
import { navigator } from '@ephox/dom-globals';

UnitTest.asynctest('browser.tinymce.plugins.autoresize.AutoresizePluginTest', (success, failure) => {

  AutoresizePlugin();
  FullscreenPlugin();

  const sAssertEditorHeightAbove = function (editor, minHeight) {
    return Logger.t(`Assert editor height is above ${minHeight}`, Step.sync(function () {
      const editorHeight = editor.getContainer().clientHeight;
      RawAssertions.assertEq('should be above: ' + editorHeight + '>=' + minHeight, true, editorHeight >= minHeight);
    }));
  };

  const sAssertEditorHeightBelow = function (editor, minHeight) {
    return Logger.t(`Assert editor height is below ${minHeight}`, Step.sync(function () {
      const editorHeight = editor.getContainer().clientHeight;
      RawAssertions.assertEq('should be below: ' + editorHeight + '<=' + minHeight, true, editorHeight <= minHeight);
    }));
  };

  const sAssertScroll = function (editor, state) {
    return Logger.t(`Assert scroll ${state}`, Step.sync(function () {
      const body = editor.getBody();
      Assertions.assertEq('', !state, body.style.overflowY === 'hidden');
    }));
  };

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const tinyApis = TinyApis(editor);

    Pipeline.async({},
      // These tests doesn't work on phantom since measuring things seems broken there
      navigator.userAgent.indexOf('PhantomJS') === -1 ?
      [
        Log.stepsAsStep('TBA', 'AutoResize: Fullscreen toggle scroll state', [
          tinyApis.sExecCommand('mceFullScreen'),
          sAssertScroll(editor, true),
          tinyApis.sExecCommand('mceFullScreen'),
          sAssertScroll(editor, false)
        ]),
        Log.stepsAsStep('TBA', 'AutoResize: Editor size increase based on content size', [
          tinyApis.sSetContent('<div style="height: 5000px;">a</div>'),
          Waiter.sTryUntil('wait for editor height', sAssertEditorHeightAbove(editor, 5000), 10, 3000)
        ]),
        Log.stepsAsStep('TBA', 'AutoResize: Editor size decrease based on content size', [
          tinyApis.sSetContent('<div style="height: 1000px;">a</div>'),
          Waiter.sTryUntil('wait for editor height', sAssertEditorHeightBelow(editor, 2000), 10, 3000)
        ]),
        Log.stepsAsStep('TBA', 'AutoResize: Editor size decrease content to 1000 based and restrict by max height', [
          tinyApis.sSetSetting('max_height', 200),
          tinyApis.sSetContent('<div style="height: 1000px;">a</div>'),
          Waiter.sTryUntil('wait for editor height', sAssertEditorHeightBelow(editor, 500), 10, 3000),
          tinyApis.sSetSetting('max_height', 0)
        ]),
        Log.stepsAsStep('TBA', 'AutoResize: Editor size decrease content to 10 and set min height to 500', [
          tinyApis.sSetSetting('min_height', 500),
          tinyApis.sSetContent('<div style="height: 10px;">a</div>'),
          Waiter.sTryUntil('wait for editor height', sAssertEditorHeightAbove(editor, 300), 10, 3000),
          tinyApis.sSetSetting('min_height', 0)
        ])
      ] : []
    , onSuccess, onFailure);
  }, {
    plugins: 'autoresize fullscreen',
    toolbar: 'autoresize',
    skin_url: '/project/js/tinymce/skins/oxide'
  }, success, failure);
});