export class ApiService {
    private token: String

    public getToken(): String {
        return this.token
    }

    public async requestLogin(username: String, password: String) {
        const response = await fetch('http://localhost:8080/api/login',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {

                }
            )
        }
        )
    }


}