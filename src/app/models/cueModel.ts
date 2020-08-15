export class CueModel {
    label: String;
    language: String;
    cues: Cue[];

    public importCue(obj): CueModel {
        let tempCue: CueModel;
        tempCue.label = obj.label;
        tempCue.language = obj.language;
        for (let index = 0; index < obj.cues.length; index++) {
          tempCue.cues.push(obj.cues[index].text);
          tempCue.cues.push(obj.cues[index].startTime);
          tempCue.cues.push(obj.cues[index].endTime);
        }
        return tempCue;
    }
}
export class Cue {
    text: String;
    startTime: Number;
    endTime: Number;
}