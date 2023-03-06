export interface SignUpInputDTO {
    fullName: string, 
    email: string,
    password: string,
    role: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface GetProfileInputDTO {
    token: string
}

export interface GetUserProfileInputDTO {
    userId: string,
    token: string
}

export interface DeleteUserInputDTO {
    userId: string,
    token: string
}

export interface TokenInputDTO {
    token: string
}