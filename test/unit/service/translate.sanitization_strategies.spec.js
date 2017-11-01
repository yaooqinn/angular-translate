/* jshint camelcase: false */
/* global inject: false */
'use strict';

describe('pascalprecht.translate', function () {

  var FIXTURE_TRANSLATIONS = {
    'TEXT_WITH_HTML' : '<span style="color: green">This text should be green</span>',
    'TEXT_AND_PARAMETERS_WITH_HTML' : '<span style="color: green">This {{ text }} should be green</span>'
  };
  var PARAMETERS = {
    BOLD_TEXT: '<span style="font-weight: bold">BOLD TEXT</span>'
  };

  describe('Sanitization strategy "null"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy(null)
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "escape"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('escape')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.html()).toBe('&lt;span style="color: green"&gt;This text should be green&lt;/span&gt;');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // double escaped
        // TODO improvement
        expect(element.text()).toBe('&lt;span style="color: green"&gt;This text should be green&lt;/span&gt;');
      });
      it('should work using service.instant', function () {
        // fully escaped (no HTML)
        expect($translate.instant('TEXT_WITH_HTML')).toBe('&lt;span style="color: green"&gt;This text should be green&lt;/span&gt;');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.html()).toBe('&lt;span style="color: green"&gt;This  should be green&lt;/span&gt;');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
         // double escaped
        // TODO improvement
        expect(element.text()).toBe('&lt;span style="color: green"&gt;This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green&lt;/span&gt;');
      });
      it('should work using service.instant', function () {
        // fully escaped (no HTML)
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('&lt;span style="color: green"&gt;This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green&lt;/span&gt;');
      });
    });
  });

  describe('Sanitization strategy "escaped" (alias)', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('escaped')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML), double escaped content
        // TODO improvement
        expect(element.text()).toBe('<span style="color: green">This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span style="color: green">This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "escapeParameters"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('escapeParameters')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML), double escaped content
        // TODO improvement
        expect(element.text()).toBe('<span style="color: green">This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped, but escaped content
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span style="color: green">This &lt;span style="font-weight: bold"&gt;BOLD TEXT&lt;/span&gt; should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "sanitize"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('sanitize')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML, modified
        expect(element.html()).toBe('<span>This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML), modified
        expect(element.text()).toBe('<span>This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped, but modified
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span>This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML, modified
        expect(element.html()).toBe('<span>This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML), modified
        expect(element.text()).toBe('<span>This <span>BOLD TEXT</span> should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped, but modified
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span>This <span>BOLD TEXT</span> should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "sanitizeParameters"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('sanitizeParameters')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML), modified content
        expect(element.text()).toBe('<span style="color: green">This <span>BOLD TEXT</span> should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped, but modified content
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span style="color: green">This <span>BOLD TEXT</span> should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "sce"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('sce')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // wrapped, not escaped
        expect($translate.instant('TEXT_WITH_HTML').$$unwrapTrustedValue()).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
      it('should work using service.instant', function () {
        // wrapped, not escaped
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT}).$$unwrapTrustedValue()).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
    });
  });

  describe('Sanitization strategy "sceParameters"', function () {

    beforeEach(module('pascalprecht.translate', 'ngSanitize'));

    beforeEach(module('pascalprecht.translate', function ($translateProvider) {
      $translateProvider
        .translations('en', FIXTURE_TRANSLATIONS)
        .useSanitizeValueStrategy('sceParameters')
        .preferredLanguage('en');
    }));

    var $compile, $translate, $rootScope;

    beforeEach(inject(function (_$compile_, _$translate_, _$rootScope_) {
      $compile = _$compile_;
      $translate = _$translate_;
      $rootScope = _$rootScope_;
    }));

    describe('for single string value', function () {
      it('should work using directive', function () {
        var element = $compile('<div translate="TEXT_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using filter', function () {
        var element = $compile('<div>{{ "TEXT_WITH_HTML" | translate }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This text should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_WITH_HTML')).toBe('<span style="color: green">This text should be green</span>');
      });
    });

    describe('for value+parameters', function () {
      it('should work using directive', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div translate="TEXT_AND_PARAMETERS_WITH_HTML"></div>')($rootScope);
        $rootScope.$digest();
        // not escaped, added as HTML
        expect(element.html()).toBe('<span style="color: green">This  should be green</span>');
      });
      it('should work using filter', function () {
        $rootScope.text = PARAMETERS.BOLD_TEXT;
        var element = $compile('<div>{{ "TEXT_AND_PARAMETERS_WITH_HTML" | translate: {text: text} }}</div>')($rootScope);
        $rootScope.$digest();
        // fully escaped (no HTML)
        expect(element.text()).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
      it('should work using service.instant', function () {
        // not escaped
        expect($translate.instant('TEXT_AND_PARAMETERS_WITH_HTML', {text: PARAMETERS.BOLD_TEXT})).toBe('<span style="color: green">This <span style="font-weight: bold">BOLD TEXT</span> should be green</span>');
      });
    });
  });
});
