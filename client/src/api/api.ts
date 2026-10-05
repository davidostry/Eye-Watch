const API_URL = "http://localhost:3001/api/alerts";


export type Alert = {
        displayName: string,
    description: string,
    priority: string,
    arena: string,
    status: string,
    lon: number,
    lat: number
}

async function request<T>(
endpoint: string,
options: RequestInit = {}
): Promise<T> {
const response = await fetch(`${API_URL}${endpoint}`, {
...options,
headers: {
"Content-Type": "application/json"
}
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Request failed");
}

return data;


}







export async function createAlert(alert:Alert){
    return request("/",{
        method:"POST",
        body: JSON.stringify(alert)
    })
}

export async function createTask(
token: string,
title: string,
completed: boolean
) {
return request("/tasks", {
method: "POST",
headers: {
Authorization: `Bearer ${token}`
},
body: JSON.stringify({
title,
completed
})
});
}

export async function getTaskById(token: string, id: string) {
return request<Task>(`/tasks/${id}`, {
headers: {
Authorization: `Bearer ${token}`
}
});
}

export async function getTasks(token: string) {
return request<Task[]>("/tasks", {
headers: {
Authorization: `Bearer ${token}`
}
});
}