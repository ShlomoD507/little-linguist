import { EnumLanguage } from "./enumLanguage";
import { Translation } from "./translation";

export class CategoryWord {
    name: string;
    id: number;
    last_change_date: Date;
    target_lang: EnumLanguage;
    origin_lang: EnumLanguage;
    words: Translation[] = [];
  value: any;
  viewValue: any;
    
    constructor(name: string, id: number, last_change_date: Date,
      target_lang: EnumLanguage, origin_lang: EnumLanguage,
      words: Translation[]) {
      this.name = name;
      this.id = id;
      this.last_change_date = last_change_date;
      this.target_lang = target_lang;
      this.origin_lang = origin_lang;
      this.words = words;
    }
  }