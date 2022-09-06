export namespace ohq {

    //  ObservableHQ Notebook Format  ---
    export interface Owner {
        id?: string;
        github_login?: string;
        avatar_url?: string;
        login?: string;
        name?: string;
        bio?: string;
        home_url?: string;
        type?: string;
        tier?: string;
    }

    export interface Creator {
        id?: string;
        github_login?: string;
        avatar_url?: string;
        login?: string;
        name?: string;
        bio?: string;
        home_url?: string;
        tier?: string;
    }

    export interface Author {
        id?: string;
        avatar_url?: string;
        name?: string;
        login?: string;
        bio?: string;
        home_url?: string;
        github_login?: string;
        tier?: string;
        approved?: boolean;
        description?: string;
    }

    export interface Owner2 {
        id?: string;
        github_login?: string;
        avatar_url?: string;
        login?: string;
        name?: string;
        bio?: string;
        home_url?: string;
        type?: string;
        tier?: string;
    }

    export interface Collection {
        id?: string;
        type?: string;
        slug?: string;
        title?: string;
        description?: string;
        update_time?: Date;
        pinned?: boolean;
        ordered?: boolean;
        custom_thumbnail?: any;
        default_thumbnail?: string;
        thumbnail?: string;
        listing_count?: number;
        parent_collection_count?: number;
        owner?: Owner2;
    }

    export interface File {
        id?: string;
        url: string;
        download_url?: string;
        name: string;
        create_time?: Date;
        status?: string;
        size?: number;
        mime_type?: string;
        content_encoding?: string;
    }

    export interface User {
        id?: string;
        github_login?: string;
        avatar_url?: string;
        login?: string;
        name?: string;
        bio?: string;
        home_url?: string;
        tier?: string;
    }

    export interface Comment {
        id?: string;
        content?: string;
        node_id?: number;
        create_time?: Date;
        update_time?: any;
        resolved?: boolean;
        user?: User;
    }

    export interface Node {
        id: number;
        mode: string;
        value: string;
        pinned?: boolean;
        data?: any;
        name?: string;
    }

    export interface Notebook {
        id?: string;
        slug?: any;
        trashed?: boolean;
        description?: string;
        likes?: number;
        publish_level?: string;
        forks?: number;
        fork_of?: any;
        update_time?: Date;
        publish_time?: Date;
        publish_version?: number;
        latest_version?: number;
        thumbnail?: string;
        default_thumbnail?: string;
        roles?: any[];
        sharing?: any;
        owner?: Owner;
        creator?: Creator;
        authors?: Author[];
        collections?: Collection[];
        files: File[];
        comments?: Comment[];
        commenting_lock?: any;
        suggestion_from?: any;
        suggestions_to?: any[];
        version?: number;
        title?: string;
        license?: string;
        copyright?: string;
        nodes: Node[];
        resolutions?: any[];
    }

    //  @observablehq/runtime API  ---
    export type InspectorFactory = (name?: string) => Inspector;

    export interface Inspector {
        _node?: HTMLDivElement;
        pending();
        fulfilled(value);
        rejected(error);
    }

    export interface Runtime {
        fileAttachments(func: (name: string) => ohq.File): any;
        module(define?, inspector?: InspectorFactory): Module;
        dispose(): void;
    }

    export interface Module {
        derive(specifiers: string[] | { name: string, alias: string }[], source: any);
        import(name: string, alias: string | undefined, mod: Module): Variable;
        builtin(name: string, _: any);
        variable(inspector?: Inspector): Variable;
        value(name: string): Promise<any>;
    }

    export interface Variable {
        delete();
        define(name?: string, inputs?: string[], definition?: any);
        import(name: string, otherModule: ohq.Module);
        import(name: string, alias: string, otherModule: ohq.Module);
    }
}