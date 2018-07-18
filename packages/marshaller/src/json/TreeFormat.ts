
export function TreeFormat(json: string | object): TreeDataFormat { // Maybe write interfaces for all of our expected data formats?
    return obj_to_tree({label: "root"}, typeof json === "string" ? JSON.parse(json) : json);

    function obj_to_tree(visitor, _data) {
        switch (typeof _data) {
            case "object":
                if (_data !== null) {
                    if (_data instanceof Array) {
                        visitor.children = _data.map((row, row_idx) => {
                            return this.obj_to_tree({label: row_idx}, row);
                        });
                    } else {
                        visitor.children = [];
                        for (const obj_idx in _data) {
                            const row = _data[obj_idx];
                            visitor.children.push(this.obj_to_tree({label: obj_idx}, row));
                        }
                    }
                }
                break;
            case "number":
            case "string":
                if (typeof visitor.children === "undefined") {
                    visitor.label += ` (${("" + _data)})`;
                    visitor.size = ("" + _data).length;
                }
                break;
        }
        return visitor;
    }
}

export interface TreeDataFormat {
    label: string;
    children?: TreeDataFormat[];
    size?: number;
    weight?: number;
}
