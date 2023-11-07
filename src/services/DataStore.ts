import { reactive } from 'vue';
import type {Answer} from "@/models/Models";

export const dataStore = reactive({
    id: '',
    username: '',
    mail: '',
    highscore: 0,
    totallyAnsweredQuestions: 0,
    sessionToken: '',
    answers: [] as Answer[]
});