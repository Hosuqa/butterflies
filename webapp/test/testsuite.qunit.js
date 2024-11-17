sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: butterflies",
		defaults: {
			page: "ui5://test-resources/butterflies/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "butterflies/",
				never: "test-resources/butterflies/"
			},
			loader: {
				paths: {
					"butterflies": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for butterflies"
			},
			"integration/opaTests": {
				title: "Integration tests for butterflies"
			}
		}
	};
});
