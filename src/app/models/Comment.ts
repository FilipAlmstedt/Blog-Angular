import { Post } from "./Post";

export class Comment {
    constructor(
       
        public id: number,
        public title: string,
        public content: string,
        public postId: number,
        public post: Post
                
        ) {}
}