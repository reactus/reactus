import Reducers from "./../app/assets/scripts/reducers/index";

describe("Reducers - ", function() {
    it("lenght can not be zero", function() {
        expect(Reducers.length).not.toBe(0);
    });
});
