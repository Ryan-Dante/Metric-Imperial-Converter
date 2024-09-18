const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite("function convertHandler.getNum(input)", function () {

        // Test whole number input
        test("Whole Number Input", function (done) {
            let input = "10L";
            assert.equal(convertHandler.getNum(input), 10);
            done();
        });

        // Test decimal input
        test("Decimal Input", function (done) {
            let input = "10.2L";
            assert.equal(convertHandler.getNum(input), 10.2);
            done();
        });

        // Test fractional input
        test("Fractional Input", function (done) {
            let input = "10/3L";
            assert.equal(convertHandler.getNum(input), 10 / 3);
            done();
        });

        // Test fractional input w/ decimal
        test("Fractional Input w/ Decimal", function (done) {
            let input = "10/3.3L";
            assert.equal(convertHandler.getNum(input), 10 / 3.3);
            done();
        });

        // Test double fraction
        test("Double Fraction", function (done) {
            let input = "10/3/3L";
            assert.equal(convertHandler.getNum(input), "invalid number");
            done();
        });

        // Test default to 1
        test("Default to 1", function (done) {
            let input = "gal";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    // Test read valid input unit
    suite("Function convertHandler.getUnit(input)", function () {
        test("Valid Input Unit", function (done) {
            let input = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg",
                "GAL",
                "L",
                "MI",
                "KM",
                "LBS",
                "KG",
            ];
            let output = [
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
            ]
            input.forEach(function (ele, index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        });

        // Test unknown unit input
        test("Unknown Unit Input", function (done) {
            assert.equal(convertHandler.getUnit("10kilos"), "invalid unit")
            done();
        });
    });

    // Test unit conversion
    suite("Function convertHandler.getReturnUnit(initUnit)", function () {
        test("For Each Valid Unit Input", function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });
    });

    // Test convert to full name string
    suite("Function convertHandler.getReturnUnit(initUnit)", function () {
        test("For Each Valid Unit Input to String", function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = [
                "gallons",
                "liters",
                "miles",
                "kilometers",
                "pounds",
                "kilograms"
            ];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });
    });

    // Test number conversions
    suite("Function convertHandler.getReturnUnit(nm, unit)", function () {
        test("gal to L", function (done) {
            let input = [10, "gal"];
            let expected = 37.8541;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });
    
        test("L to gal", function (done) {
            let input = [10, "L"];
            let expected = 2.64172;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });

        test("mi to km", function (done) {
            let input = [10, "mi"];
            let expected = 16.0934;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });

        test("km to mi", function (done) {
            let input = [10, "km"];
            let expected = 6.21371;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });

        test("lbs to kg", function (done) {
            let input = [10, "lbs"];
            let expected = 4.53592;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });

        test("kg to lbs", function (done) {
            let input = [10, "kg"];
            let expected = 22.0462;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            );
            done();
        });
    });
});