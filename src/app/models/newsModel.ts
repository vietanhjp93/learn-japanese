

export interface News {
    url: string;
    source: string;
    shortTitle: string;
    shortTitleWithFurigana: string;
    newTitle: string;
    newTitleWithFurigana: string;
    newContent: string[];
    newContentWithFurigana: string[];
    newTitleVi: string;
    newContentVi: string[];
    image: string;
    category: string;
    countWord: Number;
    readCount: Number;
    
    likeState: boolean;
    readState: boolean;
    timeReading: Number;
}

export interface LocalData {
    url: string;
    likeState: boolean;
    readState: boolean;
    timeReading: Number;
}