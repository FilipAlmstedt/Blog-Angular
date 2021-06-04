import { Blog } from "./Blog";
import { Comment } from "./Comment";

export class Post {
    constructor(
        
        public id: number,
        public title: string,
        public content: string,
        public created: Date, //date-time
        public modified: Date, //date-time
        public blogId: number,
        public blog: Blog,
        public comments: Comment[],
               
    ) {}

                
}