declare module 'cloudinary' {
    export const v2: {
      config: (options: any) => void;
      uploader: {
        upload: (path: string, options?: any) => Promise<any>;
      };
    };
  }

  