export interface CreateRecipeInputDTO {
    title: string,
    description: string,
    token: string
}

export interface GetRecipeInputDTO {
    recipeId: string,
    token: string
}