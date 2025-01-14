interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

class FileUploadManager {
  private files: UploadedFile[] = [];
  private readonly STORAGE_KEY = 'uploaded_files';
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  constructor() {
    this.loadFiles();
  }

  private loadFiles() {
    try {
      const savedFiles = localStorage.getItem(this.STORAGE_KEY);
      if (savedFiles) {
        this.files = JSON.parse(savedFiles);
      }
    } catch (error) {
      console.error('Error loading files from storage:', error);
      this.files = [];
    }
  }

  private saveFiles() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.files));
    } catch (error) {
      console.error('Error saving files to storage:', error);
      throw new Error('No se pudieron guardar los archivos');
    }
  }

  private generateFriendlyUrl(fileName: string): string {
    // Remove file extension
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    // Convert to kebab case
    return baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async uploadFile(file: File): Promise<UploadedFile> {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`El archivo excede el tamaño máximo permitido de ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const uploadedFile: UploadedFile = {
            id: crypto.randomUUID(),
            name: file.name,
            url: reader.result as string,
            type: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString()
          };

          this.files.unshift(uploadedFile);
          this.saveFiles();
          resolve(uploadedFile);
        } catch (error) {
          reject(new Error('Error al procesar el archivo'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  getFiles(): UploadedFile[] {
    return [...this.files];
  }

  deleteFile(id: string) {
    const initialLength = this.files.length;
    this.files = this.files.filter(file => file.id !== id);
    
    if (this.files.length === initialLength) {
      throw new Error('Archivo no encontrado');
    }

    this.saveFiles();
  }

  clearFiles() {
    this.files = [];
    this.saveFiles();
  }
}

export const fileUploadManager = new FileUploadManager();