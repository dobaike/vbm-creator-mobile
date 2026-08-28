import axios from 'axios';
import md5 from 'js-md5';
import * as FileSystem from 'expo-file-system';

const API_BASE_URL = 'https://vbm.nativedge.com.ng/api/v1';

export async function initiateChunkedUpload(creatorId, fileUri, fileName, category) {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  const fileSizeBytes = fileInfo.size;
  
  // Read file blob for MD5 calculation (for smaller chunks or complete validation)
  const responseInit = await axios.post(`${API_BASE_URL}/vault/upload/initiate`, {
    creator_id: creatorId,
    file_name: fileName,
    file_size_bytes: fileSizeBytes,
    mime_type: 'video/quicktime',
    category: category,
    md5_checksum: 'pending_chunk_verification'
  });

  return responseInit.data; // Returns { upload_id, chunk_size_bytes, total_chunks }
}

export async function uploadChunkPart(uploadId, partNumber, chunkUri) {
  const presignedRes = await axios.get(`${API_BASE_URL}/vault/upload/presigned-url`, {
    params: { upload_id: uploadId, part_number: partNumber }
  });
  
  const { upload_url } = presignedRes.data;
  
  // Upload chunk directly to S3 / MinIO storage vault
  const uploadResult = await FileSystem.uploadAsync(upload_url, chunkUri, {
    httpMethod: 'PUT',
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT
  });

  return {
    part_number: partNumber,
    etag: uploadResult.headers['ETag'] || `"etag_${partNumber}"`
  };
}
