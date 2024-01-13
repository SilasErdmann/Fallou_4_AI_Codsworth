import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Companion } from "../typeorm/Companion";
import { Dialogue } from "../typeorm/Dialogue";
import { OpenAI } from "openai";
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common/interfaces';

@Injectable()
export class CompanionService {
  private companion: Companion;
  private openai: OpenAI;
  private memoryLevel: string = 'null';
  private dialogueImportance: string;
  private fullResponse: string = '';
  private memoryNumber: number = 0;

  constructor(
    @InjectRepository(Companion)
    private companionRepository: Repository<Companion>,
    @InjectRepository(Dialogue)
    private dialogueRepository: Repository<Dialogue>
  ) {
    this.openai = new OpenAI({
      apiKey: "",
    });
  }

  async chat(cName: string, message: string): Promise<Observable<MessageEvent>> {
    await this.promptData(cName);
    const { traits, name, gender, race, examples, dialogues } = this.companion;
    const trait = traits.find(trait => trait.type === 'Gedächtnis');
  
    if (trait) {
      const memoryMap = {
        'Vergesslich': 1,
        'Normal': 2,
        'Exzellent': 3,
      };
  
      this.memoryNumber = memoryMap[trait.name] || this.memoryNumber;
      this.memoryLevel = trait.name;
    }

    const traitStrings = traits.map(trait => `${trait.name} (${trait.type})`).join(', ');

    const exampleStrings = examples.map(example => `- Benutzer: ${example.user_input}\n- ${example.companion_answer}`).join('\n\n');

    let sortedDialogues = dialogues;

    sortedDialogues = sortedDialogues
      .sort((a, b) => b.ingame_time.getTime() - a.ingame_time.getTime())
      .slice(0, this.memoryNumber);

    const dialogueStrings = sortedDialogues.map(dialogue => `- Benutzer: ${dialogue.user_input}\n- ${dialogue.companion_answer}\n-`).join('\n\n');

    const filteredDialogues = dialogues
    .sort((a, b) => b.ingame_time.getTime() - a.ingame_time.getTime())
    .slice(this.memoryNumber);

    const importantDialogues = filteredDialogues
    .filter(dialogue => dialogue.importance === 'wichtig');

    const longtermStrings = importantDialogues.map(dialogue => `- Benutzer: ${dialogue.user_input}\n- ${dialogue.companion_answer}\n`).join('\n\n');

    this.dialogueImportance = '0';

    const systemMessage = `Spiele die Rolle eines Charakters aus dem postapokalyptischen Videospiel Fallout 4, der Benutzer ist Männlich, benutze einen Punkt nur am Satz Ende. Schreibe am Anfang jeder Response entweder [unwichtig], [mäßig wichtig] oder [wichtig] je nachdem wie lange die Benutzer Eingabe und deine Antwort in deinem Gedächtnis gespeichert werden soll(unwichtig = Minuten/Stunden, mäßig wichtig = Tage/Wochen, wichtig = Jahre/Jahrzente). Es dürfen keine anderen Begriffe außer diese [unwichtig], [mäßig wichtig] und [wichtig] am Anfang der Response verwendet werden. Dein Charakter hat folgende Eigenschaften:
 
      Name: ${name}
      Geschlecht: ${gender}
      Rasse: ${race}
 
      Merkmale: ${traitStrings}
 
      Einige Beispiele für mögliche Antworten auf die Eingaben des Benutzers sind:
 
      ${exampleStrings}
 
      Hier sind deine Erinnerungen an deine letzten Unterhaltungen
 
      ${dialogueStrings}
 
      Das sind die Erinnerungen an Unterhaltungen in deinem langzeit Gedächtnis
     
      ${longtermStrings}`;

      const stream = await this.openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message },
        ],
        stream: true,
      });
      
      return new Observable<MessageEvent>(observer => {
        // Set SSE headers
        observer.next({
          data: '',
          type: 'headers',
          retry: 500,
          id: null,
        });
      
        this.fullResponse = '';
        let importanceKeywordsFound = false;
      
        const importanceKeywords = ['[unwichtig]', '[mäßig wichtig]', '[wichtig]'];
      
        const processStream = async () => {
          for await (const part of stream) {
            const generatedText = part.choices[0]?.delta?.content || '';
      
            if(!importanceKeywordsFound) {
              for (const keyword of importanceKeywords) {
                if (this.fullResponse.includes(keyword)) {
                  this.dialogueImportance = keyword.slice(1, -1);
                  importanceKeywordsFound = true;
                  this.fullResponse = '';
                  break;
                }
              }
            }

            this.fullResponse += generatedText;
            
            if (importanceKeywordsFound) {
              observer.next({
                data: generatedText,
                type: null,
                retry: 500,
                id: null,
              });
            }
          }
          
          this.createMemory(message);
          observer.complete();
        };
      
        processStream();
      });
      
  }
  

  async promptData(name: string) {
    this.companion = await this.companionRepository.findOne({
      where: { name },
      relations: ["examples", "traits", "dialogues"],
    });
  }

  async createMemory(message: string) {
    const newDialogue = this.dialogueRepository.create({
      importance: this.dialogueImportance,
      user_input: message,
      companion_answer: this.fullResponse,
      ingame_time: new Date(),
      companionId: this.companion.id,
    });
    this.dialogueRepository.save(newDialogue);
  }

}