class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private created_at: Date,
        private author_id: string
    ){
    }
}

export default Recipe