import { Post } from "./Post";


export class Blog {
    constructor(
        
        public id: number,
        public title: string,
        public created: Date, // date-time 
        public userId: number,
        public posts: Post[]

        ) {}
}