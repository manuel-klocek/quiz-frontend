import { reactive } from 'vue';

//TODO take out dummy data
export const dataStore = reactive({
    id: '',
    username: '',
    mail: '',
    highscore: 0,
    totallyAnsweredQuestions: 0,
    sessionToken: '',
    icon: ''
});