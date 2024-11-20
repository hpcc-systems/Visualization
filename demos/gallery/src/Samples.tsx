import * as React from "react";
import { Tree, TreeItem, TreeItemLayout } from "@fluentui/react-components";

import samples from "../samples/samples.json" with { type: "json" };

interface Sample {
    path: string;
    name: string;
    type: "folder" | "file";
    children?: Sample[];
}

function samplesMenu(item: Sample, onClick: (item: string) => void) {
    if (item.children) {
        return <TreeItem key={item.path} itemType="branch">
            <TreeItemLayout>
                {item.name}
            </TreeItemLayout>
            <Tree>
                {item.children.map((child) => samplesMenu(child, onClick))}
            </Tree>
        </TreeItem>;
    }

    return <TreeItem key={item.path} itemType="leaf">
        <TreeItemLayout onClick={() => onClick(item.path)}>
            {item.name}
        </TreeItemLayout>
    </TreeItem>;
}
export interface SamplesProps {
    setSelectedValue: (value: string) => void;
}
export const Samples: React.FC<SamplesProps> = ({ setSelectedValue }) => {

    return <Tree aria-label="root">
        {samplesMenu((samples as Sample), (srcPath: string) => {
            setSelectedValue(srcPath);
        })}
    </Tree>;
};