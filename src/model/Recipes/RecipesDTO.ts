export interface CreateRecipeInputDTO {
    title: string,
    description: string,
    token: string
}

export interface EditRecipeInputDTO {
    title: string,
    description: string,
    recipeId: string,
    token: string
}

export interface GetRecipeInputDTO {
    recipeId: string,
    token: string
}

export interface DeleteRecipeInputDTO {
    recipeId: string,
    token: string
}