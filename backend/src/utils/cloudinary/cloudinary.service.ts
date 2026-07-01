import { deleteFromCloudinary, uploadToCloudinary } from "./cloudinary.helper";
import { IFileService } from "./file.interface";


export class CloudinaryService implements IFileService {
    async upload(filePath: string): Promise<string> {
        const secure_url = await uploadToCloudinary(filePath)
        return secure_url?.secure_url as string
    }

    async delete(fileUrl: string): Promise<void> {
        await deleteFromCloudinary(fileUrl)
    }
}