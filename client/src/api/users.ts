
import type { User } from "../types/users";

const API_URL = "http://localhost:3001/api/auth";

async function request<T>(
endpoint: string,
options: RequestInit = {}
): Promise<T> {
const response = await fetch(`${API_URL}${endpoint}`, {
...options,
headers: {
"Content-Type": "application/json",
...options.headers
}
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Request failed");
}

return data;


}

export async function login(username: string, password: string) {
return request<{ token: string }>("/login", {
method: "POST",
body: JSON.stringify({
username,
password
})
});
}

export async function register(
userName: string,
email: string,
password: string,
token:string | null
) {
return request<User>("/register", {
headers: {
Authorization: `Bearer ${token}`
},
method: "POST",
body: JSON.stringify({
userName,
email,
password
})
});
}

export async function getDetails(token: string) {
return request<User>("/me", {
headers: {
Authorization: `Bearer ${token}`
}
});
}


