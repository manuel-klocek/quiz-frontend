import ToastComponent from "@/components/ToastComponent.vue"
import type {Category, Question} from "@/models/Models"
import {dataStore} from "@/services/DataStore"

const BASE_URL = "http://localhost:8080/api"

class ApiService {
    private static apiInstance: ApiService = new ApiService()

    public static useApi(): ApiService {
        return ApiService.apiInstance
    }
    private toast = ToastComponent.Toast

    public async requestLogin(username: string, password: string): Promise<boolean> {
        const response = await fetch('http://localhost:8080/api/login',  {
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
                    mail: mail
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

}

export default ApiService