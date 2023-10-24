import { reactive } from 'vue';

export const dataStore = reactive({
    id: '',
    username: '',
    mail: '',
    highscore: 0,
    totallyAnsweredQuestions: 0,
    sessionToken: '',

    wipe: function() {
        this.id = ''
        this.username = ''
        this.mail = ''
        this.highscore = 0
        this.totallyAnsweredQuestions = 0
        this.sessionToken = ''
    }
})
