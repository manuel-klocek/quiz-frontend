import ToastComponent from "@/components/ToastComponent.vue";

export class ApiService {
    private token: String

    public getToken(): String {
        return this.token
    }

    public async requestLogin(username: String, password: String): Promise<Boolean> {
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
            console.log("username or password wrong")
            return false
        }

        const result = await response.json()
        this.token = result["token"]
        return true
    }

    async requestRegister(name, pass, mail): Promise<boolean> {
        const response = await fetch("http://localhost:8080/api/user", {
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

        if(response.status == 201) {
            console.log("User created, proceed to log in")
            return true
        }
        else if(response.status == 409)
            console.log("User already exists! -> Make check user request on input!")
        else
            console.log("Bad Request with status code: " + response.status + " " + response.statusText)

        return false
    }
}