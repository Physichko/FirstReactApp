import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import {composeWithDevToolsLogOnlyInProduction} from "@redux-devtools/extension";

describe("ProfileStatus component", () =>{
    test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status={"dedede"}/>);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("dedede");
    });
    test("After render span should be displayed with correct status", async () => {
        const component = create(<ProfileStatus status={"dedede"}/>);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("After render input should be displayed with correct status",
        async () => {
            const component = create(<ProfileStatus status={"dedede"}/>);
            const root = component.root;
            let input;
            try {
                input = await root.findByType("input");
            }
            catch {

            }
            expect(input).toBeUndefined();
        });

    test("After click input should be instead of span", async () => {
        const component = create(<ProfileStatus status={"dedede"}/>);
        const root = component.root;
        let span = await root.findByType("span");
        span.props.onDoubleClick();
        let input = await root.findByType("input");
        expect(input.props.value).toBe("dedede")
    });

    test("Callback is working",  () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={"dedede"} updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);

    });
});