import { questionsEN } from "./questions-en";
import { questionsTR } from "./questions-tr";
import { questionsFR } from "./questions-fr";

let selectedLanguage = localStorage.getItem("questionLanguage");
let questions = questionsTR;
if (selectedLanguage) {
  selectedLanguage = JSON.parse(selectedLanguage);
  if (selectedLanguage.code == "us") questions = questionsEN;
  if (selectedLanguage.code == "fr") questions = questionsFR;
}

export { questions };
