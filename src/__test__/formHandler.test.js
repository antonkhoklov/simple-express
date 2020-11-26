test("asyncFunction", () => {
    handleSubmit();
    expect.assertions(1);

    function handleSubmit(data) {
        expect(data).toBeUndefined();
    }
});