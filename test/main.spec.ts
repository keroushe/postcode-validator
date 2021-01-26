import { CountryCodeStrings } from '../src/postcode-types';
import { postcodeValidator, postcodeValidatorExistsForCountry } from '../src/main';

describe('postcodeValidator', () => {
    test('should return true for valid postcodes', () => {
        const validPostcodes = [
            { postcode: "10014", country: "US" },
            { postcode: "W6 8DL", country: "GB" },
            { postcode: "M5P 2N7", country: "CA" },
            { postcode: "100-0005", country: "JP" },
            { postcode: "100020", country: "INTL" },
            { postcode: "KFPXWT7D", country: "INTL" },
            { postcode: "91180-560", country: "INTL" },
            { postcode: "135", country: "INTL" },
            { postcode: "SW1A 0AA", country: "GB" },
            { postcode: "1010", country: "AT" },
            { postcode: "D02 TN83", country: "IE" }
        ];

        expect.assertions(validPostcodes.length);
        validPostcodes.forEach(({ postcode, country }) => {
            expect(postcodeValidator(postcode, country as CountryCodeStrings)).toBeTruthy();
        });
    });

    test('should return false for invalid postcodes', () => {
        const invalidPostcodes = [
            { postcode: "!,$^ +@#", country: "INTL" },
            { postcode: "1234567", country: "GB" },
            { postcode: "M5P@2N7", country: "CA" },
            { postcode: "M5K3D8", country: "CA" },
            { postcode: "100-0005-9088", country: "JP" },
            { postcode: "0234", country: "AT" },
            { postcode: "DTN83", country: "IE" }
        ];

        expect.assertions(invalidPostcodes.length);
        invalidPostcodes.forEach(({ postcode, country }) => {
            expect(postcodeValidator(postcode, country as CountryCodeStrings)).toBeFalsy();
        });
    });

    test('should throw error for invalid country codes', () => {
        expect.assertions(1);
        expect(() => postcodeValidator('SW1A 0AA', 'MOON' as CountryCodeStrings)).toThrow('Invalid country code: MOON');
    });
});

describe('postcodeValidatorExistsForCountry', () => {
    test('should return true for valid country code', () => {
        expect.assertions(3);
        expect(postcodeValidatorExistsForCountry('PR')).toBeTruthy();
        expect(postcodeValidatorExistsForCountry('AU')).toBeTruthy();
        expect(postcodeValidatorExistsForCountry('DE')).toBeTruthy();
    });

    test('should return false for invalid country code', () => {
        expect.assertions(3);
        expect(postcodeValidatorExistsForCountry('PO' as CountryCodeStrings)).toBeFalsy();
        expect(postcodeValidatorExistsForCountry('SUN' as CountryCodeStrings)).toBeFalsy();
        expect(postcodeValidatorExistsForCountry('STAR' as CountryCodeStrings)).toBeFalsy();
    });
});