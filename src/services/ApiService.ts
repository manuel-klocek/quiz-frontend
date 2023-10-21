import ToastComponent from "@/components/ToastComponent.vue";
import type {Category, Question} from "@/models/Models";

const BASE_URL = "http://localhost:8080/api"

export class ApiService {
    private token: String
    private toast = ToastComponent.Toast

    public async requestLogin(username: String, password: String): Promise<boolean> {
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
        this.token = result['token']

        this.toast.fire({
            icon: 'success',
            title: 'Successfully logged in',
            text: 'Welcome back ' + username + '!'
        })
        return true
    }

    async requestRegister(name, pass, mail): Promise<boolean> {
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

    async fetchCategories(): Promise<Category[]> {
        const response = await fetch(BASE_URL + '/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        })

        return await response.json()
    }

    async fetchQuestions(categoryId: number): Promise<Question[]> {
        const response = await fetch(BASE_URL + '/questions?category=' + categoryId.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        })

        return await response.json()
    }
}