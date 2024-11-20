import React, { useEffect } from "react";
import { DrawerProps, makeStyles, tokens } from "@fluentui/react-components";
import { useConst } from "@fluentui/react-hooks";
import { NavDrawer, NavDrawerBody, NavDrawerHeader } from "@fluentui/react-nav-preview";
import { JSEditor } from "@hpcc-js/codemirror";
import { AutosizeHpccJSComponent } from "./HpccJSAdapter";
import { Samples } from "./Samples";

function useLocationSearch() {
    const [search, setSearch] = React.useState(window.location.search);

    useEffect(() => {
        const handleLocationChange = () => {
            setSearch(window.location.search);
        };

        window.addEventListener("popstate", handleLocationChange);
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            originalPushState.apply(this, args);
            handleLocationChange();
        };

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.history.pushState = originalPushState;
        };
    }, []);
    return search.substring(1) ?? "";
}

const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        display: "flex",
        height: "100%",
    },
    content: {
        flex: "1",
        padding: "16px",
        display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    field: {
        display: "flex",
        marginTop: "4px",
        marginLeft: "8px",
        flexDirection: "column",
        gridRowGap: tokens.spacingVerticalS,
    },
});

type DrawerType = Required<DrawerProps>["type"];

export interface AppProps {
}

export const App: React.FC<AppProps> = ({
}) => {
    const styles = useStyles();

    const [type] = React.useState<DrawerType>("inline");
    const [isMultiple] = React.useState(true);
    const editor = useConst(() => new JSEditor());

    const selectedValue = useLocationSearch();
    const setSelectedValue = React.useCallback((value: string) => {
        window.history.pushState({}, "", `?${value}`);
    }, []);

    React.useEffect(() => {
        const target = document.getElementById("target");
        const targetSrc = document.getElementById("targetSrc");
        if (target && targetSrc) {
            target.innerHTML = "";
            targetSrc.innerHTML = "";
        }
        if (editor) {
            editor
                .javascript("")
                .lazyRender()
                ;
        }
        if (selectedValue?.indexOf(".js") > 0) {
            const path = import.meta.resolve("../" + selectedValue);
            fetch(path)
                .then(async (response) => {
                    const script = await response.text();
                    if (targetSrc) {
                        const scriptElement = document.createElement("script");
                        scriptElement.type = "module";
                        scriptElement.textContent = script;
                        targetSrc.appendChild(scriptElement);
                        if (editor) {
                            editor
                                .javascript(script)
                                .lazyRender()
                                ;
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (target) {
                        target.innerHTML = error;
                    }
                });
        }
    }, [editor, selectedValue]);

    return <div className={styles.root}>
        <NavDrawer selectedValue={selectedValue} open={true} type={type} multiple={isMultiple}>
            <NavDrawerHeader><h1>@hpcc-js</h1></NavDrawerHeader>
            <NavDrawerBody>
                <Samples setSelectedValue={setSelectedValue} />
            </NavDrawerBody>
        </NavDrawer>

        <div >
            <div id="target" style={{ width: "800px", height: "600px" }}></div>
            <div id="targetSrc"></div>
            <div id="target" style={{ width: "800px", height: "600px" }}>
                <h2>{selectedValue}</h2>
                <AutosizeHpccJSComponent widget={editor} padding={8}></AutosizeHpccJSComponent>
            </div>
        </div>
    </div>;
};