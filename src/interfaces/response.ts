export interface CustomPayload{
    status_code: number
    code: string
}
export interface ErrorData extends CustomPayload{
    message: string
}
export interface ErrorResponse {
    data: ErrorData
}