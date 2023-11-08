export interface User {
    id?: number;
    name?: string;
    userName?: string;
    email: string;
    password?: string;
    password_confirmation?: string
    accessToken?: string;
    exists?: boolean
}
export interface Tweet {
    id: number
    userName: string
    name: string
    created_at: Date
    updated_at: Date
    createdAgo: string
    message?: string
    file?: string
    user_id: number
    tweet_id?: number
    shareUrl?: string
    like: number
    shares: number
    views: number
    numOfComments: number
}