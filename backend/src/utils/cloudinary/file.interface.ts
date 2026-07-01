

export interface IFileService {
    upload(file:string):Promise<string>
    delete(fileUrl:string):Promise<void>
}