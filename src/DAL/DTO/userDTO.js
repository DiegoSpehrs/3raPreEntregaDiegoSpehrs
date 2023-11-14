export const userDTO = (userData) => {
    return{
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        age: userData.age,
        role: userData.role
    }
}