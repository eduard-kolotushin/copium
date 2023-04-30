
const constructForm = (data) => {
    const formData = new FormData()

    for(var p in data){
        formData.append(p, data[p])
    }

    return formData
}

export function isFirstEnter(user){
    return user?.firstname == null || user?.lastname == null
}

export async function fetchPostLogin({email, password}){
    const formData = constructForm({email, password})

    return fetch('/api/login', {
        method: 'POST',
        body: formData
    })
}

export async function fetchGetLogin(){
    return fetch('/api/login')
}

export async function fetchGetCredential(){
    return fetch('/api/credentials')
}

export async function fetchPostCredential(data){
    const formData = constructForm(data)

    return fetch('/api/credentials',{
        method: 'POST',
        body: formData
    })
}

export async function fetchGetPublications(){
    return fetch('/api/publication')
}

export async function fetchGetLogout(){
    return fetch('/api/logout')
}