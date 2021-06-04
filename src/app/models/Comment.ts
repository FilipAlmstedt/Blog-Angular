import { Post } from "./Post";

export class Comment {
    constructor(
       
        public id: number,
        public content: string,
        public postId: number,
        public post: Post
                
        ) {}
}