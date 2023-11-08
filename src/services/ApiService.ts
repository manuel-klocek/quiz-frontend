import ToastComponent from "@/components/ToastComponent.vue"
import type {Answer, Category, Question, QuizResult, User} from "@/models/Models"
import {dataStore} from "@/services/DataStore"

const BASE_URL = "http://localhost:8080/api"

class ApiService {
    private static apiInstance: ApiService = new ApiService()

    public static useApi(): ApiService {
        return ApiService.apiInstance
    }
    private toast = ToastComponent.Toast

    public async requestLogin(username: string, password: string): Promise<boolean> {
        const response = await fetch(BASE_URL + '/login',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            )
        })

        if(response.status == 401) {
            this.toast.fire({
                icon: 'error',
                title: 'Authentication',
                text: 'Username and/or password invalid'
            })
            return false
        }

        const result = await response.json()
        dataStore.sessionToken = result['token']
        dataStore.username = username

        this.toast.fire({
            icon: 'success',
            title: 'Successfully logged in',
            text: 'Welcome back ' + username + '!'
        })

        return true
    }

    public async requestRegister(name: string, pass: string, mail: string): Promise<boolean> {
        const response = await fetch(BASE_URL + '/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: name,
                    password: pass,
                    mail: mail,
                    icon: 'Avatar1'
                }
            )
        })

        if(response.status == 201)
            return true
        else if(response.status == 409)
            console.log("User already exists! -> Make check user request on input!")
        else
            console.log("Bad Request with status code: " + response.status + " " + response.statusText)

        return false
    }

    public async fetchCategories(): Promise<Category[]> {
        const response = await fetch(BASE_URL + '/categories', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + dataStore.sessionToken
            }
        })

        return await response.json()
    }

    public async fetchQuestions(categoryId: number): Promise<Question[]> {
        const response = await fetch(BASE_URL + '/questions?category=' + categoryId.toString(), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + dataStore.sessionToken
            }
        })

        return await response.json()
    }

    private async requestUserInfo(): Promise<User> {
        const response = await fetch(BASE_URL + '/user-info', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + dataStore.sessionToken
            }
        })

        const data = await response.json()

        return data["user-info"] as User
    }

    public async logout(): Promise<Response> {
        return await fetch(BASE_URL + '/logout', {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + dataStore.sessionToken
            }
        })
    }

    public async editUserInfo(username: string, mail: string, icon: string): Promise<boolean> {
        const response = await fetch(BASE_URL + '/user', {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + dataStore.sessionToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: dataStore.id,
                username: username,
                mail: mail,
                icon: icon
            })
        })



        if(response.status == 202)
            return true
        else
            console.log("Bad Request with status code: " + response.status + " " + response.statusText)
        return false
    }

    //TODO error management
    public async retrieveScore(answers: Answer[]): Promise<QuizResult> {
        const response = await fetch(BASE_URL + '/answers', {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + dataStore.sessionToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        })

        return await response.json()
    }

    //TODO error management
    public async fetchScoreboard(page: number = 0): Promise<User[]> {
        let parameters = ''
        if(page !== 0)
            parameters = '?page=' + page

        const response = await fetch(BASE_URL + '/scoreboard' + parameters, {
            headers: {
                'Authorization' : 'Bearer ' + dataStore.sessionToken,
                'Content-Type': 'application/json'
            }
        })

        return response.json()
    }

    public async fetchUserInfo(): Promise<boolean> {
        const user = await this.requestUserInfo()

        dataStore.id = user.id
        dataStore.username = user.username
        dataStore.highscore = user.highscore
        dataStore.totallyAnsweredQuestions = user.totallyAnsweredQuestions
        dataStore.mail = user.mail
        dataStore.icon = user.icon

        return true
    }
}

export default ApiService