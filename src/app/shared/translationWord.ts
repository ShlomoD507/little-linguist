export class TranslationWord {

    constructor(public origin: string,
                public target: string,
                public guess: string = "",
                public isRight: boolean) {
            }
}