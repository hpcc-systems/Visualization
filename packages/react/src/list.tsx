import * as React from "@hpcc-js/preact-shim";

interface ITextList {
    paddingTop?: number;
    paddingBottom?: number;
    rowHeight?: number;
    fontFamily?: string;
    fontSize?: number;
    width?: number;
    textAlign?: "left" | "right" | "auto";
    data?: string[];
    onItemClick?: () => object;
}

interface IImageList {
    paddingTop?: number;
    paddingBottom?: number;
    rowHeight?: number;
    width?: number;
    textAlign?: "left" | "right" | "auto";
    data?: string[];
    onItemClick?: () => object;
}

export const TextList: React.FunctionComponent<ITextList> = ({
    paddingTop = 24,
    paddingBottom = 24,
    rowHeight = 32,
    fontFamily = "Verdana",
    fontSize = 12,
    width = 100,
    textAlign = "left",
    data = [],
    onItemClick = (evt): void => {}
}) => {
    const items = [];
    const itemDivStyle = `height:${rowHeight}px;`;
    const textDivStyle = `font-family:${fontFamily};font-size:${fontSize}px;text-align:${textAlign};overflow-x:hidden;text-overflow:ellipsis;`;
    data.forEach((row, i) => {
        items.push(
            <div key={i} class="TextList-item" onclick={(evt)=>{
                return onItemClick(evt);
            }} style={itemDivStyle}>
                <div class="TextList-text" style={textDivStyle} title={row}>
                    {row}
                </div>
            </div>
        );
    });
    const listStyle = `display:flex;flex-direction:column;width:${width}px;padding-top:${paddingTop}px;padding-bottom:${paddingBottom}px`;
    return <div style={listStyle}>
        {items}
    </div>;
};

export const ImageList: React.FunctionComponent<IImageList> = ({
    paddingTop = 24,
    paddingBottom = 24,
    rowHeight = 32,
    width = 100,
    textAlign = "left",
    data = [],
    onItemClick = (evt): void => {}
}) => {
    const items = [];
    const itemDivStyle = `height:${rowHeight}px;`;
    const textDivStyle = `text-align:${textAlign};`;
    data.forEach((row, i) => {
        items.push(
            <div key={i} class="ImageList-item" onclick={(evt)=>{
                return onItemClick(evt);
            }} style={itemDivStyle}>
                <img class="ImageList-img" style={textDivStyle} src={row}/>
            </div>
        );
    });
    const listStyle = `display:flex;flex-direction:column;width:${width}px;padding-top:${paddingTop}px;padding-bottom:${paddingBottom}px`;
    return <div style={listStyle}>
        {items}
    </div>;
};
